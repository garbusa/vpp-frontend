import {Button, Col, DatePicker, Form, InputNumber, Modal, Row, Select} from "antd/lib/index";
import React, {useContext} from "react";
import {observer} from "mobx-react";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import moment from "moment";

/**
 * Diese Komponente bildet die Eingabemaske für eine Stromnetzmanipulation ab
 * @type {function(): *}
 */
export const GridManipulationForm = observer(() => {
    const vppStore = useContext(RootStoreContext).vppStore;
    const {enqueueSnackbar} = useSnackbar();

    const {Option} = Select;

    function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
        if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
        if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
        if (b_start < a_start && a_end < b_end) return true; // a in b
        return false;
    }

    const checkAndAddGridManipulation = (record) => {
        let exists = false;

        if (record.startTimestamp > record.endTimestamp) {
            enqueueSnackbar("Startzeitstempel kann nicht größer als der Endzeitstempel sein", {variant: "error"});
        } else {
            vppStore.dashboardState.addingActionRequest.gridManipulations.forEach((manipulation) => {
                if (dateRangeOverlaps(manipulation.startTimestamp, manipulation.endTimestamp, record.startTimestamp, record.endTimestamp)) {
                    enqueueSnackbar("Die Zeitstempel dürfen sich bei existierenden Manipulationen nicht überschneiden", {variant: "error"});
                    exists = true;
                }
            });

            if (!exists) {
                vppStore.dashboardState.addingActionRequest.gridManipulations.push(
                    record
                );
                enqueueSnackbar("Manipulation wurde erfolgreich eingefügt", {variant: "success"});
                onCancelGridManipulation()
            }
        }
    };

    const checkAndRemoveDuplicateGridManipulation = (record) => {
        for (let i = 0; i < vppStore.dashboardState.addingActionRequest.gridManipulations.length; i++) {
            if (vppStore.dashboardState.addingActionRequest.gridManipulations[i].startTimestamp === record.startTimestamp &&
                vppStore.dashboardState.addingActionRequest.gridManipulations[i].endTimestamp === record.endTimestamp) {
                vppStore.dashboardState.addingActionRequest.gridManipulations.splice(i, 1);
                i--;
            }
        }
    };

    const onFinishGridManipulation = (record) => {
        if (vppStore.dashboardState.isAddingGridManipulation) {
            vppStore.dashboardState.addingGridManipulation.startTimestamp =
                Math.round(Date.parse(record.startTimestamp).valueOf() / 1000);
            vppStore.dashboardState.addingGridManipulation.endTimestamp =
                Math.round(Date.parse(record.endTimestamp).valueOf() / 1000);
            vppStore.dashboardState.addingGridManipulation.type = record.type;
            vppStore.dashboardState.addingGridManipulation.ratedPower = record.ratedPower;
            checkAndAddGridManipulation(vppStore.dashboardState.addingGridManipulation);
        } else if (vppStore.dashboardState.isEditingGridManipulation) {
            vppStore.dashboardState.addingGridManipulation.type = record.type;
            vppStore.dashboardState.addingGridManipulation.ratedPower = record.ratedPower;
            checkAndRemoveDuplicateGridManipulation(vppStore.dashboardState.addingGridManipulation);
            vppStore.dashboardState.addingActionRequest.gridManipulations.push(vppStore.dashboardState.addingGridManipulation);
            enqueueSnackbar("Manipulation wurde erfolgreich bearbeitet", {variant: "success"});
            onCancelGridManipulation();
        }

    };

    const onCancelGridManipulation = () => {
        vppStore.dashboardState.isAddingGridManipulation = false;
        vppStore.dashboardState.isEditingGridManipulation = false;
        vppStore.resetAddingGridManipulation();
    };

    return (<Modal
        destroyOnClose={true}
        closable={false}
        title="Stromnetzmanipulation hinzufügen"
        visible={vppStore.dashboardState.isAddingGridManipulation || vppStore.dashboardState.isEditingGridManipulation}
        footer={[
            <Button key="back" onClick={onCancelGridManipulation}>
                Abbrechen
            </Button>
        ]}
        width={1000}
    >
        <Form
            name="createGridManipulation"
            initialValues={
                vppStore.dashboardState.isEditingGridManipulation
                    ? Object.assign({}, {
                        startTimestamp: (() => {
                            let date = new Date(0);
                            date.setUTCSeconds(vppStore.dashboardState.addingGridManipulation.startTimestamp);
                            return moment(date);
                        })(),
                        endTimestamp: (() => {
                            let date = new Date(0);
                            date.setUTCSeconds(vppStore.dashboardState.addingGridManipulation.endTimestamp);
                            return moment(date);
                        })(),
                        type: vppStore.dashboardState.addingGridManipulation.type,
                        ratedPower: vppStore.dashboardState.addingGridManipulation.ratedPower
                    })
                    : {remember: false}

            }
            onFinish={onFinishGridManipulation}
            layout="vertical"

        >
            <Row>
                <Col>
                    <Form.Item
                        label="Startzeitstempel"
                        name="startTimestamp"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        style={{marginRight: 16}}
                    >
                        <DatePicker
                            style={{width: 250}}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Start"
                            disabled={vppStore.dashboardState.isEditingGridManipulation}
                        />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Endzeitstempel"
                        name="endTimestamp"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                    >
                        <DatePicker
                            style={{width: 250}}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="End"
                            disabled={vppStore.dashboardState.isEditingGridManipulation}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Item
                        label="Art der Manipulation"
                        name="type"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        style={{marginRight: 16}}
                    >
                        <Select
                            style={{width: 250}}
                            showSearch
                            placeholder="Manipulationstyp"
                            optionFilterProp="children"
                        >
                            <Option value="GRID_LOAD">Einspeisen</Option>
                            <Option value="GRID_UNLOAD">Ausspeisen</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Leistung (kW)"
                        name="ratedPower"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                    >
                        <InputNumber
                            style={{width: 250}}
                            placeholder="Leistung"/>
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Manipulation hinzufügen
                </Button>
            </Form.Item>
        </Form>

    </Modal>);
});