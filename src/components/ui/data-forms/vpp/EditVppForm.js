import {observer} from "mobx-react";
import {Button, Collapse} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {EditDeleteButtonGroup} from "../../button-groups/EditDeleteButtonGroup";
import {ProducerTable} from "../../tables/ProducerTable";
import {StorageTable} from "../../tables/StorageTable";
import React, {useContext, useEffect} from "react";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {DppForm} from "./DppForm";
import {HouseholdForm} from "./HouseholdForm";
import {CreateProducerMenuModal} from "../../modals/vpp/CreateProducerMenuModal";
import {WaterEnergyForm} from "./WaterEnergyForm";
import {WindEnergyForm} from "./WindEnergyForm";
import {SolarEnergyForm} from "./SolarEnergyForm";
import {OtherEnergyForm} from "./OtherEnergyForm";
import {StorageForm} from "./StorageForm";

/**
 * Diese Komponente beinhaltet die Editierung eines VK mit den dazugehörigen Eingabemasken
 * @type {function(*): *}
 */
export const EditVppForm = observer((props) => {
    const store = useContext(RootStoreContext);
    const {enqueueSnackbar} = useSnackbar();
    const {state} = props;
    const {Panel} = Collapse;

    useEffect(() => {
        fetchHouseholds();
        fetchDpps();
    }, []);

    const onOpenWater = () => {
        state.isAddingWater = true;
    };

    const onOpenWind = () => {
        state.isAddingWind = true;
    };

    const onOpenSolar = () => {
        state.isAddingSolar = true;
    };

    const onOpenOther = () => {
        state.isAddingOther = true;
    };

    const onCancelCreateProducer = () => {
        state.isAddingProducer = false;
    };

    const combineDppProducers = (dpp) => {
        let producers = [];
        store.vppStore.dpps.find(obj => {
            return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
        }).waters.forEach((water) => {
            water.producerId = water.waterEnergyId;
            water.type = "WATER";
            producers.push(water);
        });
        store.vppStore.dpps.find(obj => {
            return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
        }).winds.forEach((wind) => {
            wind.producerId = wind.windEnergyId;
            wind.type = "WIND";
            producers.push(wind);
        });
        store.vppStore.dpps.find(obj => {
            return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
        }).solars.forEach((solar) => {
            solar.producerId = solar.solarEnergyId;
            solar.type = "SOLAR";
            producers.push(solar);
        });
        store.vppStore.dpps.find(obj => {
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
        store.vppStore.households.find(obj => {
            return obj.householdId === household.householdId
        }).waters.forEach((water) => {
            water.producerId = water.waterEnergyId;
            water.type = "WATER";
            producers.push(water);
        });
        store.vppStore.households.find(obj => {
            return obj.householdId === household.householdId
        }).winds.forEach((wind) => {
            wind.producerId = wind.windEnergyId;
            wind.type = "WIND";
            producers.push(wind);
        });
        store.vppStore.households.find(obj => {
            return obj.householdId === household.householdId
        }).solars.forEach((solar) => {
            solar.producerId = solar.solarEnergyId;
            solar.type = "SOLAR";
            producers.push(solar);
        });
        store.vppStore.households.find(obj => {
            return obj.householdId === household.householdId
        }).others.forEach((other) => {
            other.producerId = other.otherEnergyId;
            other.type = "OTHER";
            producers.push(other);
        });
        return producers;
    };

    const onOpenAddDpp = () => {
        state.isAddingDpp = true;
    };

    const onFinishDpp = (record) => {
        if (state.isAddingDpp) {
            store.vppStore.saveDpp(record, state.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        state.isAddingDpp = false;
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (state.isEditingDpp) {
            store.vppStore.updateDpp(state.dppId, state.vppId, record).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        state.isEditingDpp = false;
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else {
            enqueueSnackbar("Beim Editieren oder Hinzufügen eines DK ist etwas schief gelaufen.", {variant: "error"});
        }
    };

    const onCancelDpp = () => {
        state.isAddingDpp = false;
        state.isEditingDpp = false;
    };

    const onFinishHousehold = (record) => {
        if (state.isAddingHousehold) {
            store.vppStore.saveHousehold(state.vppId, record).then(
                (result) => {
                    if (result.success) {
                        fetchHouseholds();
                        state.isAddingHousehold = false;
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (state.isEditingHousehold) {
            store.vppStore.updateHousehold(state.householdId, state.vppId, record).then(
                (result) => {
                    if (result.success) {
                        fetchHouseholds();
                        state.isEditingHousehold = false;
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else {
            enqueueSnackbar("Beim Editieren oder Hinzufügen eines Haushaltes ist etwas schief gelaufen.", {variant: "error"});
        }
    };

    const onCancelHousehold = () => {
        state.isAddingHousehold = false;
        state.isEditingHousehold = false;
    };

    const onOpenAddHousehold = () => {
        state.isAddingHousehold = true;
    };

    const onOpenEditDpp = (dppId) => {
        store.vppStore.getDppById(dppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    state.dppId = dppId;
                    state.isEditingDpp = true;
                }
            }
        )
    };

    const onDeleteDpp = (dppId) => {
        store.vppStore.deleteDpp(dppId, state.vppId).then(
            (result) => {
                if (result.success) {
                    fetchDpps();
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onOpenEditHousehold = (householdId) => {
        store.vppStore.getHouseholdById(householdId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    state.householdId = householdId;
                    state.isEditingHousehold = true;
                }
            }
        )
    };

    const onDeleteHousehold = (householdId) => {
        store.vppStore.deleteHousehold(householdId, state.vppId).then(
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
            store.vppStore.getWaterById(producerId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    } else {
                        state.waterEnergyId = producerId;
                        state.isEditingWater = true;
                    }
                }
            )
        } else if (type === "WIND") {
            store.vppStore.getWindById(producerId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    } else {
                        state.windEnergyId = producerId;
                        state.isEditingWind = true;
                    }
                }
            )
        } else if (type === "SOLAR") {
            store.vppStore.getSolarById(producerId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    } else {
                        state.solarEnergyId = producerId;
                        state.isEditingSolar = true;
                    }
                }
            )
        } else if (type === "OTHER") {
            store.vppStore.getOtherById(producerId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    } else {
                        state.otherEnergyId = producerId;
                        state.isEditingOther = true;
                    }
                }
            )
        }
    };

    const onDeleteProducer = (producerId, type) => {
        if (type === "WATER") {
            store.vppStore.deleteWater(producerId, state.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        fetchHouseholds();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (type === "WIND") {
            store.vppStore.deleteWind(producerId, state.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        fetchHouseholds();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (type === "SOLAR") {
            store.vppStore.deleteSolar(producerId, state.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        fetchHouseholds();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        } else if (type === "OTHER") {
            store.vppStore.deleteOther(producerId, state.vppId).then(
                (result) => {
                    if (result.success) {
                        fetchDpps();
                        fetchHouseholds();
                    }
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            );
        }
    };

    const onOpenEditStorage = (storageId) => {
        store.vppStore.getStorageById(storageId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    state.storageId = storageId;
                    state.isEditingStorage = true;
                }
            }
        )
    };

    const onDeleteStorage = (storageId) => {
        store.vppStore.deleteStorage(storageId, state.vppId).then(
            (result) => {
                if (result.success) {
                    fetchDpps();
                    fetchHouseholds();
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onOpenCreateProducerWithDpp = (dppId) => {
        state.isAddingProducer = true;
        state.isAddingToDpp = true;
        state.isAddingToHousehold = false;
        state.dppId = dppId;
    };

    const onOpenAddStorageWithDpp = (dppId) => {
        state.isAddingStorage = true;
        state.isAddingToDpp = true;
        state.isAddingToHousehold = false;
        state.dppId = dppId;
    };

    const onOpenAddProducerWithHousehold = (householdId) => {
        state.isAddingProducer = true;
        state.isAddingToDpp = false;
        state.isAddingToHousehold = true;
        state.householdId = householdId;
    };

    const onOpenAddStorageWithHousehold = (householdId) => {
        state.isAddingStorage = true;
        state.isAddingToDpp = false;
        state.isAddingToHousehold = true;
        state.householdId = householdId;
    };

    const onCancelWaterEnergy = () => {
        state.isAddingWater = false;
        state.isEditingWater = false;
    };

    const onCancelWindEnergy = () => {
        state.isAddingWind = false;
        state.isEditingWind = false;
    };

    const onCancelSolarEnergy = () => {
        state.isAddingSolar = false;
        state.isEditingSolar = false;
    };


    const onCancelOtherEnergy = () => {
        state.isAddingOther = false;
        state.isEditingOther = false;
    };

    const onCancelStorage = () => {
        state.isAddingStorage = false;
        state.isEditingStorage = false;
    };

    const onFinishWaterEnergy = (record) => {
        if (state.isAddingWater) {
            if (state.isAddingToDpp) {
                store.vppStore.saveWaterToDpp(record, state.dppId).then((result) => {
                    if (result.success) {
                        fetchDpps();
                        state.isAddingProducer = false;
                        state.isAddingWater = false;
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (state.isAddingToHousehold) {
                store.vppStore.saveWaterToHousehold(record, state.householdId).then((result) => {
                    if (result.success) {
                        state.isAddingProducer = false;
                        state.isAddingWater = false;
                        fetchHouseholds();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else {
                enqueueSnackbar("Beim Speichern des Wasserkraftwerks ist etwas schief gelaufen.", {variant: "error"})
            }
        } else if (state.isEditingWater) {
            store.vppStore.updateWater(state.waterEnergyId,
                state.vppId, record).then((result) => {
                if (result.success) {
                    fetchHouseholds();
                    fetchDpps();
                    state.isEditingWater = false;
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            });
        } else {
            enqueueSnackbar("Beim Speichern des Wasserkraftwerks ist etwas schief gelaufen.", {variant: "error"})
        }
    };

    const onFinishWindEnergy = (record) => {
        if (state.isAddingWind) {
            if (state.isAddingToDpp) {
                store.vppStore.saveWindToDpp(record, state.dppId).then((result) => {
                    if (result.success) {
                        fetchDpps();
                        state.isAddingProducer = false;
                        state.isAddingWind = false;
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (state.isAddingToHousehold) {
                store.vppStore.saveWindToHousehold(record, state.householdId).then((result) => {
                    if (result.success) {
                        state.isAddingProducer = false;
                        state.isAddingWind = false;
                        fetchHouseholds();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else {
                enqueueSnackbar("Beim Speichern der Windkraftanlage ist etwas schief gelaufen.", {variant: "error"})
            }
        } else if (state.isEditingWind) {
            store.vppStore.updateWind(state.windEnergyId,
                state.vppId, record).then((result) => {
                if (result.success) {
                    fetchHouseholds();
                    fetchDpps();
                    state.isEditingWind = false;
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            });
        } else {
            enqueueSnackbar("Beim Speichern der Windkraftanlage ist etwas schief gelaufen.", {variant: "error"})
        }

    };

    const onFinishSolarEnergy = (record) => {
        if (state.isAddingSolar) {
            if (state.isAddingToDpp) {
                store.vppStore.saveSolarToDpp(record, state.dppId).then((result) => {
                    if (result.success) {
                        fetchDpps();
                        state.isAddingProducer = false;
                        state.isAddingSolar = false;
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (state.isAddingToHousehold) {
                store.vppStore.saveSolarToHousehold(record, state.householdId).then((result) => {
                    if (result.success) {
                        state.isAddingProducer = false;
                        state.isAddingSolar = false;
                        fetchHouseholds();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else {
                enqueueSnackbar("Beim Speichern der Solaranlage ist etwas schief gelaufen.", {variant: "error"})
            }
        } else if (state.isEditingSolar) {
            store.vppStore.updateSolar(state.solarEnergyId,
                state.vppId, record).then((result) => {
                if (result.success) {
                    fetchHouseholds();
                    fetchDpps();
                    state.isEditingSolar = false;
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            });
        } else {
            enqueueSnackbar("Beim Speichern der Solaranlage ist etwas schief gelaufen.", {variant: "error"})
        }
    };

    const onFinishOtherEnergy = (record) => {
        if (state.isAddingOther) {
            if (state.isAddingToDpp) {
                store.vppStore.saveOtherToDpp(record, state.dppId).then((result) => {
                    if (result.success) {
                        fetchDpps();
                        state.isAddingProducer = false;
                        state.isAddingOther = false;
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (state.isAddingToHousehold) {
                store.vppStore.saveOtherToHousehold(record, state.householdId).then((result) => {
                    if (result.success) {
                        state.isAddingProducer = false;
                        state.isAddingOther = false;
                        fetchHouseholds();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else {
                enqueueSnackbar("Beim Speichern der alternativen Erzeugungsanlage ist etwas schief gelaufen.", {variant: "error"})
            }
        } else if (state.isEditingOther) {
            store.vppStore.updateOther(state.otherEnergyId,
                state.vppId, record).then((result) => {
                if (result.success) {
                    fetchHouseholds();
                    fetchDpps();
                    state.isEditingOther = false;
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            });
        } else {
            enqueueSnackbar("Beim Speichern der alternativen Erzeugungsanlage ist etwas schief gelaufen.", {variant: "error"})
        }
    };

    const onFinishStorage = (record) => {
        if (state.isAddingStorage) {
            if (state.isAddingToDpp) {
                store.vppStore.saveStorageToDpp(record, state.dppId).then((result) => {
                    if (result.success) {
                        state.isAddingStorage = false;
                        fetchHouseholds();
                        fetchDpps();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else if (state.isAddingToHousehold) {
                store.vppStore.saveStorageToHousehold(record, state.householdId).then((result) => {
                    if (result.success) {
                        state.isAddingStorage = false;
                        fetchHouseholds();
                        fetchDpps();
                        enqueueSnackbar(result.message, {variant: result.variant})
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant})
                    }
                });
            } else {
                enqueueSnackbar("Beim Speichern der Speicheranlage ist etwas schief gelaufen.", {variant: "error"})
            }
        } else if (state.isEditingStorage) {
            store.vppStore.updateStorage(state.storageId,
                state.vppId, record).then((result) => {
                if (result.success) {
                    fetchHouseholds();
                    fetchDpps();
                    state.isEditingStorage = false;
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            });
        } else {
            enqueueSnackbar("Beim Speichern der Speicheranlage ist etwas schief gelaufen.", {variant: "error"})
        }
    };

    const fetchHouseholds = () => {
        if (state.vppId) {
            store.vppStore.getHouseholdsByVpp(state.vppId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    }
                }, () => {
                    state.vppId = undefined
                }
            )
        }

    };

    const fetchDpps = () => {
        if (state.vppId) {
            store.vppStore.getDppsByVpp(state.vppId).then(
                (result) => {
                    if (!result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    }
                }, () => {
                    state.vppId = undefined
                }
            )
        }

    };

    return <div>
        <h3 style={{marginTop: 32}}>Dezentrale Kraftwerke</h3>
        <Button onClick={onOpenAddDpp}
                type="primary"
                icon={<PlusOutlined/>}>
            Dez. Kraftwerk hinzufügen
        </Button>
        {store.vppStore.dpps.map((dpp) => {
            return (<Collapse style={{marginTop: 8}} collapsible="header">
                <Panel header={dpp.decentralizedPowerPlantId} key={dpp.decentralizedPowerPlantId}>
                    <EditDeleteButtonGroup
                        onEdit={onOpenEditDpp}
                        onDelete={onDeleteDpp}
                        id={dpp.decentralizedPowerPlantId}
                    />
                    <ProducerTable
                        dppOrHouseholdId={dpp.decentralizedPowerPlantId}
                        onOpenCreate={onOpenCreateProducerWithDpp}
                        onOpenEdit={onOpenEditProducer}
                        onDelete={onDeleteProducer}
                        combine={combineDppProducers(dpp)}
                    />
                    <StorageTable
                        dppOrHouseholdId={dpp.decentralizedPowerPlantId}
                        onOpenCreate={onOpenAddStorageWithDpp}
                        onOpenEdit={onOpenEditStorage}
                        onDelete={onDeleteStorage}
                        combine={store.vppStore.dpps.find(obj => {
                            return obj.decentralizedPowerPlantId === dpp.decentralizedPowerPlantId
                        }).storages}
                    />
                </Panel>
            </Collapse>)
        })}

        <h3 style={{marginTop: 32}}>Haushalte</h3>
        <Button onClick={onOpenAddHousehold}
                type="primary"
                icon={<PlusOutlined/>}>
            Haushalt hinzufügen
        </Button>
        {store.vppStore.households.map((household) => {
            return (<Collapse style={{marginTop: 8}} collapsible="header">
                <Panel header={household.householdId} key={household.householdId}>
                    <EditDeleteButtonGroup
                        onEdit={onOpenEditHousehold}
                        onDelete={onDeleteHousehold}
                        id={household.householdId}
                    />
                    <ProducerTable
                        dppOrHouseholdId={household.householdId}
                        onOpenCreate={onOpenAddProducerWithHousehold}
                        onOpenEdit={onOpenEditProducer}
                        onDelete={onDeleteProducer}
                        combine={combineHouseholdProducers(household)}
                    />
                    <StorageTable
                        dppOrHouseholdId={household.householdId}
                        onOpenCreate={onOpenAddStorageWithHousehold}
                        onOpenEdit={onOpenEditStorage}
                        onDelete={onDeleteStorage}
                        combine={store.vppStore.households.find(obj => {
                            return obj.householdId === household.householdId
                        }).storages}
                    />
                </Panel>
            </Collapse>)
        })}

        <DppForm
            visible={state.isEditingDpp || state.isAddingDpp}
            onFinish={onFinishDpp}
            onCancel={onCancelDpp}
            editing={state.isEditingDpp}
            dpp={state.dpp}
        />

        <HouseholdForm
            visible={state.isEditingHousehold || state.isAddingHousehold}
            onFinish={onFinishHousehold}
            onCancel={onCancelHousehold}
            editing={state.isEditingHousehold}
            household={state.household}
        />

        <CreateProducerMenuModal
            visible={state.isAddingProducer}
            onOpenWater={onOpenWater}
            onOpenWind={onOpenWind}
            onOpenSolar={onOpenSolar}
            onOpenOther={onOpenOther}
            onCancel={onCancelCreateProducer}
        />


        <WaterEnergyForm
            visible={state.isAddingWater || state.isEditingWater}
            onFinish={onFinishWaterEnergy}
            onCancel={onCancelWaterEnergy}
            editing={state.isEditingWater}
            waterEnergy={state.waterEnergy}
        />

        <WindEnergyForm
            visible={state.isAddingWind || state.isEditingWind}
            onFinish={onFinishWindEnergy}
            onCancel={onCancelWindEnergy}
            editing={state.isEditingWind}
            windEnergy={state.windEnergy}
        />

        <SolarEnergyForm
            visible={state.isAddingSolar || state.isEditingSolar}
            onFinish={onFinishSolarEnergy}
            onCancel={onCancelSolarEnergy}
            editing={state.isEditingSolar}
            solarEnergy={state.solarEnergy}
        />

        <OtherEnergyForm
            visible={state.isAddingOther || state.isEditingOther}
            onFinish={onFinishOtherEnergy}
            onCancel={onCancelOtherEnergy}
            editing={state.isEditingOther}
            otherEnergy={state.otherEnergy}
        />

        <StorageForm
            visible={state.isAddingStorage || state.isEditingStorage}
            onFinish={onFinishStorage}
            onCancel={onCancelStorage}
            editing={state.isEditingStorage}
            storage={state.storage}
        />
    </div>
});