import {Alert, Col, Row, Table} from "antd";
import ArrowUpOutlined from "@ant-design/icons/es/icons/ArrowUpOutlined";
import ArrowDownOutlined from "@ant-design/icons/es/icons/ArrowDownOutlined";
import React, {useContext} from "react";
import {observer} from "mobx-react";
import {RootStoreContext} from "../../../store/RootStore";

/**
 * Diese Komponente bildet die Liste der Manipulationen der aktuellen Maßnahmenabafrage ab
 * @type {Function}
 */
export const ActionManipulationTable = observer(() => {
    const vppStore = useContext(RootStoreContext).vppStore;

    const combineManipulations = () => {
        let output = [];
        if (vppStore.dashboardState.selectedActionRequest) {
            vppStore.dashboardState.selectedActionRequest.producerManipulations.forEach((manipulation) => {
                output.push({
                    producerOrStorageId: manipulation.producerId,
                    startTimestamp: manipulation.startTimestamp,
                    endTimestamp: manipulation.endTimestamp,
                    type: manipulation.type,
                    manipulation: manipulation.capacity
                });
            });
            vppStore.dashboardState.selectedActionRequest.storageManipulations.forEach((manipulation) => {
                output.push({
                    producerOrStorageId: manipulation.storageId,
                    startTimestamp: manipulation.startTimestamp,
                    endTimestamp: manipulation.endTimestamp,
                    type: manipulation.type,
                    manipulation: manipulation.ratedPower + " kW für " + manipulation.hours
                });
            });
            vppStore.dashboardState.selectedActionRequest.gridManipulations.forEach((manipulation) => {
                output.push({
                    producerOrStorageId: "-",
                    startTimestamp: manipulation.startTimestamp,
                    endTimestamp: manipulation.endTimestamp,
                    type: manipulation.type,
                    manipulation: manipulation.ratedPower
                });
            });
        }
        return output;
    };


    if (vppStore.dashboardState.selectedActionRequest.producerManipulations.length > 0 ||
        vppStore.dashboardState.selectedActionRequest.storageManipulations.length > 0 ||
        vppStore.dashboardState.selectedActionRequest.gridManipulations.length > 0) {
        return <Row style={{marginTop: 16}}>
            <Col span={24}>
                <h3>Manipulationsübersicht</h3>
                <Table pagination={{pageSize: 4}} size="small"
                       dataSource={combineManipulations()}
                       columns={[
                           {
                               title: 'Name der Erzeugungs-/Speicheranlage',
                               dataIndex: 'producerOrStorageId',
                               key: 'producerOrStorageId',
                               defaultSortOrder: 'descend'
                           },
                           {
                               title: 'Start',
                               dataIndex: 'startTimestamp',
                               key: 'startTimestamp',
                               render: (record) => {
                                   let date = new Date(0);
                                   date.setUTCSeconds(record);
                                   return date.toLocaleString();
                               },
                               sorter: (a, b) => {
                                   let aDate = new Date(0);
                                   let bDate = new Date(0);
                                   aDate.setSeconds(a.startTimestamp, 0);
                                   bDate.setSeconds(b.startTimestamp, 0);
                                   return bDate - aDate;
                               },
                               defaultSortOrder: 'descend'
                           },
                           {
                               title: 'Ende',
                               dataIndex: 'endTimestamp',
                               key: 'endTimestamp',
                               render: (record) => {
                                   let date = new Date(0);
                                   date.setUTCSeconds(record);
                                   return date.toLocaleString();
                               }
                           },
                           {
                               title: 'Manipulationstyp',
                               dataIndex: 'type',
                               key: 'type',
                               render: (property) => {
                                   if (property === "PRODUCER_UP") {
                                       return "Hochgefahren";
                                   } else if (property === "PRODUCER_DOWN") {
                                       return "Runtergefahren";
                                   } else if (property === "STORAGE_LOAD") {
                                       return "Aufgeladen";
                                   } else if (property === "STORAGE_UNLOAD") {
                                       return "Entladen";
                                   } else if (property === "GRID_LOAD") {
                                       return "Eingespeist";
                                   } else if (property === "GRID_UNLOAD") {
                                       return "Ausgespeist";
                                   } else {
                                       return <div>-</div>
                                   }
                               }
                           },
                           {
                               title: 'Manipulation',
                               dataIndex: 'manipulation',
                               key: 'manipulation',
                               render: (property, record) => {
                                   if (record.type === "PRODUCER_UP") {
                                       return <div>
                                           <ArrowUpOutlined/> {property} %
                                       </div>
                                   } else if (record.type === "PRODUCER_DOWN") {
                                       return <div><ArrowDownOutlined/> {property} %</div>
                                   } else if (record.type === "STORAGE_LOAD" || record.type === "STORAGE_UNLOAD") {
                                       return <div> {property} Stunde(n)</div>
                                   } else if (record.type === "GRID_LOAD" || record.type === "GRID_UNLOAD") {
                                       return <div> {property} kW</div>
                                   } else {
                                       return <div>-</div>
                                   }
                               }
                           },
                       ]}/>

            </Col>
        </Row>
    } else {
        return <Row style={{marginTop: 16}}>
            <Col>
                <h3>Manipulationsübersicht</h3>
                <Alert
                    description="Für diese Maßnahmenabfrage existieren keine Manipulationen."
                    type="info"
                />
            </Col>
        </Row>
    }
});