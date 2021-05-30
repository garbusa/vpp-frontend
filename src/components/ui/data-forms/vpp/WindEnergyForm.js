import {observer} from "mobx-react";
import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";

/**
 * Diese Komponente bildet die Eingabemaske für eine Windkraftanlage ab
 * @type {function(*): *}
 */
export const WindEnergyForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, windEnergy} = props;

    return (<Modal
        width={600}
        closable={false}
        destroyOnClose={true}
        footer={[
            <Button key="back" onClick={onCancel}>
                Abbrechen
            </Button>,
        ]}
        title={"Windkraftanlage " + (editing ? "aktualisieren" : "hinzufügen")}
        visible={visible}
    >
        <p>Bitte pflegen Sie die Daten für die Windkraftanlage ein</p>
        <Form
            name="createWindEnergy"
            initialValues={(editing ? windEnergy : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Name der Erzeugungsanlage"
                name="windEnergyId"
                rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
            >
                <Input style={{width: 250}}/>
            </Form.Item>
            <Row>
                <Col>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="Wirkungsgrad (%)"
                        name="efficiency"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                    >
                        <Input style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Höhe (m)"
                        name="height"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tooltip placement={"left"} title={"Gibt den Breitengrad des Standorts an."}>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="Latitude"
                            name="latitude"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
                <Col>
                    <Tooltip placement={"right"} title={"Gibt den Längengrad des Standorts an."}>
                        <Form.Item
                            label="Longitude"
                            name="longitude"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="Radius des Windrads (m)"
                        name="radius"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Tooltip placement={"right"}
                             title={"Gibt die aktuelle prozentuale Leistung der Windkraftanlage an."}>
                        <Form.Item
                            label="aktuelle Kapazität (%)"
                            name="capacity"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                        >
                            <Slider style={{width: 250}}/>
                        </Form.Item>
                    </Tooltip>
                </Col>
            </Row>
            <Form.Item style={{marginTop: 32}}>
                <Button type="primary" htmlType="submit">
                    {editing ? "Aktualisieren" : "Hinzufügen"}
                </Button>
            </Form.Item>
        </Form>
    </Modal>)
});