import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Col, Popconfirm, Row, Table} from "antd";
import history from "../../../../history";
import {PlusOutlined} from '@ant-design/icons';
import {CreateStepComponent} from "../../../ui/step/CreateStepComponent";
import {HouseholdForm} from "../../../ui/data-forms/vpp/HouseholdForm";

const AddHouseholdsComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

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
        if (store.vppStore.creatingState.step !== 2) {
            if (store.vppStore.creatingState.step === 0) {
                history.push("/erstellen")
            }
            if (store.vppStore.creatingState.step === 1) {
                history.push("/erstellen/schritt-1")
            }
            if (store.vppStore.creatingState.step === 3) {
                history.push("/erstellen/schritt-3")
            }
        } else {
            fetchHouseholds();
        }
    }, []);

    const onFinishCreateHousehold = (record) => {
        store.vppStore.saveHousehold(store.vppStore.creatingState.vppId, record).then((result) => {
            if (result.success) {
                store.vppStore.stepTwoState.isAddingHousehold = false;
                fetchHouseholds();
                enqueueSnackbar(result.message, {variant: result.variant})
            } else {
                enqueueSnackbar(result.message, {variant: result.variant})
            }
        });
    };

    const onCancelCreateHousehold = () => {
        store.vppStore.stepTwoState.isAddingHousehold = false;
    };

    const onOpenAddHouseholdModal = () => {
        store.vppStore.stepTwoState.isAddingHousehold = true;
    };


    const onForward = () => {
        store.vppStore.creatingState.step = 3;
        history.push('/erstellen/schritt-3');
    };

    const onBack = () => {
        store.vppStore.creatingState.step = 1;
        history.push('/erstellen/schritt-1');
    };

    const onEnd = () => {
        store.vppStore.resetCreatingState();
        enqueueSnackbar("Der Prozess wurde erfolgreich beendet", {variant: "success"});
        history.push('/bearbeiten');
    };

    const fetchHouseholds = () => {
        store.vppStore.getHouseholdsByVpp(store.vppStore.creatingState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        )
    };

    return (
        <div className={'create-vpp'}>
            <CreateStepComponent currentStep={2}/>

            <h2 style={{marginTop: 32}}>Schritt 2: Hinzufügen der Haushalte</h2>

            <p>Ein virtuelles Kraftwerk beinhaltet beliebig viele Haushalte. In diesem Schritt werden diese dem
                virtuellen Kraftwerk hinzugefügt.</p>

            <Table dataSource={store.vppStore.households} columns={columns}/>

            <Row style={{marginTop: 16}}>
                <Col>
                    <Button onClick={onOpenAddHouseholdModal} type="primary" icon={<PlusOutlined/>}>
                        Haushalt hinzufügen
                    </Button>
                </Col>
            </Row>

            <Row style={{marginTop: 16}} justify="end">
                <Col>
                    <Popconfirm
                        title="Möchtest du diesen Prozess wirklich beenden?"
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
                    <Button style={{marginRight: 8}} onClick={onBack} type="primary">
                        Zurück zu Schritt 2
                    </Button>
                </Col>
                <Col>
                    <Button onClick={onForward} type="primary">
                        Weiter zu Schritt 3
                    </Button>
                </Col>
            </Row>

            <HouseholdForm
                visible={store.vppStore.stepTwoState.isAddingHousehold}
                onFinish={onFinishCreateHousehold}
                onCancel={onCancelCreateHousehold}
                editing={false}
            />
        </div>

    );


});

export default AddHouseholdsComponent;
