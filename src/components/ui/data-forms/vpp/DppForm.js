import {Button, Form, Input, Modal} from "antd/lib/index";
import React from "react";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Eingabemaske für ein DK ab
 * @type {function(*): *}
 */
export const DppForm = observer((props) => {

    const {visible, onFinish, onCancel, editing, dpp} = props;

    return (
        <Modal
            closable={false}
            destroyOnClose={true}
            title={"Dezentrales Kraftwerk " + (editing ? "aktualisieren" : "hinzufügen")}
            visible={visible}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Abbrechen
                </Button>
            ]}
        >
            <p>Ein dezentrales Kraftwerk besteht zunächst nur aus einem Namen. Diesem Kraftwerk werden in den nächsten
                Schritten Erzeugungs- und Speicheranlagen hinzugefügt.</p>
            <Form
                name="createHousehold"
                initialValues={(editing ? dpp : {remember: false})}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Name des dez. Kraftwerks"
                    name="decentralizedPowerPlantId"
                    rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein.'}]}
                >
                    <Input style={{width: 250}}/>
                </Form.Item>
                <Form.Item style={{marginTop: 32}}>
                    <Button type="primary" htmlType="submit">
                        {editing ? "Aktualisieren" : "Hinzufügen"}
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )
});