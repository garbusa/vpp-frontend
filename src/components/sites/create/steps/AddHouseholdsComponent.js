import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Input, Modal, Steps, Table} from "antd";
import history from "../../../../history";
import {PlusOutlined} from '@ant-design/icons';

const AddHouseholdsComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    const {Step} = Steps;
    const columns = [
        {
            title: 'Haushalte',
            dataIndex: 'householdId',
            key: 'householdId',
        },
        {
            title: 'Anzahl Haushaltsmitglieder',
            dataIndex: 'householdMemberAmount',
            key: 'householdMemberAmount',
        },
    ];

    useEffect(() => {
        if (store.masterdataStore.creatingState.step !== 2) {
            if (store.masterdataStore.creatingState.step === 0) {
                history.push("/erstellen")
            }
            if (store.masterdataStore.creatingState.step === 1) {
                history.push("/erstellen/schritt-1")
            }
            if (store.masterdataStore.creatingState.step === 3) {
                history.push("/erstellen/schritt-3")
            }
        } else {
            fetchHouseholds();
        }

        //@todo check creatingstate
    }, []);

    const acceptAddHousehold = () => {
        if (store.masterdataStore.stepTwoState.householdName !== '' &&
            store.masterdataStore.stepTwoState.householdName.length > 0) {
            let dto =
                {
                    householdId: store.masterdataStore.stepTwoState.householdName,
                    householdMemberAmount: store.masterdataStore.stepTwoState.householdAmount
                };
            store.masterdataStore.saveHousehold(dto, store.masterdataStore.creatingState.vppId).then((result) => {
                if (result.success) {
                    store.masterdataStore.stepTwoState.isAddingHousehold = false;
                    fetchHouseholds();
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            });
        } else {
            enqueueSnackbar("Der Name des Haushaltes muss min. 1 Zeichen enthalten", {variant: "error"})
        }
    };

    const cancelAddHousehold = () => {
        store.masterdataStore.stepTwoState.isAddingHousehold = false;
    };

    const onOpenAddHouseholdModal = () => {
        store.masterdataStore.stepTwoState.isAddingHousehold = true;
    };

    const onHouseholdNameChange = (e) => {
        store.masterdataStore.stepTwoState.householdName = e.target.value;
    };

    const onHouseholdAmountChange = (e) => {
        store.masterdataStore.stepTwoState.householdAmount = e.target.value;
    };

    const onForward = () => {
        store.masterdataStore.creatingState.step = 3;
        history.push('/erstellen/schritt-3');
    };

    const onBack = () => {
        store.masterdataStore.creatingState.step = 1;
        history.push('/erstellen/schritt-1');
    };

    const onEnd = () => {
        store.masterdataStore.creatingState.step = 0;
        history.push('/erstellen');
    };

    const fetchHouseholds = () => {
        store.masterdataStore.getHouseholdsByVpp(store.masterdataStore.creatingState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        )
    };

    return (
        <div className={'create-vpp'}>
            <Steps size="small" current={2}>
                <Step title="Prozess starten"/>
                <Step title="Dez. Kraftwerke"/>
                <Step title="Haushalte"/>
                <Step title="Erzeugungs- und Speicheranlagen"/>
            </Steps>
            <h2>Schritt 2: Hinzufügen der Haushalte</h2>
            <p>Ein virtuelles Kraftwerk beinhaltet beliebig viele Haushalte. In diesem Schritt werden diese dem
                virtuellen Kraftwerk hinzugefügt.</p>
            <Table dataSource={store.masterdataStore.households} columns={columns}/>
            <Button onClick={onOpenAddHouseholdModal} type="primary" icon={<PlusOutlined/>}>
                Haushalt hinzufügen
            </Button>
            <Button onClick={onEnd} type="primary">
                Prozess beenden
            </Button>
            <Button onClick={onBack} type="primary">
                Zurück zu Schritt 2
            </Button>
            <Button onClick={onForward} type="primary">
                Weiter zu Schritt 3
            </Button>

            <Modal title="Haushalt hinzufügen" visible={store.masterdataStore.stepTwoState.isAddingHousehold}
                   onOk={acceptAddHousehold}
                   onCancel={cancelAddHousehold}>
                <p>Ein Haushalt besteht aus einem eindeutigem Namen und die Anzahl der Haushaltsmitglieder.</p>
                <Input onChange={(e) => onHouseholdNameChange(e)} placeholder="Name des Haushaltes"/>
                <Input onChange={(e) => onHouseholdAmountChange(e)} placeholder="Anzahl der Haushaltsmitglieder"/>
            </Modal>
        </div>

    );


});

export default AddHouseholdsComponent;
