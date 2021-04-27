import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Collapse, Input, InputNumber, Modal, Popconfirm, Select, Slider, Steps, Table} from "antd";
import history from "../../../../history";
import {PlusOutlined} from '@ant-design/icons';

const AddProducerAndStorageComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    const {Step} = Steps;
    const {Panel} = Collapse;
    const {Option} = Select;

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
    ];

    const storageColumns = [
        {
            title: 'Speicheranlagen',
            dataIndex: 'storageId',
            key: 'storageId',
        },
    ];

    useEffect(() => {
        if (store.masterdataStore.creatingState.step !== 3) {
            if (store.masterdataStore.creatingState.step === 0) {
                history.push("/erstellen")
            }
            if (store.masterdataStore.creatingState.step === 1) {
                history.push("/erstellen/schritt-1")
            }
            if (store.masterdataStore.creatingState.step === 2) {
                history.push("/erstellen/schritt-2")
            }
        } else {
            fetchHouseholds();
            fetchDpps();
        }
    }, []);

    const acceptAddStorage = () => {
        //todo validation
        if (store.masterdataStore.stepThreeState.storage.storageId !== '' &&
            store.masterdataStore.stepThreeState.storage.storageId.length > 0) {
            let dto = store.masterdataStore.stepThreeState.storage;
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

    const cancelAddProducer = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
    };


    const cancelAddStorage = () => {
        store.masterdataStore.stepThreeState.isAddingStorage = false;
    };

    const onBack = () => {
        store.masterdataStore.creatingState.step = 2;
        history.push('/erstellen/schritt-2');
    };

    const onEnd = () => {
        store.masterdataStore.resetStateOnEnd();
        history.push('/erstellen');
    };

    const onChangeWaterEnergyId = (e) => {
        store.masterdataStore.stepThreeState.waterEnergy.waterEnergyId = e.target.value;
    };

    const onChangeWaterEnergyEfficiency = (value) => {
        store.masterdataStore.stepThreeState.waterEnergy.efficiency = value;
    };

    const onChangeWaterEnergyCapacity = (value) => {
        store.masterdataStore.stepThreeState.waterEnergy.capacity = value;
    };

    const onChangeWaterEnergyRunning = (e) => {
        store.masterdataStore.stepThreeState.waterEnergy.running = e.target.checked;
    };

    const onChangeWaterEnergyDensity = (value) => {
        store.masterdataStore.stepThreeState.waterEnergy.density = value;
    };

    const onChangeWaterEnergyGravity = (value) => {
        store.masterdataStore.stepThreeState.waterEnergy.gravity = value;
    };

    const onChangeWaterEnergyHeight = (value) => {
        store.masterdataStore.stepThreeState.waterEnergy.height = value;
    };

    const onChangeWaterEnergyVolumeFlow = (value) => {
        store.masterdataStore.stepThreeState.waterEnergy.volumeFlow = value;
    };

    const onChangeWindEnergyId = (e) => {
        store.masterdataStore.stepThreeState.windEnergy.windEnergyId = e.target.value;
    };

    const onChangeWindEnergyEfficiency = (value) => {
        store.masterdataStore.stepThreeState.windEnergy.efficiency = value;
    };

    const onChangeWindEnergyCapacity = (value) => {
        store.masterdataStore.stepThreeState.windEnergy.capacity = value;
    };

    const onChangeWindEnergyRunning = (e) => {
        store.masterdataStore.stepThreeState.windEnergy.running = e.target.checked;
    };

    const onChangeWindEnergyLatitude = (value) => {
        store.masterdataStore.stepThreeState.windEnergy.latitude = value;
    };

    const onChangeWindEnergyLongitude = (value) => {
        store.masterdataStore.stepThreeState.windEnergy.longitude = value;
    };

    const onChangeWindEnergyHeight = (value) => {
        store.masterdataStore.stepThreeState.windEnergy.height = value;
    };

    const onChangeWindEnergyRadius = (value) => {
        store.masterdataStore.stepThreeState.windEnergy.radius = value;
    };

    const onChangeSolarEnergyId = (e) => {
        store.masterdataStore.stepThreeState.solarEnergy.solarEnergyId = e.target.value;
    };

    const onChangeSolarEnergyRatedCapacity = (value) => {
        store.masterdataStore.stepThreeState.solarEnergy.ratedCapacity = value;
    };

    const onChangeSolarEnergyCapacity = (value) => {
        store.masterdataStore.stepThreeState.solarEnergy.capacity = value;
    };

    const onChangeSolarEnergyLatitude = (value) => {
        store.masterdataStore.stepThreeState.solarEnergy.latitude = value;
    };

    const onChangeSolarEnergyLongitude = (value) => {
        store.masterdataStore.stepThreeState.solarEnergy.longitude = value;
    };

    const onChangeSolarEnergyAlignment = (value) => {
        store.masterdataStore.stepThreeState.solarEnergy.alignment = value;
    };

    const onChangeSolarEnergySlope = (value) => {
        store.masterdataStore.stepThreeState.solarEnergy.slope = value;
    };

    const onChangeOtherEnergyId = (e) => {
        store.masterdataStore.stepThreeState.otherEnergy.otherEnergyId = e.target.value;
    };

    const onChangeOtherEnergyRatedCapacity = (value) => {
        store.masterdataStore.stepThreeState.otherEnergy.ratedCapacity = value;
    };

    const onChangeOtherEnergyCapacity = (value) => {
        store.masterdataStore.stepThreeState.otherEnergy.capacity = value;
    };

    const onChangeStorageName = (e) => {
        store.masterdataStore.stepThreeState.storage.storageId = e.target.value;
    };

    const onChangeStoragePower = (value) => {
        store.masterdataStore.stepThreeState.storage.ratedPower = value;
    };

    const onChangeStorageLoadTimeHour = (value) => {
        store.masterdataStore.stepThreeState.storage.loadTimeHour = value;
    };


    const onChangeStorageCapacity = (value) => {
        store.masterdataStore.stepThreeState.storage.capacity = value;
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

    const fetchDpps = () => {
        store.masterdataStore.getDppsByVpp(store.masterdataStore.creatingState.vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                }
            }
        )
    };

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


    const onOpenWaterModal = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
        store.masterdataStore.stepThreeState.isAddingWind = false;
        store.masterdataStore.stepThreeState.isAddingSolar = false;
        store.masterdataStore.stepThreeState.isAddingWater = true;

    };

    const onOpenWindModal = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
        store.masterdataStore.stepThreeState.isAddingSolar = false;
        store.masterdataStore.stepThreeState.isAddingWater = false;
        store.masterdataStore.stepThreeState.isAddingWind = true;

    };

    const onOpenSolarModal = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
        store.masterdataStore.stepThreeState.isAddingWater = false;
        store.masterdataStore.stepThreeState.isAddingWind = false;
        store.masterdataStore.stepThreeState.isAddingSolar = true;

    };

    const onOpenOtherModal = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
        store.masterdataStore.stepThreeState.isAddingWater = false;
        store.masterdataStore.stepThreeState.isAddingWind = false;
        store.masterdataStore.stepThreeState.isAddingSolar = false;
        store.masterdataStore.stepThreeState.isAddingOther = true;

    };

    const acceptAddWater = () => {
        //todo validation
        if (store.masterdataStore.stepThreeState.waterEnergy.waterEnergyId !== '' &&
            store.masterdataStore.stepThreeState.waterEnergy.waterEnergyId.length > 0) {
            if (store.masterdataStore.stepThreeState.isAddingToDpp) {
                store.masterdataStore.saveWaterToDpp(store.masterdataStore.stepThreeState.waterEnergy, store.masterdataStore.stepThreeState.dppId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.stepThreeState.isAddingWater = false;
                        store.masterdataStore.resetStepThreeModals();
                        fetchHouseholds();
                        fetchDpps();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (store.masterdataStore.stepThreeState.isAddingToHousehold) {
                store.masterdataStore.saveWaterToHousehold(store.masterdataStore.stepThreeState.waterEnergy, store.masterdataStore.stepThreeState.householdId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.stepThreeState.isAddingWater = false;
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

    const cancelAddWater = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
        store.masterdataStore.stepThreeState.isAddingWater = false;
        store.masterdataStore.stepThreeState.isAddingWind = false;
        store.masterdataStore.stepThreeState.isAddingSolar = false;
    };


    const acceptAddWind = () => {
        //todo validation
        if (store.masterdataStore.stepThreeState.windEnergy.windEnergyId !== '' &&
            store.masterdataStore.stepThreeState.windEnergy.windEnergyId.length > 0) {
            if (store.masterdataStore.stepThreeState.isAddingToDpp) {
                store.masterdataStore.saveWindToDpp(store.masterdataStore.stepThreeState.windEnergy, store.masterdataStore.stepThreeState.dppId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.stepThreeState.isAddingWind = false;
                        store.masterdataStore.resetStepThreeModals();
                        fetchHouseholds();
                        fetchDpps();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (store.masterdataStore.stepThreeState.isAddingToHousehold) {
                store.masterdataStore.saveWindToHousehold(store.masterdataStore.stepThreeState.windEnergy, store.masterdataStore.stepThreeState.householdId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.stepThreeState.isAddingWind = false;
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

    const cancelAddWind = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
        store.masterdataStore.stepThreeState.isAddingWater = false;
        store.masterdataStore.stepThreeState.isAddingWind = false;
        store.masterdataStore.stepThreeState.isAddingSolar = false;
    };

    const acceptAddSolar = () => {
        //todo validation
        if (store.masterdataStore.stepThreeState.solarEnergy.solarEnergyId !== '' &&
            store.masterdataStore.stepThreeState.solarEnergy.solarEnergyId.length > 0) {
            if (store.masterdataStore.stepThreeState.isAddingToDpp) {
                store.masterdataStore.saveSolarToDpp(store.masterdataStore.stepThreeState.solarEnergy, store.masterdataStore.stepThreeState.dppId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.stepThreeState.isAddingSolar = false;
                        store.masterdataStore.resetStepThreeModals();
                        fetchHouseholds();
                        fetchDpps();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (store.masterdataStore.stepThreeState.isAddingToHousehold) {
                store.masterdataStore.saveSolarToHousehold(store.masterdataStore.stepThreeState.solarEnergy, store.masterdataStore.stepThreeState.householdId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.stepThreeState.isAddingSolar = false;
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

    const acceptAddOther = () => {
        //todo validation
        if (store.masterdataStore.stepThreeState.otherEnergy.otherEnergyId !== '' &&
            store.masterdataStore.stepThreeState.otherEnergy.otherEnergyId.length > 0) {
            if (store.masterdataStore.stepThreeState.isAddingToDpp) {
                store.masterdataStore.saveOtherToDpp(store.masterdataStore.stepThreeState.otherEnergy, store.masterdataStore.stepThreeState.dppId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.stepThreeState.isAddingOther = false;
                        store.masterdataStore.resetStepThreeModals();
                        fetchHouseholds();
                        fetchDpps();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (store.masterdataStore.stepThreeState.isAddingToHousehold) {
                store.masterdataStore.saveOtherToHousehold(store.masterdataStore.stepThreeState.otherEnergy, store.masterdataStore.stepThreeState.householdId).then((result) => {
                    if (result.success) {
                        store.masterdataStore.stepThreeState.isAddingProducer = false;
                        store.masterdataStore.stepThreeState.isAddingOther = false;
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

    const cancelAddSolar = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
        store.masterdataStore.stepThreeState.isAddingWater = false;
        store.masterdataStore.stepThreeState.isAddingWind = false;
        store.masterdataStore.stepThreeState.isAddingSolar = false;
    };

    const cancelAddOther = () => {
        store.masterdataStore.stepThreeState.isAddingProducer = false;
        store.masterdataStore.stepThreeState.isAddingWater = false;
        store.masterdataStore.stepThreeState.isAddingWind = false;
        store.masterdataStore.stepThreeState.isAddingSolar = false;
        store.masterdataStore.stepThreeState.isAddingOther = false;
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


    return (
        <div className={'create-vpp'}>
            <Steps size="small" current={3}>
                <Step title="Prozess starten"/>
                <Step title="Dez. Kraftwerke"/>
                <Step title="Haushalte"/>
                <Step title="Erzeugungs- und Speicheranlagen"/>
            </Steps>
            <h2>Schritt 3: Hinzufügen der Erzeugungs- und Speicheranlagen</h2>
            <p>In diesem Schritt werden den zuvor angelegten Haushalten und Dez. Kraftwerke die Erzeugungs- und
                Speicheranlagen hinzugefügt</p>

            <h3>Dezentrale Kraftwerke</h3>
            {store.masterdataStore.dpps.map((dpp) => {
                return (<Collapse collapsible="header">
                    <Panel header={dpp.decentralizedPowerPlantId} key={dpp.decentralizedPowerPlantId}>
                        <Table dataSource=
                                   {
                                       combineDppProducers(dpp)
                                   }
                               columns={producerColumns}/>
                        <Button onClick={() => onOpenAddProducerWithDpp(dpp.decentralizedPowerPlantId)} type="primary"
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
                        <Button onClick={() => onOpenAddStorageWithDpp(dpp.decentralizedPowerPlantId)} type="primary"
                                icon={<PlusOutlined/>}>
                            Speicheranlage hinzufügen
                        </Button>
                    </Panel>
                </Collapse>)
            })}

            <h3>Haushalte</h3>
            {store.masterdataStore.households.map((household) => {
                return (<Collapse collapsible="header">
                    <Panel header={household.householdId} key={household.householdId}>
                        <Table
                            dataSource=
                                {combineHouseholdProducers(household)}

                            columns={producerColumns}/>
                        <Button onClick={() => onOpenAddProducerWithHousehold(household.householdId)} type="primary"
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
                        <Button onClick={(e) => onOpenAddStorageWithHousehold(household.householdId)} type="primary"
                                icon={<PlusOutlined/>}>
                            Speicheranlage hinzufügen
                        </Button>
                    </Panel>
                </Collapse>)
            })}

            <Button onClick={onBack} type="primary">
                Zurück zu Schritt 3
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
                    Prozess abschließen
                </Button>
            </Popconfirm>

            <Modal title="Erzeugungsanlage hinzufügen" visible={store.masterdataStore.stepThreeState.isAddingProducer}
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

            <Modal title="Wasserkraftwerk hinzufügen" visible={store.masterdataStore.stepThreeState.isAddingWater}
                   onOk={acceptAddWater}
                   onCancel={cancelAddWater}>
                <p>Bitte pflege die Daten für das Wasserkraftwerk ein</p>
                <Input value={store.masterdataStore.stepThreeState.waterEnergy.waterEnergyId}
                       onChange={onChangeWaterEnergyId}
                       placeholder="Name der Erzeugungsanlage"/>
                <InputNumber value={store.masterdataStore.stepThreeState.waterEnergy.efficiency}
                             onChange={onChangeWaterEnergyEfficiency}
                             placeholder="Wirkungsgrad"/>
                <InputNumber value={store.masterdataStore.stepThreeState.waterEnergy.density}
                             onChange={onChangeWaterEnergyDensity}
                             placeholder="Wasserdichte"/>
                <InputNumber value={store.masterdataStore.stepThreeState.waterEnergy.gravity}
                             onChange={onChangeWaterEnergyGravity}
                             placeholder="Fallgeschwindigkeit"/>
                <InputNumber value={store.masterdataStore.stepThreeState.waterEnergy.height}
                             onChange={onChangeWaterEnergyHeight}
                             placeholder="effektive Fallhöhe"/>
                <InputNumber value={store.masterdataStore.stepThreeState.waterEnergy.volumeFlow}
                             onChange={onChangeWaterEnergyVolumeFlow}
                             placeholder="Volumenstrom"/>
                Kapazität
                <Slider value={store.masterdataStore.stepThreeState.waterEnergy.capacity}
                        onChange={onChangeWaterEnergyCapacity}/>
            </Modal>


            <Modal title="Windkraftanlage hinzufügen" visible={store.masterdataStore.stepThreeState.isAddingWind}
                   onOk={acceptAddWind}
                   onCancel={cancelAddWind}>
                <p>Bitte pflege die Daten für die Windkraftanlage ein</p>
                <Input value={store.masterdataStore.stepThreeState.windEnergy.windEnergyId}
                       onChange={onChangeWindEnergyId}
                       placeholder="Name der Erzeugungsanlage"/>
                <InputNumber value={store.masterdataStore.stepThreeState.windEnergy.efficiency}
                             onChange={onChangeWindEnergyEfficiency}
                             placeholder="Wirkungsgrad"/>
                <InputNumber value={store.masterdataStore.stepThreeState.windEnergy.latitude}
                             onChange={onChangeWindEnergyLatitude}
                             placeholder="Latitude"/>
                <InputNumber value={store.masterdataStore.stepThreeState.windEnergy.longitude}
                             onChange={onChangeWindEnergyLongitude}
                             placeholder="Longitude"/>
                <InputNumber value={store.masterdataStore.stepThreeState.windEnergy.radius}
                             onChange={onChangeWindEnergyRadius}
                             placeholder="Radius"/>
                <InputNumber value={store.masterdataStore.stepThreeState.windEnergy.height}
                             onChange={onChangeWindEnergyHeight}
                             placeholder="Höhe"/>
                Kapazität
                <Slider value={store.masterdataStore.stepThreeState.windEnergy.capacity}
                        onChange={onChangeWindEnergyCapacity}/>
            </Modal>

            <Modal title="Solaranlage hinzufügen" visible={store.masterdataStore.stepThreeState.isAddingSolar}
                   onOk={acceptAddSolar}
                   onCancel={cancelAddSolar}>
                <p>Bitte pflege die Daten für die Solaranlage ein</p>
                <Input value={store.masterdataStore.stepThreeState.solarEnergy.solarEnergyId}
                       onChange={onChangeSolarEnergyId}
                       placeholder="Name der Erzeugungsanlage"/>
                <InputNumber value={store.masterdataStore.stepThreeState.solarEnergy.ratedCapacity}
                             onChange={onChangeSolarEnergyRatedCapacity}
                             placeholder="Nennleistung"/>
                <InputNumber value={store.masterdataStore.stepThreeState.solarEnergy.latitude}
                             onChange={onChangeSolarEnergyLatitude}
                             placeholder="Latitude"/>
                <InputNumber value={store.masterdataStore.stepThreeState.solarEnergy.longitude}
                             onChange={onChangeSolarEnergyLongitude}
                             placeholder="Longitude"/>
                <InputNumber value={store.masterdataStore.stepThreeState.solarEnergy.alignment}
                             onChange={onChangeSolarEnergyAlignment}
                             placeholder="Orientierung"/>
                <InputNumber value={store.masterdataStore.stepThreeState.solarEnergy.slope}
                             onChange={onChangeSolarEnergySlope}
                             placeholder="Neigung"/>
                Kapazität
                <Slider value={store.masterdataStore.stepThreeState.solarEnergy.capacity}
                        onChange={onChangeSolarEnergyCapacity}/>
            </Modal>

            <Modal title="Sonstige Anlage hinzufügen" visible={store.masterdataStore.stepThreeState.isAddingOther}
                   onOk={acceptAddOther}
                   onCancel={cancelAddOther}>
                <p>Bitte pflege die Daten für die sonstige Anlage ein</p>
                <Input value={store.masterdataStore.stepThreeState.otherEnergy.otherEnergyId}
                       onChange={onChangeOtherEnergyId}
                       placeholder="Name der Erzeugungsanlage"/>
                <InputNumber value={store.masterdataStore.stepThreeState.otherEnergy.ratedCapacity}
                             onChange={onChangeOtherEnergyRatedCapacity}
                             placeholder="Nennleistung"/>
                <Slider value={store.masterdataStore.stepThreeState.otherEnergy.capacity}
                        onChange={onChangeOtherEnergyCapacity}/>
            </Modal>



            <Modal title="Speicherungsanlage hinzufügen" visible={store.masterdataStore.stepThreeState.isAddingStorage}
                   onOk={acceptAddStorage}
                   onCancel={cancelAddStorage}>
                <p>Bitte pflege die Daten für die Speicheranlage ein.</p>
                <Input value={store.masterdataStore.stepThreeState.storage.storageId} onChange={onChangeStorageName}
                       placeholder="Name der Speicheranlage"/>
                <InputNumber value={store.masterdataStore.stepThreeState.storage.ratedPower}
                             onChange={onChangeStoragePower}
                             placeholder="Leistung"/>
                <InputNumber value={store.masterdataStore.stepThreeState.storage.loadTimeHour}
                             onChange={onChangeStorageLoadTimeHour}
                             placeholder="C-Rate"/>
                Aktuelle Speicherkapazität
                <Slider value={store.masterdataStore.stepThreeState.storage.capacity}
                        onChange={onChangeStorageCapacity}/>
            </Modal>
        </div>

    );


});

export default AddProducerAndStorageComponent;
