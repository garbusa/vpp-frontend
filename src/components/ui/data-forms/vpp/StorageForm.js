import {Button, Col, Form, Input, InputNumber, Modal, Row, Slider, Tooltip} from "antd/lib/index";
import React from "react";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Eingabemaske für eine Speicheranlage ab
 * @type {function(*): *}
 */
export const StorageForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, storage} = props;

    return (<Modal
        width={600}
        closable={false}
        destroyOnClose={true}
        footer={[
            <Button key="back" onClick={onCancel}>
                Abbrechen
            </Button>,
        ]}
        title={"Speicheranlage " + (editing ? "aktualisieren" : "hinzufügen")}
        visible={visible}
    >
        <p>Bitte pflegen Sie die Daten für die Speicheranlage ein</p>
        <Form
            name="createStorage"
            initialValues={(editing ? storage : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Row>
                <Col>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="Name der Speicheranlage"
                        name="storageId"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                    >
                        <Input style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Nennleistung (kWp)"
                        name="ratedPower"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Col>
                        <Tooltip placement="left"
                                 title={"Die C-Rate ist ein Wert, der die Ladezeit einer Speicheranlage beschreibt. " +
                                 "Eine Stunde entspricht dem Wert 1.0, wobei zwei Stunden dem Wert 0.5 entspricht."}>
                            <Form.Item
                                style={{marginRight: 16}}
                                label="C-Rate"
                                name="loadTimeHour"
                                rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                            >
                                <InputNumber style={{width: 250}}/>
                            </Form.Item>
                        </Tooltip>
                    </Col>
                </Col>
                <Col>
                    <Tooltip placement="right"
                             title={"Gibt den aktuellen Zustand des Speichers an. Bei 0% ist die Speicheranlage leer und bei 100% ist die Speicheranlage  voll."}>
                        <Form.Item
                            label="Kapazität (%)"
                            name="capacity"
                            rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
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