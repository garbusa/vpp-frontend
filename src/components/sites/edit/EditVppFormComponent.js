import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Checkbox, Collapse, Input, InputNumber, Modal, Popconfirm, Select, Slider, Space, Table} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';

const EditVppFormComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    const {Panel} = Collapse;
    const {Option} = Select;


    const DppActions = (props) => {
        return (
            <div>
                DK Aktionen:
                <Space size="middle">
                    <Button onClick={() => onOpenEditDpp(props.decentralizedPowerPlantId)} type="primary"
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Möchtest du das dez. Kraftwerk wirklich löschen?"
                        onConfirm={() => onDeleteDpp(props.decentralizedPowerPlantId)}
                        okText="Ja"
                        cancelText="Nein"
                    >
                        <Button type="danger"
                                icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Space>
            </div>
        )
    };

    const HouseholdActions = (props) => {
        return (
            <div>
                Haushalt Aktionen:
                <Space size="middle">
                    <Button onClick={() => onOpenEditHousehold(props.householdId)} type="primary"
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Möchtest du das Haushalt wirklich löschen?"
                        onConfirm={() => onDeleteHousehold(props.householdId)}
                        okText="Ja"
                        cancelText="Nein"
                    >
                        <Button type="danger" icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Space>
            </div>
        )
    };

    const ProducerActions = (props) => {
        return (
            <div>
                <Space size="middle">
                    <Button onClick={() => onOpenEditProducer(props.producerId)} type="primary"
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Möchtest du die Erzeugungsanlage wirklich löschen?"
                        onConfirm={() => onDeleteProducer(props.producerId)}
                        okText="Ja"
                        cancelText="Nein"
                    >
                        <Button type="danger" icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Space>
            </div>
        )
    };


    const StorageActions = (props) => {
        return (
            <div>
                <Space size="middle">
                    <Button onClick={() => onOpenEditStorage(props.storageId)} type="primary"
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Möchtest du die Speicheranlage wirklich löschen?"
                        onConfirm={() => onDeleteStorage(props.storageId)}
                        okText="Ja"
                        cancelText="Nein"
                    >
                        <Button type="danger" icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Space>
            </div>
        )
    };


    const producerColumns = [
        {
            title: 'Erzeugungsanlagen',
            dataIndex: 'producerId',
            key: 'producerId',
        },
        {
            title: 'Aktionen',
            key: 'actions',
            render: (record) => (
                <ProducerActions producerId={record.producerId}/>
            ),
        },
    ];

    const storageColumns = [
        {
            title: 'Speicheranlagen',
            dataIndex: 'storageId',
            key: 'storageId',
        },
        {
            title: 'Aktionen',
            key: 'actions',
            render: (record) => (
                <StorageActions storageId={record.storageId}/>
            ),
        },
    ];

    useEffect(() => {
    }, []);

    const onOpenAddProducerWithDpp = (dppId) => {
        store.masterdataStore.editState.isAddingProducer = true;
        store.masterdataStore.editState.isAddingToDpp = true;
        store.masterdataStore.editState.isAddingToHousehold = false;
        store.masterdataStore.editState.dppId = dppId;
    };

    const onOpenAddStorageWithDpp = (dppId) => {
        store.masterdataStore.editState.isAddingStorage = true;
        store.masterdataStore.editState.isAddingToDpp = true;
        store.masterdataStore.editState.isAddingToHousehold = false;
        store.masterdataStore.editState.dppId = dppId;
    };

    const onOpenAddProducerWithHousehold = (householdId) => {
        store.masterdataStore.editState.isAddingProducer = true;
        store.masterdataStore.editState.isAddingToDpp = false;
        store.masterdataStore.editState.isAddingToHousehold = true;
        store.masterdataStore.editState.householdId = householdId;
    };

    const onOpenAddStorageWithHousehold = (householdId) => {
        store.masterdataStore.editState.isAddingStorage = true;
        store.masterdataStore.editState.isAddingToDpp = false;
        store.masterdataStore.editState.isAddingToHousehold = true;
        store.masterdataStore.editState.householdId = householdId;
    };

    const onChangeProducerName = (e) => {
        store.masterdataStore.editState.producer.producerId = e.target.value;
    };

    const onChangeProducerPower = (value) => {
        store.masterdataStore.editState.producer.ratedPower = value;
    };

    const onChangeProducerEnergyType = (value) => {
        store.masterdataStore.editState.producer.energyType = value;
    };

    const onChangeProducerCapacity = (value) => {
        store.masterdataStore.editState.producer.capacity = value;
    };

    const onChangeProducerType = (value) => {
        store.masterdataStore.editState.producer.productType = value;
    };

    const onChangeProducerIsRunning = (e) => {
        store.masterdataStore.editState.producer.isRunning = e.target.checked;
    };

    const onChangeStorageName = (e) => {
        store.masterdataStore.editState.storage.storageId = e.target.value;
    };

    const onChangeStoragePower = (value) => {
        store.masterdataStore.editState.storage.ratedPower = value;
    };

    const onChangeStorageEnergyType = (value) => {
        store.masterdataStore.editState.storage.energyType = value;
    };

    const onChangeStorageCapacity = (value) => {
        store.masterdataStore.editState.storage.capacity = value;
    };

    const cancelAddOrEditProducer = () => {
        store.masterdataStore.editState.isAddingProducer = false;
        store.masterdataStore.editState.isEditingProducer = false;
    };


    const cancelAddOrEditStorage = () => {
        store.masterdataStore.editState.isAddingStorage = false;
        store.masterdataStore.editState.isEditingStorage = false;
    };

    const acceptAddOrEditProducer = () => {
        //todo validation
        if (store.masterdataStore.editState.producer.producerId !== '' &&
            store.masterdataStore.editState.producer.producerId.length > 0) {
            let dto = store.masterdataStore.editState.producer;

            if (store.masterdataStore.editState.isAddingProducer) {
                if (store.masterdataStore.editState.isAddingToDpp) {
                    store.masterdataStore.saveProducerToDpp(dto, store.masterdataStore.editState.dppId).then((result) => {
                        if (result.success) {
                            fetchDpps();
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.resetEditStates();
                            enqueueSnackbar(result.message, {variant: result.variant})
                        } else {
                            enqueueSnackbar(result.message, {variant: result.variant})
                        }
                    });
                } else if (store.masterdataStore.editState.isAddingToHousehold) {
                    store.masterdataStore.saveProducerToHousehold(dto, store.masterdataStore.editState.householdId).then((result) => {
                        if (result.success) {
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.resetEditStates();
                            fetchHouseholds();
                            enqueueSnackbar(result.message, {variant: result.variant})
                        } else {
                            enqueueSnackbar(result.message, {variant: result.variant})
                        }
                    });
                } else {
                    enqueueSnackbar("Beim Speichern ist etwas schief gelaufen", {variant: "error"})
                }
            } else if (store.masterdataStore.editState.isEditingProducer) {
                store.masterdataStore.updateProducer(store.masterdataStore.editState.producerId,
                    store.masterdataStore.editState.vppId, dto).then((result) => {
                    if (result.success) {
                        fetchHouseholds();
                        fetchDpps();
                        store.masterdataStore.editState.isEditingProducer = false;
                        store.masterdataStore.resetEditStates();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else {
                enqueueSnackbar("Beim Speichern ist etwas schief gelaufen", {variant: "error"})
            }

        } else {
            enqueueSnackbar("Der Name der Erzeugungsanlage muss min. X Zeichen enthalten", {variant: "error"})
        }
    };


    const acceptAddOrEditStorage = () => {
        //todo validation
        if (store.masterdataStore.editState.storage.storageId !== '' &&
            store.masterdataStore.editState.storage.storageId.length > 0) {
            let dto = store.masterdataStore.editState.storage;
            if (store.masterdataStore.editState.isAddingStorage) {
                if (store.masterdataStore.editState.isAddingToDpp) {
                    store.masterdataStore.saveStorageToDpp(dto, store.masterdataStore.editState.dppId).then((result) => {
                        if (result.success) {
                            store.masterdataStore.editState.isAddingStorage = false;
                            store.masterdataStore.resetEditStates();
                            fetchHouseholds();
                            fetchDpps();
                            enqueueSnackbar(result.message, {variant: result.variant})
                        } else {
                            enqueueSnackbar(result.message, {variant: result.variant})
                        }
                    });
                } else if (store.masterdataStore.editState.isAddingToHousehold) {
                    store.masterdataStore.saveStorageToHousehold(dto, store.masterdataStore.editState.householdId).then((result) => {
                        if (result.success) {
                            store.masterdataStore.editState.isAddingStorage = false;
                            store.masterdataStore.resetEditStates();
                            fetchHouseholds();
                            fetchDpps();
                            enqueueSnackbar(result.message, {variant: result.variant})
                        } else {
                            enqueueSnackbar(result.message, {variant: result.variant})
                        }
                    });
                } else {
                    enqueueSnackbar("Beim Speichern ist etwas schief gelaufen", {variant: "error"})
                }
            } else if (store.masterdataStore.editState.isEditingStorage) {
                store.masterdataStore.updateStorage(store.masterdataStore.editState.storageId,
                    store.masterdataStore.editState.vppId, dto).then((result) => {
                    if (result.success) {
                        fetchHouseholds();
                        fetchDpps();
                        store.masterdataStore.editState.isEditingStorage = false;
                        store.masterdataStore.resetEditStates();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else {
                enqueueSnackbar("Beim Speichern ist etwas schief gelaufen", {variant: "error"})
            }


        } else {
            enqueueSnackbar("Der Name der Speicheranlage muss min. X Zeichen enthalten", {variant: "error"})
        }
    };

    const fetchHouseholds = () => {
        store.masterdataStore.getHouseholdsByVpp(store.masterdataStore.editState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        )
    };

    const fetchDpps = () => {
        store.masterdataStore.getDppsByVpp(store.masterdataStore.editState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                }
            }
        )
    };

    const onOpenEditDpp = (dppId) => {
        store.masterdataStore.getDppById(dppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    store.masterdataStore.editState.dppId = dppId;
                    store.masterdataStore.editState.isEditingDpp = true;
                }
            }
        )
    };

    const onDeleteDpp = (dppId) => {
        store.masterdataStore.deleteDpp(dppId, store.masterdataStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    fetchDpps().then(() => store.masterdataStore.resetEditStates());
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onOpenEditHousehold = (householdId) => {
        store.masterdataStore.getHouseholdById(householdId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    store.masterdataStore.editState.householdId = householdId;
                    store.masterdataStore.editState.isEditingHousehold = true;
                }
            }
        )
    };

    const onDeleteHousehold = (householdId) => {
        store.masterdataStore.deleteHousehold(householdId, store.masterdataStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    fetchHouseholds().then(() => store.masterdataStore.resetEditStates());
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onOpenEditProducer = (producerId) => {
        store.masterdataStore.getProducerById(producerId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    store.masterdataStore.editState.producerId = producerId;
                    store.masterdataStore.editState.isEditingProducer = true;
                }
            }
        )
    };

    const onDeleteProducer = (producerId) => {
        store.masterdataStore.deleteProducer(producerId, store.masterdataStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    fetchDpps().then(() => fetchHouseholds().then(() => store.masterdataStore.resetEditStates()));
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onOpenEditStorage = (storageId) => {
        store.masterdataStore.getStorageById(storageId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    store.masterdataStore.editState.storageId = storageId;
                    store.masterdataStore.editState.isEditingStorage = true;
                }
            }
        )
    };

    const onDeleteStorage = (storageId) => {
        store.masterdataStore.deleteStorage(storageId, store.masterdataStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    fetchDpps().then(() => fetchHouseholds().then(() => store.masterdataStore.resetEditStates()));
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onOpenEditVpp = (vppId) => {
        store.masterdataStore.getVppById(vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    store.masterdataStore.editState.isEditingVpp = true;
                }
            }
        )
    };

    const onChangeVirtualPowerPlantId = (e) => {
        store.masterdataStore.editState.vpp.virtualPowerPlantId = e.target.value;
    };

    const acceptEditVpp = () => {
        let dto = store.masterdataStore.editState.vpp;
        store.masterdataStore.updateVpp(store.masterdataStore.editState.vppId, dto).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    store.masterdataStore.resetEditStates();
                    store.masterdataStore.editState.isEditingVpp = false;
                    store.masterdataStore.getAllVppsAction();
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        );
    };

    const onDeleteVpp = () => {
        store.masterdataStore.deleteVpp(store.masterdataStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    store.masterdataStore.resetStateOnEnd().then(
                        () => {
                            store.masterdataStore.getAllVppsAction();
                        }
                    );
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const cancelEditVpp = () => {
        store.masterdataStore.editState.isEditingVpp = false;
    };

    const onOpenAddDpp = () => {
        store.masterdataStore.editState.isAddingDpp = true;
    };

    const acceptAddOrEditDpp = () => {
        if (store.masterdataStore.editState.isAddingDpp) {
            let dto = store.masterdataStore.editState.dpp;
            store.masterdataStore.saveDpp(dto, store.masterdataStore.editState.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        store.masterdataStore.editState.isAddingDpp = false;
                        store.masterdataStore.resetEditStates();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (store.masterdataStore.editState.isEditingDpp) {
            let dto = store.masterdataStore.editState.dpp;
            store.masterdataStore.updateDpp(store.masterdataStore.editState.dppId, store.masterdataStore.editState.vppId, dto).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        store.masterdataStore.editState.isEditingDpp = false;
                        store.masterdataStore.resetEditStates();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else {
            enqueueSnackbar("something went wrong", {variant: "error"});
        }
    };

    const cancelAddOrEditDpp = () => {
        store.masterdataStore.editState.isAddingDpp = false;
        store.masterdataStore.editState.isEditingDpp = false;
    };

    const onChangeDezentralizedPowerPlantId = (e) => {
        store.masterdataStore.editState.dpp.decentralizedPowerPlantId = e.target.value;
    };

    const acceptAddOrEditHousehold = () => {
        if (store.masterdataStore.editState.isAddingHousehold) {
            let dto = store.masterdataStore.editState.household;
            store.masterdataStore.saveHousehold(store.masterdataStore.editState.vppId, dto).then(
                (result) => {
                    if (result.success) {
                        fetchHouseholds();
                        store.masterdataStore.editState.isAddingHousehold = false;
                        store.masterdataStore.resetEditStates();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (store.masterdataStore.editState.isEditingHousehold) {
            let dto = store.masterdataStore.editState.household;
            store.masterdataStore.updateHousehold(store.masterdataStore.editState.householdId, store.masterdataStore.editState.vppId, dto).then(
                (result) => {
                    if (result.success) {
                        fetchHouseholds();
                        store.masterdataStore.editState.isEditingHousehold = false;
                        store.masterdataStore.resetEditStates();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else {
            enqueueSnackbar("something went wrong", {variant: "error"});
        }
    };

    const cancelAddOrEditHousehold = () => {
        store.masterdataStore.editState.isAddingHousehold = false;
        store.masterdataStore.editState.isEditingHousehold = false;
    };

    const onOpenAddHousehold = () => {
        store.masterdataStore.editState.isAddingHousehold = true;
    };

    const onChangeHouseholdId = (e) => {
        store.masterdataStore.editState.household.householdId = e.target.value;
    };

    const onChangeHouseholdMemberAmount = (value) => {
        store.masterdataStore.editState.household.householdMemberAmount = value;
    };

    const onPublish = () => {
        store.masterdataStore.publishVpp(store.masterdataStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    store.masterdataStore.resetEditStates();
                    store.masterdataStore.getAllVppsAction();
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onUnpublish = () => {
        store.masterdataStore.unpublishVpp(store.masterdataStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    store.masterdataStore.resetEditStates();
                    store.masterdataStore.getAllVppsAction();
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    if (store.masterdataStore.isLoading) {
        return (
            <div className="test">
                loading
            </div>
        );

    } else {
        if (store.masterdataStore.vpps.length < 1) {
            return <div></div>;
        } else {
            if (store.masterdataStore.editState.vppId !== undefined && store.masterdataStore.editState.vppId !== ''
                && store.masterdataStore.editState.vppId !== null) {
                return (
                    <div className={'edit-vpp-form'}>
                        <p>
                            VK Aktionen:
                            <Space size="middle">
                                <Button onClick={() => onOpenEditVpp(store.masterdataStore.editState.vppId)}
                                        type="primary"
                                        icon={<EditOutlined/>}/>
                                <Popconfirm
                                    title={"Möchtest du wirklich das gesamte virtuelle Kraftwerk löschen?"}
                                    onConfirm={() => onDeleteVpp(store.masterdataStore.editState.vppId)}
                                    okText="Ja"
                                    cancelText="Nein"
                                >
                                    <Button type="danger" icon={<DeleteOutlined/>}/>
                                </Popconfirm>
                                <Popconfirm
                                    title={"Möchtest du wirklich das VK publizieren? Dadurch werden im Hintergrund Prozesse gestartet."}
                                    onConfirm={onPublish}
                                    okText="Ja"
                                    cancelText="Nein"
                                >
                                    <Button type="default" icon={<CheckOutlined/>}>Publizieren</Button>
                                </Popconfirm>
                                <Popconfirm
                                    title={"Möchtest du die publizierung wirlich rückgängig machen? Dadurch werden die Prozesse im Hintergrund abgebrochen."}
                                    onConfirm={onUnpublish}
                                    okText="Ja"
                                    cancelText="Nein"
                                >
                                    <Button type="default" icon={<CloseOutlined/>}>Publizieren Rückgängig</Button>
                                </Popconfirm>
                            </Space>
                        </p>
                        <h3>Dezentrale Kraftwerke</h3>
                        <Button onClick={onOpenAddDpp}
                                type="primary"
                                icon={<PlusOutlined/>}>
                            Dez. Kraftwerk hinzufügen
                        </Button>
                        {store.masterdataStore.dpps.map((dpp) => {
                            return (<Collapse collapsible="header">
                                <Panel header={dpp.decentralizedPowerPlantId} key={dpp.decentralizedPowerPlantId}>
                                    <DppActions decentralizedPowerPlantId={dpp.decentralizedPowerPlantId}/>
                                    <Table dataSource=
                                               {
                                                   store.masterdataStore.dpps.find(obj => {
                                                       return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
                                                   }).producers
                                               }
                                           columns={producerColumns}/>
                                    <Button onClick={() => onOpenAddProducerWithDpp(dpp.decentralizedPowerPlantId)}
                                            type="primary"
                                            icon={<PlusOutlined/>}>
                                        Erzeugungsanlage hinzufügen
                                    </Button>
                                    <Table dataSource=
                                               {
                                                   store.masterdataStore.dpps.find(obj => {
                                                       return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
                                                   }).storages
                                               }
                                           columns={storageColumns}/>
                                    <Button onClick={() => onOpenAddStorageWithDpp(dpp.decentralizedPowerPlantId)}
                                            type="primary"
                                            icon={<PlusOutlined/>}>
                                        Speicheranlage hinzufügen
                                    </Button>
                                </Panel>
                            </Collapse>)
                        })}

                        <h3>Haushalte</h3>
                        <Button onClick={onOpenAddHousehold}
                                type="primary"
                                icon={<PlusOutlined/>}>
                            Haushalt hinzufügen
                        </Button>
                        {store.masterdataStore.households.map((dpp) => {
                            return (<Collapse collapsible="header">
                                <Panel header={dpp.householdId} key={dpp.householdId}>
                                    <HouseholdActions householdId={dpp.householdId}/>
                                    <Table
                                        dataSource=
                                            {store.masterdataStore.households.find(obj => {
                                                return obj.householdId === dpp.householdId
                                            }).producers}

                                        columns={producerColumns}/>
                                    <Button onClick={() => onOpenAddProducerWithHousehold(dpp.householdId)}
                                            type="primary"
                                            icon={<PlusOutlined/>}>
                                        Erzeugungsanlage hinzufügen
                                    </Button>
                                    <Table
                                        dataSource=
                                            {
                                                store.masterdataStore.households.find(obj => {
                                                    return obj.householdId === dpp.householdId
                                                }).storages
                                            }

                                        columns={storageColumns}/>
                                    <Button onClick={(e) => onOpenAddStorageWithHousehold(dpp.householdId)}
                                            type="primary"
                                            icon={<PlusOutlined/>}>
                                        Speicheranlage hinzufügen
                                    </Button>
                                </Panel>
                            </Collapse>)
                        })}

                        <Modal title="Virtulles Kraftwerk"
                               visible={store.masterdataStore.editState.isEditingVpp}
                               onOk={acceptEditVpp}
                               onCancel={cancelEditVpp}>
                            <p>Bitte pflege die Daten für das virtuelle Kraftwerk ein.</p>
                            <Input value={store.masterdataStore.editState.vpp.virtualPowerPlantId}
                                   onChange={onChangeVirtualPowerPlantId}
                                   placeholder="Name des virtuellen Kraftwerks"/>
                        </Modal>

                        <Modal title="Dez. Kraftwerk"
                               visible={store.masterdataStore.editState.isEditingDpp || store.masterdataStore.editState.isAddingDpp}
                               onOk={acceptAddOrEditDpp}
                               onCancel={cancelAddOrEditDpp}>
                            <p>Bitte pflege die Daten für das dez. Kraftwerk ein.</p>
                            <Input value={store.masterdataStore.editState.dpp.decentralizedPowerPlantId}
                                   onChange={onChangeDezentralizedPowerPlantId}
                                   placeholder="Name des dez. Kraftwerks"/>
                        </Modal>

                        <Modal title="Haushalt"
                               visible={store.masterdataStore.editState.isEditingHousehold || store.masterdataStore.editState.isAddingHousehold}
                               onOk={acceptAddOrEditHousehold}
                               onCancel={cancelAddOrEditHousehold}>
                            <p>Bitte pflege die Daten für das Haushalt ein.</p>
                            <Input value={store.masterdataStore.editState.household.householdId}
                                   onChange={onChangeHouseholdId}
                                   placeholder="Name des Haushaltes"/>
                            <InputNumber value={store.masterdataStore.editState.household.householdMemberAmount}
                                         onChange={onChangeHouseholdMemberAmount}
                                         placeholder="Anzahl der Haushaltsmitglieder"/>
                        </Modal>


                        <Modal title="Erzeugungsanlage"
                               visible={store.masterdataStore.editState.isAddingProducer || store.masterdataStore.editState.isEditingProducer}
                               onOk={acceptAddOrEditProducer}
                               onCancel={cancelAddOrEditProducer}>
                            <p>Bitte pflege die Daten für die Erzeugungsanlage ein.</p>
                            <Input value={store.masterdataStore.editState.producer.producerId}
                                   onChange={onChangeProducerName}
                                   placeholder="Name der Erzeugungsanlage"/>
                            <InputNumber value={store.masterdataStore.editState.producer.ratedPower}
                                         onChange={onChangeProducerPower}
                                         placeholder="Leistung"/>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="Art der Anlage"
                                onChange={onChangeProducerType}
                                value={store.masterdataStore.editState.producer.producerType}
                            >
                                <Option value="WIND">Windenergie</Option>
                                <Option value="SOLAR">Solarenergie</Option>
                                <Option value="WATER">Wasserenergie</Option>
                                <Option value="BIO">Bioenergie</Option>
                            </Select>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="Energieoutput"
                                onChange={onChangeProducerEnergyType}
                                value={store.masterdataStore.editState.producer.energyType}
                            >
                                <Option value="ELECTRICITY">Elektrische Energie</Option>
                                <Option value="HEAT">Thermische Energie</Option>
                            </Select>
                            <Checkbox checked={store.masterdataStore.editState.producer.isRunning}
                                      onChange={onChangeProducerIsRunning}>Anlage läuft?</Checkbox>
                            Kapazität
                            <Slider value={store.masterdataStore.editState.producer.capacity} defaultValue={100}
                                    onChange={onChangeProducerCapacity}/>
                        </Modal>

                        <Modal title="Speicherungsanlage hinzufügen"
                               visible={store.masterdataStore.editState.isAddingStorage ||
                               store.masterdataStore.editState.isEditingStorage}
                               onOk={acceptAddOrEditStorage}
                               onCancel={cancelAddOrEditStorage}>
                            <p>Bitte pflege die Daten für die Speicheranlage ein.</p>
                            <Input value={store.masterdataStore.editState.storage.storageId}
                                   onChange={onChangeStorageName}
                                   placeholder="Name der Speicheranlage"/>
                            <InputNumber value={store.masterdataStore.editState.storage.ratedPower}
                                         onChange={onChangeStoragePower}
                                         placeholder="Leistung"/>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="Art des Energiespeichers"
                                onChange={onChangeStorageEnergyType}
                                value={store.masterdataStore.editState.storage.energyType}
                            >
                                <Option value="ELECTRICITY">Elektrische Energie</Option>
                                <Option value="HEAT">Thermische Energie</Option>
                            </Select>
                            Aktuelle Speicherkapazität
                            <Slider value={store.masterdataStore.editState.storage.capacity} defaultValue={100}
                                    onChange={onChangeStorageCapacity}/>
                        </Modal>
                    </div>
                );
            } else {
                return <p>Wähle ein virtuelles Kraftwerk aus, um es zu editieren.</p>
            }
        }

    }


});

export default EditVppFormComponent;
