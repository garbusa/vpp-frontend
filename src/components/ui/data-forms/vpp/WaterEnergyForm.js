import {observer} from "mobx-react";
import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";

/**
 * Diese Komponente bildet die Eingabemaske für eine Wasserkraftanlage ab
 * @type {function(*): *}
 */
export const WaterEnergyForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, waterEnergy} = props;

    return (<Modal
        width={600}
        closable={false}
        destroyOnClose={true}
        title={"Wasserkraftwerk " + (editing ? "aktualisieren" : "hinzufügen")}
        visible={visible}
        footer={[
            <Button key="back" onClick={onCancel}>
                Abbrechen
            </Button>,
        ]}>
        <p>Bitte pflegen Sie die Daten des Wasserkraftwerks ein</p>
        <Form
            name="createWaterEnergy"
            initialValues={(editing ? waterEnergy : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Name der Erzeugungsanlage"
                name="waterEnergyId"
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
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Wasserdichte (kg/m^3)"
                        name="density"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col><Form.Item
                    style={{marginRight: 16}}
                    label="Fallgeschwindigkeit (m/s)"
                    name="gravity"
                    rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                >
                    <InputNumber style={{width: 250}}/>
                </Form.Item></Col>
                <Col><Form.Item
                    label="effektive Fallhöhe (m)"
                    name="height"
                    rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                >
                    <InputNumber style={{width: 250}}/>
                </Form.Item></Col>
            </Row>
            <Row>
                <Col><Form.Item
                    style={{marginRight: 16}}
                    label="Volumenstrom (m^3/s)"
                    name="volumeFlow"
                    rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                >
                    <InputNumber style={{width: 250}}/>
                </Form.Item></Col>
                <Col>
                    <Tooltip placement={"right"} title={"Gibt die derzeitige prozentuale Leistung der Anlage an."}>
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

    </Modal>);
});