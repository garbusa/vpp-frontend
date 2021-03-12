import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Col, Form, Input, Row} from "antd";
import history from "../../../history";

const CreateComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    useEffect(() => {
        if (store.masterdataStore.creatingState.isCreating) {
            //redirect to right step and state
            if (store.masterdataStore.creatingState.step !== 0) {
                if (store.masterdataStore.creatingState.step === 1) {
                    history.push("/erstellen/schritt-1")
                }
                if (store.masterdataStore.creatingState.step === 2) {
                    history.push("/erstellen/schritt-2")
                }
                if (store.masterdataStore.creatingState.step === 3) {
                    history.push("/erstellen/schritt-3")
                }
            }
        }
    }, []);

    let onFinish = (values) => {
        let vppBusinessKey = values.vppBusinessKey;
        if (vppBusinessKey !== "" && vppBusinessKey.length > 3) {
            let dto = {virtualPowerPlantId: vppBusinessKey};
            store.masterdataStore.saveVpp(dto).then((result) => {
                if (result.success) {
                    //redirect to next step
                    store.masterdataStore.creatingState.step = 1;
                    history.push('/erstellen/schritt-1');
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            })
        } else {
            enqueueSnackbar("Der Name des VK muss min. 4 Zeichen enthalten", {variant: "error"})
        }
    };

    return (
        <div className={'create-vpp'}>
            <h2>Virtuelles Kraftwerk erstellen</h2>
            <p>Bitte wähle einen Namen für das neue virtuelle Kraftwerk aus und bestätige den Button um den Prozess zu
                starten.</p>
            <Row>
                <Col span={12}>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="VK Name"
                            name="vppBusinessKey"
                            rules={[{
                                required: true,
                                message: 'Der Name des virtuellen Kraftwerks muss ausgefüllt sein.'
                            }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Prozess starten
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );


});

export default CreateComponent;
