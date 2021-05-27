import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Col, Popconfirm, Row, Table} from "antd";
import history from "../../../../history";
import {PlusOutlined} from '@ant-design/icons';
import {CreateStepComponent} from "../../../ui/step/CreateStepComponent";
import {DppForm} from "../../../ui/data-forms/vpp/DppForm";

/**
 * Diese Komponente beinhaltet den Schritt, um DKs einem VK hinzuzufügen
 * @type {React.FunctionComponent<object>}
 */
const AddDppsComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    const columns = [
        {
            title: 'Dezentrale Kraftwerke',
            dataIndex: 'decentralizedPowerPlantId',
            key: 'decentralizedPowerPlantId',
        },
    ];

    useEffect(() => {
        if (store.vppStore.creatingState.step !== 1) {
            if (store.vppStore.creatingState.step === 0) {
                history.push("/erstellen")
            }
            if (store.vppStore.creatingState.step === 2) {
                history.push("/erstellen/schritt-2")
            }
            if (store.vppStore.creatingState.step === 3) {
                history.push("/erstellen/schritt-3")
            }
        } else {
            fetchDpps();
        }

    }, []);

    const onFinishCreateDpp = (record) => {
        store.vppStore.saveDpp(record, store.vppStore.creatingState.vppId).then((result) => {
            if (result.success) {
                store.vppStore.stepOneState.isAddingDpp = false;
                fetchDpps();
                enqueueSnackbar(result.message, {variant: result.variant})
            } else {
                enqueueSnackbar(result.message, {variant: result.variant})
            }
        });

    };

    const onCancelCreateDpp = () => {
        store.vppStore.stepOneState.isAddingDpp = false;
    };

    const onOpenAddDppModal = () => {
        store.vppStore.stepOneState.isAddingDpp = true;
    };

    const onForward = () => {
        store.vppStore.creatingState.step = 2;
        history.push('/erstellen/schritt-2');
    };

    const onEnd = () => {
        store.vppStore.resetCreatingState();
        enqueueSnackbar("Der Prozess wurde erfolgreich beendet", {variant: "success"});
        history.push('/bearbeiten');
    };

    const fetchDpps = () => {
        store.vppStore.getDppsByVpp(store.vppStore.creatingState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        )
    };

    return (
        <div className={'create-vpp'}>
            <CreateStepComponent currentStep={1}/>
            <h2 style={{marginTop: 32}}>Schritt 1: Hinzufügen dezentraler Kraftwerke</h2>
            <p>Ein virtuelles Kraftwerk beinhaltet beliebig viele dez. Kraftwerke. In diesem Schritt werden diese dem
                virtuellen Kraftwerk hinzugefügt.</p>
            <Table dataSource={store.vppStore.dpps} columns={columns}/>

            <Row style={{marginTop: 16}}>
                <Col>
                    <Button onClick={onOpenAddDppModal} type="primary" icon={<PlusOutlined/>}>
                        Dez. Kraftwerk hinzufügen
                    </Button>
                </Col>
            </Row>

            <Row style={{marginTop: 16}} justify="end">
                <Col>
                    <Popconfirm
                        title="Möchten Sie diesen Prozess wirklich beenden?"
                        onConfirm={onEnd}
                        onCancel={() => {
                        }}
                        okText="Ja"
                        cancelText="Nein"
                    >
                        <Button style={{marginRight: 8}}>
                            Prozess beenden
                        </Button>
                    </Popconfirm>
                </Col>
                <Col>
                    <Button onClick={onForward} type="primary">
                        Weiter zu Schritt 2
                    </Button>
                </Col>
            </Row>


            <DppForm
                visible={store.vppStore.stepOneState.isAddingDpp}
                onFinish={onFinishCreateDpp}
                onCancel={onCancelCreateDpp}
                editing={false}
            />
        </div>

    );


});

export default AddDppsComponent;
