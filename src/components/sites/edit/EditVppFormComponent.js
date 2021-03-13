import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Checkbox, Collapse, Input, InputNumber, Modal, Popconfirm, Select, Slider, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';

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
        store.masterdataStore.stepThreeState.isAddingProducer = true;
        store.masterdataStore.stepThreeState.isAddingToDpp = true;
        store.masterdataStore.stepThreeState.isAddingToHousehold = false;
        store.masterdataStore.stepThreeState.dppId = dppId;
    };

    const onOpenAddStorageWithDpp = (dppId) => {
        store.masterdataStore.stepThreeState.isAddingStorage = true;
        store.masterdataStore.stepThreeState.isAddingToDpp = true;
        store.masterdataStore.stepThreeState.isAddingToHousehold = false;
        store.masterdataStore.stepThreeState.dppId = dppId;
    };

    const onOpenAddProducerWithHousehold = (householdId) => {
        store.masterdataStore.stepThreeState.isAddingProducer = true;
        store.masterdataStore.stepThreeState.isAddingToDpp = false;
        store.masterdataStore.stepThreeState.isAddingToHousehold = true;
        store.masterdataStore.stepThreeState.householdId = householdId;
    };

    const onOpenAddStorageWithHousehold = (householdId) => {
        store.masterdataStore.stepThreeState.isAddingStorage = true;
        store.masterdataStore.stepThreeState.isAddingToDpp = false;
        store.masterdataStore.stepThreeState.isAddingToHousehold = true;
        store.masterdataStore.stepThreeState.householdId = householdId;
    };

    const onChangeProducerName = (e) => {
        store.masterdataStore.stepThreeState.producerName = e.target.value;
    };

    const onChangeProducerPower = (value) => {
        store.masterdataStore.stepThreeState.producerPower = value;
    };

    const onChangeProducerEnergyType = (value) => {
        store.masterdataStore.stepThreeState.producerEnergyType = value;
    };

    const onChangeProducerCapacity = (value) => {
        store.masterdataStore.stepThreeState.producerCapacity = value;
    };

    const onChangeProducerType = (value) => {
        store.masterdataStore.stepThreeState.producerType = value;
    };

    const onChangeProducerIsRunning = (e) => {
        store.masterdataStore.stepThreeState.producerIsRunning = e.target.checked;
    };

    const onChangeStorageName = (e) => {
        store.masterdataStore.stepThreeState.storageName = e.target.value;
    };

    const onChangeStoragePower = (value) => {
        store.masterdataStore.stepThreeState.storagePower = value;
    };

    const onChangeStorageEnergyType = (value) => {
        store.masterdataStore.stepThreeState.storageEnergyType = value;
    };

    const onChangeStorageCapacity = (value) => {
        store.masterdataStore.stepThreeState.storageCapacity = value;
    };


    const cancelAddProducer = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
    };


    const cancelAddStorage = () => {
        store.masterdataStore.stepThreeState.isAddingStorage = false;
    };

    const acceptAddProducer = () => {
        //todo validation
        if (store.masterdataStore.stepThreeState.producerName !== '' &&
            store.masterdataStore.stepThreeState.producerName.length > 0) {
            let dto = {
                producerId: store.masterdataStore.stepThreeState.producerName,
                ratedPower: store.masterdataStore.stepThreeState.producerPower,
                productType: store.masterdataStore.stepThreeState.producerType,
                energyType: store.masterdataStore.stepThreeState.producerEnergyType,
                isRunning: store.masterdataStore.stepThreeState.producerIsRunning,
                capacity: store.masterdataStore.stepThreeState.producerCapacity
            };
            if (store.masterdataStore.stepThreeState.isAddingToDpp) {
                store.masterdataStore.saveProducerToDpp(dto, store.masterdataStore.stepThreeState.dppId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.resetStepThreeModals();
                        fetchHouseholds();
                        fetchDpps();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (store.masterdataStore.stepThreeState.isAddingToHousehold) {
                store.masterdataStore.saveProducerToHousehold(dto, store.masterdataStore.stepThreeState.householdId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.resetStepThreeModals();
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

        } else {
            enqueueSnackbar("Der Name der Erzeugungsanlage muss min. X Zeichen enthalten", {variant: "error"})
        }
    };


    const acceptAddStorage = () => {
        //todo validation
        if (store.masterdataStore.stepThreeState.storageName !== '' &&
            store.masterdataStore.stepThreeState.storageName.length > 0) {
            let dto = {
                storageId: store.masterdataStore.stepThreeState.storageName,
                ratedPower: store.masterdataStore.stepThreeState.storagePower,
                energyType: store.masterdataStore.stepThreeState.storageEnergyType,
                capacity: store.masterdataStore.stepThreeState.storageCapacity,
            };
            if (store.masterdataStore.stepThreeState.isAddingToDpp) {
                store.masterdataStore.saveStorageToDpp(dto, store.masterdataStore.stepThreeState.dppId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingStorage = false;
                        store.masterdataStore.resetStepThreeModals();
                        fetchHouseholds();
                        fetchDpps();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (store.masterdataStore.stepThreeState.isAddingToHousehold) {
                store.masterdataStore.saveStorageToHousehold(dto, store.masterdataStore.stepThreeState.householdId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingStorage = false;
                        store.masterdataStore.resetStepThreeModals();
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
        console.log("edit dpp", dppId)
    };

    const onDeleteDpp = (dppId) => {
        console.log("edit dpp", dppId)
    };

    const onOpenEditHousehold = (householdId) => {
        console.log("edit household", householdId)
    };

    const onDeleteHousehold = (householdId) => {
        console.log("edit household", householdId)
    };

    const onOpenEditProducer = (producerId) => {
        console.log("edit producer", producerId)
    };

    const onDeleteProducer = (producerId) => {
        console.log("edit producer", producerId)
    };

    const onOpenEditStorage = (storageId) => {
        console.log("edit storage", storageId)
    };

    const onDeleteStorage = (storageId) => {
        console.log("edit storage", storageId)
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
                        <h3>Dezentrale Kraftwerke</h3>
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


                        <Modal title="Erzeugungsanlage hinzufügen"
                               visible={store.masterdataStore.stepThreeState.isAddingProducer}
                               onOk={acceptAddProducer}
                               onCancel={cancelAddProducer}>
                            <p>Bitte pflege die Daten für die Erzeugungsanlage ein.</p>
                            <Input value={store.masterdataStore.stepThreeState.producerName}
                                   onChange={onChangeProducerName}
                                   placeholder="Name der Erzeugungsanlage"/>
                            <InputNumber value={store.masterdataStore.stepThreeState.producerPower}
                                         onChange={onChangeProducerPower}
                                         placeholder="Leistung"/>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="Art der Anlage"
                                onChange={onChangeProducerType}
                                value={store.masterdataStore.stepThreeState.producerType}
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
                                value={store.masterdataStore.stepThreeState.producerEnergyType}
                            >
                                <Option value="ELECTRICITY">Elektrische Energie</Option>
                                <Option value="HEAT">Thermische Energie</Option>
                            </Select>
                            <Checkbox checked={store.masterdataStore.stepThreeState.producerIsRunning}
                                      onChange={onChangeProducerIsRunning}>Anlage läuft?</Checkbox>
                            Kapazität
                            <Slider value={store.masterdataStore.stepThreeState.producerCapacity} defaultValue={100}
                                    onChange={onChangeProducerCapacity}/>
                        </Modal>
                        <Modal title="Speicherungsanlage hinzufügen"
                               visible={store.masterdataStore.stepThreeState.isAddingStorage}
                               onOk={acceptAddStorage}
                               onCancel={cancelAddStorage}>
                            <p>Bitte pflege die Daten für die Speicheranlage ein.</p>
                            <Input value={store.masterdataStore.stepThreeState.storageName}
                                   onChange={onChangeStorageName}
                                   placeholder="Name der Speicheranlage"/>
                            <InputNumber value={store.masterdataStore.stepThreeState.storagePower}
                                         onChange={onChangeStoragePower}
                                         placeholder="Leistung"/>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="Art des Energiespeichers"
                                onChange={onChangeStorageEnergyType}
                                value={store.masterdataStore.stepThreeState.storageEnergyType}
                            >
                                <Option value="ELECTRICITY">Elektrische Energie</Option>
                                <Option value="HEAT">Thermische Energie</Option>
                            </Select>
                            Aktuelle Speicherkapazität
                            <Slider value={store.masterdataStore.stepThreeState.storageCapacity} defaultValue={100}
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
