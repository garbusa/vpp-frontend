import {Button, Form, Input, InputNumber, Modal} from "antd";
import React from "react";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Eingabemaske für ein Haushalt ab
 * @type {function(*): *}
 */
export const HouseholdForm = observer((props) => {
    const {visible, onFinish, onCancel, editing, household} = props;

    return (<Modal
        closable={false}
        destroyOnClose={true}
        title={"Haushalt " + (editing ? "aktualisieren" : "hinzufügen")}
        visible={visible}
        footer={[
            <Button key="back" onClick={onCancel}>
                Abbrechen
            </Button>
        ]}
    >
        <p>Ein Haushalt besteht aus einem eindeutigem Namen und die Anzahl der Haushaltsmitglieder.</p>
        <Form
            name="createHousehold"
            initialValues={(editing ? household : {remember: false})}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Name des Haushaltes"
                name="householdId"
                rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
            >
                <Input style={{width: 250}}/>
            </Form.Item>
            <Form.Item
                label="Anzahl der Haushaltsmitglieder"
                name="householdMemberAmount"
                rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
            >
                <InputNumber style={{width: 250}}/>
            </Form.Item>
            <Form.Item style={{marginTop: 32}}>
                <Button type="primary" htmlType="submit">
                    {editing ? "Aktualisieren" : "Hinzufügen"}
                </Button>
            </Form.Item>
        </Form>
    </Modal>)
});