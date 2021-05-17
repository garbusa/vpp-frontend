import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";
import {observer} from "mobx-react";

export const OtherEnergyForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, otherEnergy} = props;

    return (<Modal
            width={600}
            closable={false}
            destroyOnClose={true}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Abbrechen
                </Button>,
            ]}
            title={"Alternative Erzeugungsanlage" + (editing ? "aktualisieren" : "hinzufügen")}
            visible={visible}
        >
            <p>Bitte pflegen Sie die Daten für die alternative Erzeugungsanlage ein</p>
            <Form
                name="createOtherEnergy"
                initialValues={(editing ? otherEnergy : {remember: false})}
                onFinish={onFinish}
                layout="vertical"
            >
                <Row>
                    <Col>
                        <Form.Item
                            style={{marginRight: 16}}
                            label="Name der Erzeugungsanlage"
                            name="otherEnergyId"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        >
                            <Input style={{width: 250}}/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Nennleistung (kWp)"
                            name="ratedCapacity"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                        >
                            <InputNumber style={{width: 250}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Tooltip placement={"left"} title={"Gibt die aktuelle prozentuale Leistung der Anlage an"}>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="Kapazität (%)"
                        name="capacity"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                    >
                        <Slider style={{width: 250}}/>
                    </Form.Item>
                </Tooltip>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {editing ? "Aktualisieren" : "Hinzufügen"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
});