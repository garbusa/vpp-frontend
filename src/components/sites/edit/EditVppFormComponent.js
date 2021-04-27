import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Collapse, Input, InputNumber, Modal, Popconfirm, Select, Slider, Space, Table} from "antd";
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
                    <Button onClick={() => onOpenEditProducer(props.producerId, props.type)} type="primary"
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="Möchtest du die Erzeugungsanlage wirklich löschen?"
                        onConfirm={() => onDeleteProducer(props.producerId, props.type)}
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
            title: 'Typ',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Aktionen',
            key: 'actions',
            render: (record) => (
                <ProducerActions producerId={record.producerId} type={record.type}/>
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

    const onChangeWaterEnergyId = (e) => {
        store.masterdataStore.editState.waterEnergy.waterEnergyId = e.target.value;
    };

    const onChangeWaterEnergyEfficiency = (value) => {
        store.masterdataStore.editState.waterEnergy.efficiency = value;
    };

    const onChangeWaterEnergyCapacity = (value) => {
        store.masterdataStore.editState.waterEnergy.capacity = value;
    };

    const onChangeWaterEnergyRunning = (e) => {
        store.masterdataStore.editState.waterEnergy.running = e.target.checked;
    };

    const onChangeWaterEnergyDensity = (value) => {
        store.masterdataStore.editState.waterEnergy.density = value;
    };

    const onChangeWaterEnergyGravity = (value) => {
        store.masterdataStore.editState.waterEnergy.gravity = value;
    };

    const onChangeWaterEnergyHeight = (value) => {
        store.masterdataStore.editState.waterEnergy.height = value;
    };

    const onChangeWaterEnergyVolumeFlow = (value) => {
        store.masterdataStore.editState.waterEnergy.volumeFlow = value;
    };

    const onChangeWindEnergyId = (e) => {
        store.masterdataStore.editState.windEnergy.windEnergyId = e.target.value;
    };

    const onChangeWindEnergyEfficiency = (value) => {
        store.masterdataStore.editState.windEnergy.efficiency = value;
    };

    const onChangeWindEnergyCapacity = (value) => {
        store.masterdataStore.editState.windEnergy.capacity = value;
    };

    const onChangeWindEnergyRunning = (e) => {
        store.masterdataStore.editState.windEnergy.running = e.target.checked;
    };

    const onChangeWindEnergyLatitude = (value) => {
        store.masterdataStore.editState.windEnergy.latitude = value;
    };

    const onChangeWindEnergyLongitude = (value) => {
        store.masterdataStore.editState.windEnergy.longitude = value;
    };

    const onChangeWindEnergyHeight = (value) => {
        store.masterdataStore.editState.windEnergy.height = value;
    };

    const onChangeWindEnergyRadius = (value) => {
        store.masterdataStore.editState.windEnergy.radius = value;
    };

    const onChangeSolarEnergyId = (e) => {
        store.masterdataStore.editState.solarEnergy.solarEnergyId = e.target.value;
    };

    const onChangeSolarEnergyRatedCapacity = (value) => {
        store.masterdataStore.editState.solarEnergy.ratedCapacity = value;
    };

    const onChangeSolarEnergyCapacity = (value) => {
        store.masterdataStore.editState.solarEnergy.capacity = value;
    };


    const onChangeSolarEnergyLatitude = (value) => {
        store.masterdataStore.editState.solarEnergy.latitude = value;
    };

    const onChangeSolarEnergyLongitude = (value) => {
        store.masterdataStore.editState.solarEnergy.longitude = value;
    };

    const onChangeSolarEnergyAlignment = (value) => {
        store.masterdataStore.editState.solarEnergy.alignment = value;
    };

    const onChangeSolarEnergySlope = (value) => {
        store.masterdataStore.editState.solarEnergy.slope = value;
    };

    const onChangeOtherEnergyId = (e) => {
        store.masterdataStore.editState.otherEnergy.otherEnergyId = e.target.value;
    };

    const onChangeOtherEnergyRatedCapacity = (value) => {
        store.masterdataStore.editState.otherEnergy.ratedCapacity = value;
    };

    const onChangeOtherEnergyCapacity = (value) => {
        store.masterdataStore.editState.otherEnergy.capacity = value;
    };


    const onChangeStorageName = (e) => {
        store.masterdataStore.editState.storage.storageId = e.target.value;
    };

    const onChangeStoragePower = (value) => {
        store.masterdataStore.editState.storage.ratedPower = value;
    };

    const onChangeStorageLoadTimeHour = (value) => {
        store.masterdataStore.editState.storage.loadTimeHour = value;
    };

    const onChangeStorageCapacity = (value) => {
        store.masterdataStore.editState.storage.capacity = value;
    };

    const cancelAddOrEditWater = () => {
        store.masterdataStore.editState.isAddingWater = false;
        store.masterdataStore.editState.isEditingWater = false;
        store.masterdataStore.resetEditStates();
    };

    const cancelAddOrEditWind = () => {
        store.masterdataStore.editState.isAddingWind = false;
        store.masterdataStore.editState.isEditingWind = false;
        store.masterdataStore.resetEditStates();
    };

    const cancelAddOrEditSolar = () => {
        store.masterdataStore.editState.isAddingSolar = false;
        store.masterdataStore.editState.isEditingSolar = false;
        store.masterdataStore.resetEditStates();
    };


    const cancelAddOrEditOther = () => {
        store.masterdataStore.editState.isAddingOther = false;
        store.masterdataStore.editState.isEditingOther = false;
        store.masterdataStore.resetEditStates();
    };

    const cancelAddOrEditStorage = () => {
        store.masterdataStore.editState.isAddingStorage = false;
        store.masterdataStore.editState.isEditingStorage = false;
        store.masterdataStore.resetEditStates();
    };

    const acceptAddOrEditWater = () => {
        //todo validation
        if (store.masterdataStore.editState.waterEnergy.waterEnergyId !== '' &&
            store.masterdataStore.editState.waterEnergy.waterEnergyId.length > 0) {
            let dto = store.masterdataStore.editState.waterEnergy;

            if (store.masterdataStore.editState.isAddingWater) {
                if (store.masterdataStore.editState.isAddingToDpp) {
                    store.masterdataStore.saveWaterToDpp(dto, store.masterdataStore.editState.dppId).then((result) => {
                        if (result.success) {
                            fetchDpps();
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.editState.isAddingWater = false;
                            store.masterdataStore.resetEditStates();
                            enqueueSnackbar(result.message, {variant: result.variant})
                        } else {
                            enqueueSnackbar(result.message, {variant: result.variant})
                        }
                    });
                } else if (store.masterdataStore.editState.isAddingToHousehold) {
                    store.masterdataStore.saveWaterToHousehold(dto, store.masterdataStore.editState.householdId).then((result) => {
                        if (result.success) {
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.editState.isAddingWater = false;
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
            } else if (store.masterdataStore.editState.isEditingWater) {
                store.masterdataStore.updateWater(store.masterdataStore.editState.waterEnergyId,
                    store.masterdataStore.editState.vppId, dto).then((result) => {
                    if (result.success) {
                        fetchHouseholds();
                        fetchDpps();
                        store.masterdataStore.editState.isEditingWater = false;
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

    const acceptAddOrEditWind = () => {
        //todo validation
        if (store.masterdataStore.editState.windEnergy.windEnergyId !== '' &&
            store.masterdataStore.editState.windEnergy.windEnergyId.length > 0) {
            let dto = store.masterdataStore.editState.windEnergy;

            if (store.masterdataStore.editState.isAddingWind) {
                if (store.masterdataStore.editState.isAddingToDpp) {
                    store.masterdataStore.saveWindToDpp(dto, store.masterdataStore.editState.dppId).then((result) => {
                        if (result.success) {
                            fetchDpps();
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.editState.isAddingWind = false;
                            store.masterdataStore.resetEditStates();
                            enqueueSnackbar(result.message, {variant: result.variant})
                        } else {
                            enqueueSnackbar(result.message, {variant: result.variant})
                        }
                    });
                } else if (store.masterdataStore.editState.isAddingToHousehold) {
                    store.masterdataStore.saveWindToHousehold(dto, store.masterdataStore.editState.householdId).then((result) => {
                        if (result.success) {
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.editState.isAddingWind = false;
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
            } else if (store.masterdataStore.editState.isEditingWind) {
                store.masterdataStore.updateWind(store.masterdataStore.editState.windEnergyId,
                    store.masterdataStore.editState.vppId, dto).then((result) => {
                    if (result.success) {
                        fetchHouseholds();
                        fetchDpps();
                        store.masterdataStore.editState.isEditingWind = false;
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

    const acceptAddOrEditSolar = () => {
        //todo validation
        if (store.masterdataStore.editState.solarEnergy.solarEnergyId !== '' &&
            store.masterdataStore.editState.solarEnergy.solarEnergyId.length > 0) {
            let dto = store.masterdataStore.editState.solarEnergy;

            if (store.masterdataStore.editState.isAddingSolar) {
                if (store.masterdataStore.editState.isAddingToDpp) {
                    store.masterdataStore.saveSolarToDpp(dto, store.masterdataStore.editState.dppId).then((result) => {
                        if (result.success) {
                            fetchDpps();
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.editState.isAddingSolar = false;
                            store.masterdataStore.resetEditStates();
                            enqueueSnackbar(result.message, {variant: result.variant})
                        } else {
                            enqueueSnackbar(result.message, {variant: result.variant})
                        }
                    });
                } else if (store.masterdataStore.editState.isAddingToHousehold) {
                    store.masterdataStore.saveSolarToHousehold(dto, store.masterdataStore.editState.householdId).then((result) => {
                        if (result.success) {
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.editState.isAddingSolar = false;
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
            } else if (store.masterdataStore.editState.isEditingSolar) {
                store.masterdataStore.updateSolar(store.masterdataStore.editState.solarEnergyId,
                    store.masterdataStore.editState.vppId, dto).then((result) => {
                    if (result.success) {
                        fetchHouseholds();
                        fetchDpps();
                        store.masterdataStore.editState.isEditingSolar = false;
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

    const acceptAddOrEditOther = () => {
        //todo validation
        if (store.masterdataStore.editState.otherEnergy.otherEnergyId !== '' &&
            store.masterdataStore.editState.otherEnergy.otherEnergyId.length > 0) {
            let dto = store.masterdataStore.editState.otherEnergy;

            if (store.masterdataStore.editState.isAddingOther) {
                if (store.masterdataStore.editState.isAddingToDpp) {
                    store.masterdataStore.saveOtherToDpp(dto, store.masterdataStore.editState.dppId).then((result) => {
                        if (result.success) {
                            fetchDpps();
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.editState.isAddingOther = false;
                            store.masterdataStore.resetEditStates();
                            enqueueSnackbar(result.message, {variant: result.variant})
                        } else {
                            enqueueSnackbar(result.message, {variant: result.variant})
                        }
                    });
                } else if (store.masterdataStore.editState.isAddingToHousehold) {
                    store.masterdataStore.saveOtherToHousehold(dto, store.masterdataStore.editState.householdId).then((result) => {
                        if (result.success) {
                            store.masterdataStore.editState.isAddingProducer = false;
                            store.masterdataStore.editState.isAddingOther = false;
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
            } else if (store.masterdataStore.editState.isEditingOther) {
                store.masterdataStore.updateOther(store.masterdataStore.editState.otherEnergyId,
                    store.masterdataStore.editState.vppId, dto).then((result) => {
                    if (result.success) {
                        fetchHouseholds();
                        fetchDpps();
                        store.masterdataStore.editState.isEditingOther = false;
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
                store.masterdataStore.resetEditStates();
            }
        )
    };

    const fetchDpps = () => {
        store.masterdataStore.getDppsByVpp(store.masterdataStore.editState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
                store.masterdataStore.resetEditStates();
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
                    fetchDpps();
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
                    fetchHouseholds();
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onOpenEditProducer = (producerId, type) => {
        if (type === "WATER") {
            store.masterdataStore.getWaterById(producerId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    } else {
                        store.masterdataStore.editState.waterEnergyId = producerId;
                        store.masterdataStore.editState.isEditingWater = true;
                    }
                }
            )
        } else if (type === "WIND") {
            store.masterdataStore.getWindById(producerId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    } else {
                        store.masterdataStore.editState.windEnergyId = producerId;
                        store.masterdataStore.editState.isEditingWind = true;
                    }
                }
            )
        } else if (type === "SOLAR") {
            store.masterdataStore.getSolarById(producerId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    } else {
                        store.masterdataStore.editState.solarEnergyId = producerId;
                        store.masterdataStore.editState.isEditingSolar = true;
                    }
                }
            )
        } else if (type === "OTHER") {
            store.masterdataStore.getOtherById(producerId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    } else {
                        store.masterdataStore.editState.otherEnergyId = producerId;
                        store.masterdataStore.editState.isEditingOther = true;
                    }
                }
            )
        } else {
            console.log("unknown type");
        }
    };

    const onDeleteProducer = (producerId, type) => {
        if (type === "WATER") {
            store.masterdataStore.deleteWater(producerId, store.masterdataStore.editState.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        fetchHouseholds();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (type === "WIND") {
            store.masterdataStore.deleteWind(producerId, store.masterdataStore.editState.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        fetchHouseholds();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (type === "SOLAR") {
            store.masterdataStore.deleteSolar(producerId, store.masterdataStore.editState.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        fetchHouseholds();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (type === "OTHER") {
            store.masterdataStore.deleteOther(producerId, store.masterdataStore.editState.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        fetchHouseholds();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else {
            console.log("unknown type");
        }

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
                    fetchDpps();
                    fetchHouseholds();
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

    const onChangeVirtualPowerPlantShortageThreshold = (value) => {
        store.masterdataStore.editState.vpp.shortageThreshold = value;
    };

    const onChangeVirtualPowerPlantOverflowThreshold = (value) => {
        store.masterdataStore.editState.vpp.overflowThreshold = value;
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
                    store.masterdataStore.resetEditStates().then(() => store.masterdataStore.getAllVppsAction());
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onUnpublish = () => {
        store.masterdataStore.unpublishVpp(store.masterdataStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    store.masterdataStore.resetEditStates().then(() => store.masterdataStore.getAllVppsAction());
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onOpenWaterModal = () => {
        store.masterdataStore.resetEditStates().then(() => {
            store.masterdataStore.editState.isAddingProducer = false;
            store.masterdataStore.editState.isAddingWind = false;
            store.masterdataStore.editState.isAddingSolar = false;
            store.masterdataStore.editState.isAddingWater = true;
            store.masterdataStore.editState.isAddingOther = false;
        });
    };

    const onOpenWindModal = () => {
        store.masterdataStore.resetEditStates().then(() => {
            store.masterdataStore.editState.isAddingProducer = false;
            store.masterdataStore.editState.isAddingSolar = false;
            store.masterdataStore.editState.isAddingWater = false;
            store.masterdataStore.editState.isAddingWind = true;
            store.masterdataStore.editState.isAddingOther = false;
        });
    };

    const onOpenSolarModal = () => {
        store.masterdataStore.resetEditStates().then(() => {
            store.masterdataStore.editState.isAddingProducer = false;
            store.masterdataStore.editState.isAddingWater = false;
            store.masterdataStore.editState.isAddingWind = false;
            store.masterdataStore.editState.isAddingSolar = true;
            store.masterdataStore.editState.isAddingOther = false;
        });
    };

    const onOpenOtherModal = () => {
        store.masterdataStore.resetEditStates().then(() => {
            store.masterdataStore.editState.isAddingProducer = false;
            store.masterdataStore.editState.isAddingWater = false;
            store.masterdataStore.editState.isAddingWind = false;
            store.masterdataStore.editState.isAddingSolar = false;
            store.masterdataStore.editState.isAddingOther = true;
        });
    };

    const cancelAddProducer = () => {
        store.masterdataStore.editState.isAddingProducer = false;
        store.masterdataStore.resetEditStates();
    };

    const combineDppProducers = (dpp) => {
        let producers = [];
        store.masterdataStore.dpps.find(obj => {
            return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
        }).waters.forEach((water) => {
            water.producerId = water.waterEnergyId;
            water.type = "WATER";
            producers.push(water);
        });
        store.masterdataStore.dpps.find(obj => {
            return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
        }).winds.forEach((wind) => {
            wind.producerId = wind.windEnergyId;
            wind.type = "WIND";
            producers.push(wind);
        });
        store.masterdataStore.dpps.find(obj => {
            return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
        }).solars.forEach((solar) => {
            solar.producerId = solar.solarEnergyId;
            solar.type = "SOLAR";
            producers.push(solar);
        });
        store.masterdataStore.dpps.find(obj => {
            return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
        }).others.forEach((other) => {
            other.producerId = other.otherEnergyId;
            other.type = "OTHER";
            producers.push(other);
        });
        return producers;
    };

    const combineHouseholdProducers = (household) => {
        let producers = [];
        store.masterdataStore.households.find(obj => {
            return obj.householdId === household.householdId
        }).waters.forEach((water) => {
            water.producerId = water.waterEnergyId;
            water.type = "WATER";
            producers.push(water);
        });
        store.masterdataStore.households.find(obj => {
            return obj.householdId === household.householdId
        }).winds.forEach((wind) => {
            wind.producerId = wind.windEnergyId;
            wind.type = "WIND";
            producers.push(wind);
        });
        store.masterdataStore.households.find(obj => {
            return obj.householdId === household.householdId
        }).solars.forEach((solar) => {
            solar.producerId = solar.solarEnergyId;
            solar.type = "SOLAR";
            producers.push(solar);
        });
        store.masterdataStore.households.find(obj => {
            return obj.householdId === household.householdId
        }).others.forEach((other) => {
            other.producerId = other.otherEnergyId;
            other.type = "OTHER";
            producers.push(other);
        });
        return producers;
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
                                               {combineDppProducers(dpp)}
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
                        {store.masterdataStore.households.map((household) => {
                            return (<Collapse collapsible="header">
                                <Panel header={household.householdId} key={household.householdId}>
                                    <HouseholdActions householdId={household.householdId}/>
                                    <Table
                                        dataSource=
                                            {combineHouseholdProducers(household)}

                                        columns={producerColumns}/>
                                    <Button onClick={() => onOpenAddProducerWithHousehold(household.householdId)}
                                            type="primary"
                                            icon={<PlusOutlined/>}>
                                        Erzeugungsanlage hinzufügen
                                    </Button>
                                    <Table
                                        dataSource=
                                            {
                                                store.masterdataStore.households.find(obj => {
                                                    return obj.householdId === household.householdId
                                                }).storages
                                            }

                                        columns={storageColumns}/>
                                    <Button onClick={(e) => onOpenAddStorageWithHousehold(household.householdId)}
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
                            <Slider value={store.masterdataStore.editState.vpp.shortageThreshold}
                                    onChange={onChangeVirtualPowerPlantShortageThreshold}/>
                            <Slider value={store.masterdataStore.editState.vpp.overflowThreshold}
                                    onChange={onChangeVirtualPowerPlantOverflowThreshold}/>
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


                        <Modal title="Erzeugungsanlage hinzufügen"
                               visible={store.masterdataStore.editState.isAddingProducer}
                               onCancel={cancelAddProducer}
                               footer={[
                                   <Button key="back" onClick={cancelAddProducer}>
                                       Abbrechen
                                   </Button>,
                                   <Button key="submit" type="primary" onClick={onOpenWaterModal}>
                                       Wasser
                                   </Button>,
                                   <Button type="primary" onClick={onOpenWindModal}>
                                       Wind
                                   </Button>,
                                   <Button type="primary" onClick={onOpenSolarModal}>
                                       Solar
                                   </Button>,
                                   <Button type="primary" onClick={onOpenOtherModal}>
                                       Sonstige
                                   </Button>,
                               ]}
                        >
                            <p>Bitte wähle die Art der Anlage aus, die du hinzufügen möchtest.</p>
                        </Modal>


                        <Modal title="Wasserkraftwerk"
                               visible={store.masterdataStore.editState.isAddingWater || store.masterdataStore.editState.isEditingWater}
                               onOk={acceptAddOrEditWater}
                               onCancel={cancelAddOrEditWater}>
                            <p>Bitte pflege die Daten für das Wasserkraftwerk ein</p>
                            <Input value={store.masterdataStore.editState.waterEnergy.waterEnergyId}
                                   onChange={onChangeWaterEnergyId}
                                   placeholder="Name der Erzeugungsanlage"/>
                            <InputNumber value={store.masterdataStore.editState.waterEnergy.efficiency}
                                         onChange={onChangeWaterEnergyEfficiency}
                                         placeholder="Wirkungsgrad"/>
                            <InputNumber value={store.masterdataStore.editState.waterEnergy.density}
                                         onChange={onChangeWaterEnergyDensity}
                                         placeholder="Wasserdichte"/>
                            <InputNumber value={store.masterdataStore.editState.waterEnergy.gravity}
                                         onChange={onChangeWaterEnergyGravity}
                                         placeholder="Fallgeschwindigkeit"/>
                            <InputNumber value={store.masterdataStore.editState.waterEnergy.height}
                                         onChange={onChangeWaterEnergyHeight}
                                         placeholder="effektive Fallhöhe"/>
                            <InputNumber value={store.masterdataStore.editState.waterEnergy.volumeFlow}
                                         onChange={onChangeWaterEnergyVolumeFlow}
                                         placeholder="Volumenstrom"/>
                            Kapazität
                            <Slider value={store.masterdataStore.editState.waterEnergy.capacity}
                                    onChange={onChangeWaterEnergyCapacity}/>
                        </Modal>


                        <Modal title="Windkraftanlage"
                               visible={store.masterdataStore.editState.isAddingWind || store.masterdataStore.editState.isEditingWind}
                               onOk={acceptAddOrEditWind}
                               onCancel={cancelAddOrEditWind}>
                            <p>Bitte pflege die Daten für die Windkraftanlage ein</p>
                            <Input value={store.masterdataStore.editState.windEnergy.windEnergyId}
                                   onChange={onChangeWindEnergyId}
                                   placeholder="Name der Erzeugungsanlage"/>
                            <InputNumber value={store.masterdataStore.editState.windEnergy.efficiency}
                                         onChange={onChangeWindEnergyEfficiency}
                                         placeholder="Wirkungsgrad"/>
                            <InputNumber value={store.masterdataStore.editState.windEnergy.latitude}
                                         onChange={onChangeWindEnergyLatitude}
                                         placeholder="Latitude"/>
                            <InputNumber value={store.masterdataStore.editState.windEnergy.longitude}
                                         onChange={onChangeWindEnergyLongitude}
                                         placeholder="Longitude"/>
                            <InputNumber value={store.masterdataStore.editState.windEnergy.radius}
                                         onChange={onChangeWindEnergyRadius}
                                         placeholder="Radius"/>
                            <InputNumber value={store.masterdataStore.editState.windEnergy.height}
                                         onChange={onChangeWindEnergyHeight}
                                         placeholder="Höhe"/>
                            Kapazität
                            <Slider value={store.masterdataStore.editState.windEnergy.capacity}
                                    onChange={onChangeWindEnergyCapacity}/>
                        </Modal>

                        <Modal title="Solaranlage"
                               visible={store.masterdataStore.editState.isAddingSolar || store.masterdataStore.editState.isEditingSolar}
                               onOk={acceptAddOrEditSolar}
                               onCancel={cancelAddOrEditSolar}>
                            <p>Bitte pflege die Daten für die Solaranlage ein</p>
                            <Input value={store.masterdataStore.editState.solarEnergy.solarEnergyId}
                                   onChange={onChangeSolarEnergyId}
                                   placeholder="Name der Erzeugungsanlage"/>
                            <InputNumber value={store.masterdataStore.editState.solarEnergy.ratedCapacity}
                                         onChange={onChangeSolarEnergyRatedCapacity}
                                         placeholder="Nennleistung"/>
                            <InputNumber value={store.masterdataStore.editState.solarEnergy.latitude}
                                         onChange={onChangeSolarEnergyLatitude}
                                         placeholder="Latitude"/>
                            <InputNumber value={store.masterdataStore.editState.solarEnergy.longitude}
                                         onChange={onChangeSolarEnergyLongitude}
                                         placeholder="Longitude"/>
                            <InputNumber value={store.masterdataStore.editState.solarEnergy.alignment}
                                         onChange={onChangeSolarEnergyAlignment}
                                         placeholder="Orientierung"/>
                            <InputNumber value={store.masterdataStore.editState.solarEnergy.slope}
                                         onChange={onChangeSolarEnergySlope}
                                         placeholder="Neigung"/>
                            Kapazität
                            <Slider value={store.masterdataStore.editState.solarEnergy.capacity}
                                    onChange={onChangeSolarEnergyCapacity}/>
                        </Modal>

                        <Modal title="Sonstige Anlage"
                               visible={store.masterdataStore.editState.isAddingOther || store.masterdataStore.editState.isEditingOther}
                               onOk={acceptAddOrEditOther}
                               onCancel={cancelAddOrEditOther}>
                            <p>Bitte pflege die Daten für die sonstige Anlage ein</p>
                            <Input value={store.masterdataStore.editState.otherEnergy.otherEnergyId}
                                   onChange={onChangeOtherEnergyId}
                                   placeholder="Name der Erzeugungsanlage"/>
                            <InputNumber value={store.masterdataStore.editState.otherEnergy.ratedCapacity}
                                         onChange={onChangeOtherEnergyRatedCapacity}
                                         placeholder="Nennleistung"/>
                            Kapazität
                            <Slider value={store.masterdataStore.editState.otherEnergy.capacity}
                                    onChange={onChangeOtherEnergyCapacity}/>
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
                            <InputNumber value={store.masterdataStore.editState.storage.loadTimeHour}
                                         onChange={onChangeStorageLoadTimeHour}
                                         placeholder="C-Rate"/>
                            Aktuelle Speicherkapazität
                            <Slider value={store.masterdataStore.editState.storage.capacity}
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
