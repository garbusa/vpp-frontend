import {Button, Col, DatePicker, Form, InputNumber, Modal, Row, Select, Table, Tooltip} from "antd/lib/index";
import React, {useContext} from "react";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";
import {useSnackbar} from "notistack";
import moment from "moment";

/**
 * Diese Komponente bildet die Eingabemaske für eine Erzeugungsmanipulation ab
 * @type {function(): *}
 */
export const ProducerManipulationForm = observer((props) => {

    const vppStore = useContext(RootStoreContext).vppStore;
    const {enqueueSnackbar} = useSnackbar();

    const {Option} = Select;

    const combineProducers = () => {
        let output = [];
        vppStore.dpps.forEach((dpp) => {
            if (dpp.solars) {
                dpp.solars.forEach((solar) => {
                    output.push({
                        key: solar.solarEnergyId,
                        producerId: solar.solarEnergyId,
                        type: "SOLAR",
                        capacity: solar.capacity
                    });
                });
            }
            if (dpp.waters) {
                dpp.waters.forEach((water) => {
                    output.push({
                        key: water.waterEnergyId,
                        producerId: water.waterEnergyId,
                        type: "WATER",
                        capacity: water.capacity
                    });
                });
            }
            if (dpp.winds) {
                dpp.winds.forEach((wind) => {
                    output.push({
                        key: wind.windEnergyId,
                        producerId: wind.windEnergyId,
                        type: "WIND",
                        capacity: wind.capacity
                    });
                });
            }
            if (dpp.others) {
                dpp.others.forEach((other) => {
                    output.push({
                        key: other.otherEnergyId,
                        producerId: other.otherEnergyId,
                        type: "OTHER",
                        capacity: other.capacity
                    });
                });
            }
        }, this);
        vppStore.households.forEach((household) => {
            if (household.solars) {
                household.solars.forEach((solar) => {
                    output.push({
                        key: solar.solarEnergyId,
                        producerId: solar.solarEnergyId,
                        type: "SOLAR",
                        capacity: solar.capacity
                    });
                });
            }
            if (household.waters) {
                household.waters.forEach((water) => {
                    output.push({
                        key: water.waterEnergyId,
                        producerId: water.waterEnergyId,
                        type: "WATER",
                        capacity: water.capacity
                    });
                });
            }
            if (household.winds) {
                household.winds.forEach((wind) => {
                    output.push({
                        key: wind.windEnergyId,
                        producerId: wind.windEnergyId,
                        type: "WIND",
                        capacity: wind.capacity
                    });
                });
            }
            if (household.others) {
                household.others.forEach((other) => {
                    output.push({
                        key: other.otherEnergyId,
                        producerId: other.otherEnergyId,
                        type: "OTHER",
                        capacity: other.capacity
                    });
                });
            }
        }, this);
        return output;
    };

    function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
        if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
        if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
        if (b_start < a_start && a_end < b_end) return true; // a in b
        return false;
    }

    const checkAndAddProducerManipulation = (record) => {
        let exists = false;

        if (record.startTimestamp > record.endTimestamp) {
            enqueueSnackbar("Der Startzeitstempel kann nicht größer als der Endzeitstempel sein.", {variant: "error"});
        } else {
            vppStore.dashboardState.addingActionRequest.producerManipulations.forEach((manipulation) => {
                if (dateRangeOverlaps(manipulation.startTimestamp, manipulation.endTimestamp, record.startTimestamp, record.endTimestamp) &&
                    manipulation.producerId === record.producerId) {
                    enqueueSnackbar("Die Zeitstempel dürfen sich bei existierenden Manipulationen nicht überschneiden.", {variant: "error"});
                    exists = true;
                }
            });

            if (!exists) {
                vppStore.dashboardState.addingActionRequest.producerManipulations.push(
                    record
                );
                enqueueSnackbar("Die Manipulation wurde erfolgreich eingefügt.", {variant: "success"});
                onCancelProducerManipulation()
            }
        }

    };

    const checkAndRemoveDuplicateProducerManipulation = (record) => {
        for (let i = 0; i < vppStore.dashboardState.addingActionRequest.producerManipulations.length; i++) {
            if (vppStore.dashboardState.addingActionRequest.producerManipulations[i].producerId === record.producerId &&
                vppStore.dashboardState.addingActionRequest.producerManipulations[i].startTimestamp === record.startTimestamp &&
                vppStore.dashboardState.addingActionRequest.producerManipulations[i].endTimestamp === record.endTimestamp) {
                vppStore.dashboardState.addingActionRequest.producerManipulations.splice(i, 1);
                i--;
            }
        }
    };

    const onFinishProducerManipulation = (record) => {
        if (vppStore.dashboardState.addingProducerManipulation.producerId) {
            if (vppStore.dashboardState.isAddingProducerManipulation) {
                vppStore.dashboardState.addingProducerManipulation.startTimestamp =
                    Math.round(Date.parse(record.startTimestamp).valueOf() / 1000);
                vppStore.dashboardState.addingProducerManipulation.endTimestamp =
                    Math.round(Date.parse(record.endTimestamp).valueOf() / 1000);
                vppStore.dashboardState.addingProducerManipulation.type = record.type;
                vppStore.dashboardState.addingProducerManipulation.capacity = record.capacity;
                checkAndAddProducerManipulation(vppStore.dashboardState.addingProducerManipulation);
            } else if (vppStore.dashboardState.isEditingProducerManipulation) {
                vppStore.dashboardState.addingProducerManipulation.type = record.type;
                vppStore.dashboardState.addingProducerManipulation.capacity = record.capacity;
                checkAndRemoveDuplicateProducerManipulation(vppStore.dashboardState.addingProducerManipulation);
                vppStore.dashboardState.addingActionRequest.producerManipulations.push(vppStore.dashboardState.addingProducerManipulation);
                enqueueSnackbar("Die Manipulation wurde erfolgreich bearbeitet.", {variant: "success"});
                onCancelProducerManipulation()
            }

        } else {
            enqueueSnackbar("Bitte wählen Sie eine Anlage aus der Tabelle.", {variant: "error"})
        }
    };

    const onCancelProducerManipulation = () => {
        vppStore.dashboardState.isAddingProducerManipulation = false;
        vppStore.dashboardState.isEditingProducerManipulation = false;
        vppStore.resetAddingProducerManipulation();
    };

    return (<Modal
        destroyOnClose={true}
        closable={false}
        title="Erzeugungsmanipulation hinzufügen"
        visible={vppStore.dashboardState.isAddingProducerManipulation ||
        vppStore.dashboardState.isEditingProducerManipulation}
        footer={[
            <Button key="back" onClick={onCancelProducerManipulation}>
                Abbrechen
            </Button>
        ]}
        width={1000}
    >
        <Form
            name="createProducerManipulation"
            initialValues={
                vppStore.dashboardState.isEditingProducerManipulation
                    ? Object.assign({}, {
                        startTimestamp: (() => {
                            let date = new Date(0);
                            date.setUTCSeconds(vppStore.dashboardState.addingProducerManipulation.startTimestamp);
                            return moment(date);
                        })(),
                        endTimestamp: (() => {
                            let date = new Date(0);
                            date.setUTCSeconds(vppStore.dashboardState.addingProducerManipulation.endTimestamp);
                            return moment(date);
                        })(),
                        producerId: vppStore.dashboardState.addingProducerManipulation.producerId,
                        type: vppStore.dashboardState.addingProducerManipulation.type,
                        capacity: vppStore.dashboardState.addingProducerManipulation.capacity
                    })
                    : {remember: false}
            }
            onFinish={onFinishProducerManipulation}
            layout="vertical"
        >
            <Row>
                <Col>
                    <Form.Item
                        label="Startzeitstempel"
                        name="startTimestamp"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                        style={{marginRight: 16}}
                    >

                        <DatePicker
                            style={{width: 250}}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Start"
                            disabled={vppStore.dashboardState.isEditingProducerManipulation}
                        />


                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Endzeitstempel"
                        name="endTimestamp"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                    >

                        <DatePicker
                            style={{width: 250}}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="End"
                            disabled={vppStore.dashboardState.isEditingProducerManipulation}
                        />


                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Item
                        label="Art der Manipulation"
                        name="type"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                        style={{marginRight: 16}}
                    >
                        <Select
                            style={{width: 250}}
                            showSearch
                            placeholder="Manipulationstyp"
                            optionFilterProp="children"
                        >
                            <Option value="PRODUCER_UP">Hochfahren</Option>
                            <Option value="PRODUCER_DOWN">Runterfahren</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col>
                    <Tooltip placement={"right"}
                             title={"Gibt an, um wie viele Prozentpunkte die Anlage hochgefahren/runtergefahren werden soll." +
                             " Wenn die aktuelle Kapazität bei 100% liegt und Sie diese um 20% runterfahren möchten, resultiert daraus eine simulierte Kapazität von 80%."}>
                        <Form.Item
                            label="Änderung der Kapazität"
                            name="capacity"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                        >
                            <InputNumber
                                style={{width: 250}}
                                placeholder="Manipulation der Kapazität"/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>

            <h2>Verfügbare Anlagen</h2>
            <Table
                disabled={vppStore.dashboardState.isEditingProducerManipulation}
                rowSelection={{
                    type: "radio",
                    selectedRowKeys: vppStore.dashboardState.selectedProducer,
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys, selectedRows);
                        vppStore.dashboardState.selectedProducer = selectedRows.map(row => row.producerId);
                        if (selectedRows.length === 1) {
                            vppStore.dashboardState.addingProducerManipulation.producerId = selectedRows[0].producerId;
                        }
                    },
                    getCheckboxProps: (record) => ({
                        disabled: vppStore.dashboardState.isEditingProducerManipulation, // Column configuration not to be checked
                    }),
                }}
                columns={
                    [{
                        title: 'Erzeugungsanlage',
                        dataIndex: 'producerId',
                        key: 'producerId',
                    },
                        {
                            title: 'Typ',
                            dataIndex: 'type',
                            key: 'type',
                        },
                        {
                            title: 'Kapazität lt. Stammdatum',
                            dataIndex: 'capacity',
                            key: 'capacity',
                        },
                    ]}
                dataSource={combineProducers()}
            />

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Manipulation hinzufügen
                </Button>
            </Form.Item>
        </Form>
    </Modal>)
});