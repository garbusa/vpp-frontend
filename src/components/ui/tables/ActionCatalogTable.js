import {Alert, Button, Col, Row, Table} from "antd";
import React, {useContext} from "react";
import {RootStoreContext} from "../../../store/RootStore";
import {observer} from "mobx-react";

export const ActionCatalogTable = observer(() => {
    const vppStore = useContext(RootStoreContext).vppStore;

    const onOpenActionCatalog = (actionCatalog) => {
        if (actionCatalog) {
            vppStore.dashboardState.selectedActionCatalog = actionCatalog;
            vppStore.dashboardState.isViewingActionCatalog = true;
        }

    };

    if (vppStore.dashboardState.selectedActionRequest.catalogs.length > 0) {
        return <Row>
            <Col span={24}>
                <h3>Maßnahmenübersicht</h3>
                {vppStore.dashboardState.selectedActionRequest.catalogs !== undefined &&
                <Table pagination={{pageSize: 4}} size="small"
                       dataSource={vppStore.dashboardState.selectedActionRequest.catalogs.slice()}
                       columns={[
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
                               title: 'Problem',
                               dataIndex: 'problemType',
                               key: 'problemType',
                               render: (type) => {
                                   if (type === "SHORTAGE") {
                                       return "Stromengpass"
                                   } else if (type === "OVERFLOW") {
                                       return "Stromüberfluss"
                                   } else {
                                       return null;
                                   }
                               }
                           },
                           {
                               title: 'Aktionen',
                               key: 'action',
                               render: (text, record) => (
                                   <Button
                                       onClick={() => onOpenActionCatalog(record)}>Maßnahmenkatalog</Button>
                               ),
                           },
                       ]}/>
                }

            </Col>
        </Row>
    } else {
        return <Row>
            <Col>
                <h3>Maßnahmenübersicht</h3>
                <Alert
                    description="Für diese Maßnahmenabfrage existieren keine Maßnahmenkataloge"
                    type="info"
                />
            </Col>
        </Row>
    }
});