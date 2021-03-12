import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Input, Modal, Popconfirm, Steps, Table} from "antd";
import history from "../../../../history";
import {PlusOutlined} from '@ant-design/icons';

const AddDppsComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    const {Step} = Steps;
    const columns = [
        {
            title: 'Dezentrale Kraftwerke',
            dataIndex: 'decentralizedPowerPlantId',
            key: 'decentralizedPowerPlantId',
        },
    ];

    useEffect(() => {
        if (store.masterdataStore.creatingState.step !== 1) {
            if (store.masterdataStore.creatingState.step === 0) {
                history.push("/erstellen")
            }
            if (store.masterdataStore.creatingState.step === 2) {
                history.push("/erstellen/schritt-2")
            }
            if (store.masterdataStore.creatingState.step === 3) {
                history.push("/erstellen/schritt-3")
            }
        } else {
            fetchDpps();
        }

    }, []);

    const acceptAddDpp = () => {
        if (store.masterdataStore.stepOneState.dppName !== '' && store.masterdataStore.stepOneState.dppName.length > 3) {
            let dto = {decentralizedPowerPlantId: store.masterdataStore.stepOneState.dppName};
            store.masterdataStore.saveDpp(dto, store.masterdataStore.creatingState.vppId).then((result) => {
                if (result.success) {
                    store.masterdataStore.stepOneState.isAddingDpp = false;
                    store.masterdataStore.resetStepOneModals();
                    fetchDpps();
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            });
        } else {
            enqueueSnackbar("Der Name des DK muss min. 4 Zeichen enthalten", {variant: "error"})
        }
    };

    const cancelAddDpp = () => {
        store.masterdataStore.stepOneState.isAddingDpp = false;
    };

    const onOpenAddDppModal = () => {
        store.masterdataStore.stepOneState.isAddingDpp = true;
    };

    const onDppNameChange = (e) => {
        store.masterdataStore.stepOneState.dppName = e.target.value;
    };

    const onForward = () => {
        store.masterdataStore.creatingState.step = 2;
        history.push('/erstellen/schritt-2');
    };

    const onEnd = () => {
        store.masterdataStore.resetStateOnEnd();
        history.push('/erstellen');
    };

    const fetchDpps = () => {
        store.masterdataStore.getDppsByVpp(store.masterdataStore.creatingState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        )
    };

    return (
        <div className={'create-vpp'}>
            <Steps size="small" current={1}>
                <Step title="Prozess starten"/>
                <Step title="Dez. Kraftwerke"/>
                <Step title="Haushalte"/>
                <Step title="Erzeugungs- und Speicheranlagen"/>
            </Steps>
            <h2>Schritt 1: Hinzufügen dezentraler Kraftwerke</h2>
            <p>Ein virtuelles Kraftwerk beinhaltet beliebig viele dez. Kraftwerke. In diesem Schritt werden diese dem
                virtuellen Kraftwerk hinzugefügt.</p>
            <Table dataSource={store.masterdataStore.dpps} columns={columns}/>
            <Button onClick={onOpenAddDppModal} type="primary" icon={<PlusOutlined/>}>
                Dez. Kraftwerk hinzufügen
            </Button>
            <Popconfirm
                title="Möchtest du diesen Prozess wirklich beenden?"
                onConfirm={onEnd}
                onCancel={() => {
                }}
                okText="Ja"
                cancelText="Nein"
            >
                <Button type="primary">
                    Prozess beenden
                </Button>
            </Popconfirm>
            <Button onClick={onForward} type="primary">
                Weiter zu Schritt 2
            </Button>

            <Modal title="Dez. Kraftwerk hinzufügen" visible={store.masterdataStore.stepOneState.isAddingDpp}
                   onOk={acceptAddDpp} onCancel={cancelAddDpp}>
                <p>Ein dez. Kraftwerk besteht zunächst nur aus einem Namen. Diesem Kraftwerk werden in den nächsten
                    Schritten
                    Erzeugungsanlagen und Speichersysteme hinzugefügt.</p>
                <Input value={store.masterdataStore.stepOneState.dppName} onChange={(e) => onDppNameChange(e)}
                       placeholder="Name des dez. Kraftwerks"/>
            </Modal>
        </div>

    );


});

export default AddDppsComponent;
