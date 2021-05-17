import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";
import {observer} from "mobx-react";

export const SolarEnergyForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, solarEnergy} = props;

    return (<Modal
        width={600}
        closable={false}
        destroyOnClose={true}
        footer={[
            <Button key="back" onClick={onCancel}>
                Abbrechen
            </Button>,
        ]}
        title={"Solaranlage " + (editing ? "aktualisieren" : "hinzufügen")}
        visible={visible}
    >
        <p>Bitte pflegen Sie die Daten für die Solaranlage ein</p>
        <Form
            name="createSolarEnergy"
            initialValues={(editing ? solarEnergy : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Name der Erzeugungsanlage"
                name="solarEnergyId"
                rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
            >
                <Input style={{width: 250}}/>
            </Form.Item>
            <Row>
                <Col>
                    <Tooltip placement={"left"} title={"Gibt die Neigung des Daches in Grad an"}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="Neigung (Grad)"
                            name="slope"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        >
                            <Input style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip placement={"right"} title={"Nennleistung unter Standardbedingungen"}>
                        <Form.Item
                            label="Nennleistung (kWp)"
                            name="ratedCapacity"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tooltip placement={"left"} title={"Breitengrad des Standorts"}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="Latitude"
                            name="latitude"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip placement={"right"} title={"Längengrad des Standorts"}>
                        <Form.Item
                            label="Longitude"
                            name="longitude"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tooltip placement={"left"} title={"Ausrichtung der Anlage zur Himmelsrichtung in Grad"}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="Ausrichtung (Grad)"
                            name="alignment"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip placement={"right"} title={"Gibt die aktuelle prozentuale Leistung der Anlage an"}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="Kapazität (%)"
                            name="capacity"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        >
                            <Slider style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {editing ? "Aktualisieren" : "Hinzufügen"}
                </Button>
            </Form.Item>
        </Form>
    </Modal>)
});