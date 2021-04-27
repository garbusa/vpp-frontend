import React, {useEffect} from "react"
import {useLocalObservable} from "mobx-react-lite"
import {
    deleteDppById,
    deleteHouseholdById,
    deleteOtherById,
    deleteSolarById,
    deleteStorageById,
    deleteVppById,
    deleteWaterById,
    deleteWindById,
    getAllDppByVppId,
    getAllHouseholdByVppId,
    getAllVpps,
    getDppById,
    getHouseholdById,
    getOtherById,
    getSolarById,
    getStorageById,
    getVppById,
    getWaterById,
    getWindById,
    publishVppById,
    saveDppToVpp,
    saveHouseholdToVpp,
    saveOtherToDpp,
    saveOtherToHousehold,
    saveSolarToDpp,
    saveSolarToHousehold,
    saveStorageToDpp,
    saveStorageToHousehold,
    saveVpp,
    saveWaterToDpp,
    saveWaterToHousehold,
    saveWindToDpp,
    saveWindToHousehold,
    unpublishVppById,
    updateDppById,
    updateHouseholdById,
    updateOtherById,
    updateSolarById,
    updateStorageById,
    updateVppById,
    updateWaterById,
    updateWindById
} from "../services/MasterdataService"
import {autorun, configure, runInAction, set, toJS} from "mobx";
import {getActionRequestById, getAllActionRequestsByVppId, scheduleActionRequest} from "../services/ActionService";

configure({enforceActions: "never"});

function autoSave(_this, name) {
    const storedJson = localStorage.getItem(name);
    if (storedJson) {
        set(_this, JSON.parse(storedJson));
    }
    autorun(() => {
        const value = toJS(_this);
        localStorage.setItem(name, JSON.stringify(value));
    })
}

const initialValues = {
    vpps: [],
    dpps: [],
    households: [],
    isLoading: false,

    creatingState: {
        step: 0,
        vppId: undefined
    },

    editState: {
        step: 0,
        vppId: undefined,
        dppId: undefined,
        householdId: undefined,
        producerId: undefined,
        waterEnergyId: undefined,
        windEnergyId: undefined,
        solarEnergyId: undefined,
        otherEnergyId: undefined,
        storageId: undefined,
        isEditingVpp: false,
        isEditingDpp: false,
        isEditingHousehold: false,
        isEditingProducer: false,
        isEditingWater: false,
        isEditingWind: false,
        isEditingSolar: false,
        isEditingOther: false,
        isEditingStorage: false,
        isAddingVpp: false,
        isAddingDpp: false,
        isAddingHousehold: false,
        isAddingProducer: false,
        isAddingWater: false,
        isAddingWind: false,
        isAddingSolar: false,
        isAddingOther: false,
        isAddingStorage: false,

        isAddingToDpp: false,
        isAddingToHousehold: false,

        vpp: {
            virtualPowerPlantId: undefined,
            shortageThreshold: undefined,
            overflowThreshold: undefined
        },
        dpp: {
            dezentralizedPowerPlantId: undefined
        },
        household: {
            householdId: undefined,
            householdMemberAmount: undefined,
        },
        producer: {
            producerId: undefined,
            ratedPower: undefined,
            productType: undefined,
            energyType: undefined,
            isRunning: undefined,
            capacity: undefined
        },
        waterEnergy: {
            waterEnergyId: undefined,
            efficiency: undefined,
            capacity: 100,
            density: undefined,
            gravity: undefined,
            height: undefined,
            volumeFlow: undefined
        },
        windEnergy: {
            windEnergyId: undefined,
            latitude: undefined,
            longitude: undefined,
            efficiency: undefined,
            capacity: 100,
            radius: undefined,
            height: undefined
        },
        solarEnergy: {
            solarEnergyId: undefined,
            latitude: undefined,
            longitude: undefined,
            ratedCapacity: undefined,
            capacity: 100,
            alignment: undefined,
            slope: undefined
        },
        otherEnergy: {
            otherEnergyId: undefined,
            ratedCapacity: undefined,
            capacity: 100,
        },
        storage: {
            storageId: undefined,
            ratedPower: undefined,
            loadTimeHour: undefined,
            capacity: 0
        }

    },

    stepOneState: {
        isAddingDpp: false,
        dppName: undefined,
    },

    stepTwoState: {
        isAddingHousehold: false,
        householdName: undefined,
        householdAmount: undefined,
    },

    stepThreeState: {
        isAddingProducer: false,
        isAddingWater: false,
        isAddingWind: false,
        isAddingSolar: false,
        isAddingOther: false,
        isAddingStorage: false,
        isAddingToDpp: false,
        isAddingToHousehold: false,
        waterEnergy: {
            waterEnergyId: undefined,
            efficiency: undefined,
            capacity: undefined,
            density: undefined,
            gravity: undefined,
            height: undefined,
            volumeFlow: undefined
        },
        windEnergy: {
            windEnergyId: undefined,
            latitude: undefined,
            longitude: undefined,
            efficiency: undefined,
            capacity: undefined,
            radius: undefined,
            height: undefined
        },
        solarEnergy: {
            solarEnergyId: undefined,
            latitude: undefined,
            longitude: undefined,
            ratedCapacity: undefined,
            capacity: undefined,
            alignment: undefined,
            slope: undefined
        },
        otherEnergy: {
            otherEnergyId: undefined,
            ratedCapacity: undefined,
            capacity: undefined,
        },
        storage: {
            storageId: undefined,
            ratedPower: undefined,
            loadTimeHour: undefined,
            capacity: undefined
        }
    },
    dashboardState: {
        selectedVppId: undefined,
        isLoadingOrAddingRequest: false,
        isLoadingRequest: false,
        actionRequestsByVpp: [],
        selectedActionRequestId: undefined,
        selectedActionRequest: {
            actionRequestId: undefined,
            virtualPowerPlantId: undefined,
            timestamp: undefined,
            catalogs: undefined,
            finished: undefined,
        },
        selectedActionRequestKeys: [],
        isViewingActionCatalog: false,
        selectedActionCatalog: {
            startTimestamp: undefined,
            endTimestamp: undefined,
            problemType: undefined,
            cumulativeGap: undefined,
            actions: []
        }
    }

};

const MasterdataContext = () => {

    useEffect(() => {
        autoSave(store, 'masterdataStore')
    }, []);

    const store = useLocalObservable(() => ({
        ...initialValues,
        resetStateOnEnd: async () => {
            store.vpps = initialValues.vpps;
            store.dpps = initialValues.dpps;
            store.creatingState = initialValues.creatingState;
            store.stepOneState = initialValues.stepOneState;
            store.stepTwoState = initialValues.stepTwoState;
            store.stepThreeState = initialValues.stepThreeState;
            store.editState = initialValues.editState;
        },
        resetStepOneModals: async () => {
            store.stepOneState.dppName = initialValues.stepOneState.dppName;
        },
        resetStepTwoModals: async () => {
            store.stepTwoState.householdName = initialValues.stepTwoState.householdName;
            store.stepTwoState.householdAmount = initialValues.stepTwoState.householdAmount;
        },
        resetStepThreeModals: async () => {
            store.stepThreeState.solarEnergy = initialValues.stepThreeState.solarEnergy;
            store.stepThreeState.waterEnergy = initialValues.stepThreeState.waterEnergy;
            store.stepThreeState.windEnergy = initialValues.stepThreeState.windEnergy;
            store.stepThreeState.otherEnergy = initialValues.stepThreeState.otherEnergy;
            store.stepThreeState.storage = initialValues.stepThreeState.storage;
        },
        resetEditStates: async () => {
            store.editState.vpp = initialValues.editState.vpp;
            store.editState.dpp = initialValues.editState.dpp;
            store.editState.household = initialValues.editState.household;
            store.editState.solarEnergy = initialValues.editState.solarEnergy;
            store.editState.waterEnergy = initialValues.editState.waterEnergy;
            store.editState.windEnergy = initialValues.editState.windEnergy;
            store.editState.otherEnergy = initialValues.editState.otherEnergy;
            store.editState.storage = initialValues.editState.storage;
        },
        getAllVppsAction: async () => {
            return await runInAction(() => {
                store.isLoading = true;

                return getAllVpps().then(
                    (response) => {
                        let result = response.data;
                        if (result.success) {
                            store.vpps = result.data;
                            store.isLoading = false;
                            return {success: result.success, message: result.message, variant: "success"}
                        } else {
                            store.isLoading = false;
                            return {success: result.success, message: result.message, variant: "error"}
                        }
                    }, (error) => {
                        let result = error.response.data;
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                );
            });
        },
        getVppById: async (vppId) => {
            return await getVppById(vppId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.vpp = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveVpp: async (dto) => {
            return await saveVpp(dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.creatingState = {
                            isCreating: true,
                            step: 1,
                            vppId: dto.virtualPowerPlantId
                        };
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        updateVpp: async (businessKey, dto) => {
            return await updateVppById(businessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.vppId = dto.virtualPowerPlantId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        deleteVpp: async (businessKey) => {
            return await deleteVppById(businessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.vppId = undefined;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        publishVpp: async (businessKey) => {
            return await publishVppById(businessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        unpublishVpp: async (businessKey) => {
            return await unpublishVppById(businessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveDpp: async (dto, vppBusinessKey) => {
            return await saveDppToVpp(dto, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getDppsByVpp: async (vppBusinessKey) => {
            return await getAllDppByVppId(vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.dpps = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getDppById: async (dppId) => {
            return await getDppById(dppId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.dpp.decentralizedPowerPlantId = result.data.decentralizedPowerPlantId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        updateDpp: async (dppBusinessKey, vppBusinessKey, dto) => {
            return await updateDppById(dppBusinessKey, vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.dppId = dto.decentralizedPowerPlantId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        deleteDpp: async (businessKey, vppBusinessKey) => {
            return await deleteDppById(businessKey, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.dppId = undefined;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveHousehold: async (vppBusinessKey, dto) => {
            return await saveHouseholdToVpp(vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getHouseholdsByVpp: async (vppBusinessKey) => {
            return await getAllHouseholdByVppId(vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.households = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getHouseholdById: async (householdId) => {
            return await getHouseholdById(householdId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.household.householdId = result.data.householdId;
                        store.editState.household.householdMemberAmount = result.data.householdMemberAmount;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        updateHousehold: async (householdBusinessKey, vppBusinessKey, dto) => {
            return await updateHouseholdById(householdBusinessKey, vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.householdId = dto.householdId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        deleteHousehold: async (businessKey, vppBusinessKey) => {
            return await deleteHouseholdById(businessKey, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.householdId = undefined;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveStorageToDpp: async (dto, dppBusinessKey) => {
            return await saveStorageToDpp(dto, dppBusinessKey).then(
                (response) => {

                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveWaterToDpp: async (dto, dppBusinessKey) => {
            return await saveWaterToDpp(dto, dppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveWaterToHousehold: async (dto, householdBusinessKey) => {
            return await saveWaterToHousehold(dto, householdBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveWindToDpp: async (dto, dppBusinessKey) => {
            return await saveWindToDpp(dto, dppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveWindToHousehold: async (dto, householdBusinessKey) => {
            return await saveWindToHousehold(dto, householdBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveSolarToDpp: async (dto, dppBusinessKey) => {
            return await saveSolarToDpp(dto, dppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveSolarToHousehold: async (dto, householdBusinessKey) => {
            return await saveSolarToHousehold(dto, householdBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveOtherToDpp: async (dto, dppBusinessKey) => {
            return await saveOtherToDpp(dto, dppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveOtherToHousehold: async (dto, householdBusinessKey) => {
            return await saveOtherToHousehold(dto, householdBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getWaterById: async (waterEnergyId) => {
            return await getWaterById(waterEnergyId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.waterEnergy = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        updateWater: async (businessKey, vppBusinessKey, dto) => {
            return await updateWaterById(businessKey, vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.waterEnergyId = dto.waterEnergyId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getWindById: async (windEnergyId) => {
            return await getWindById(windEnergyId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.windEnergy = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        updateWind: async (businessKey, vppBusinessKey, dto) => {
            return await updateWindById(businessKey, vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.windEnergyId = dto.windEnergyId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getSolarById: async (solarEnergyId) => {
            return await getSolarById(solarEnergyId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.solarEnergy = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        updateSolar: async (businessKey, vppBusinessKey, dto) => {
            return await updateSolarById(businessKey, vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.solarEnergyId = dto.solarEnergyId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getOtherById: async (otherEnergyId) => {
            return await getOtherById(otherEnergyId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.otherEnergy = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        updateOther: async (businessKey, vppBusinessKey, dto) => {
            return await updateOtherById(businessKey, vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.otherEnergyId = dto.otherEnergyId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        deleteWater: async (businessKey, vppBusinessKey) => {
            return await deleteWaterById(businessKey, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.waterEnergyId = undefined;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        deleteWind: async (businessKey, vppBusinessKey) => {
            return await deleteWindById(businessKey, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.windEnergyId = undefined;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        deleteSolar: async (businessKey, vppBusinessKey) => {
            return await deleteSolarById(businessKey, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.solarEnergyId = undefined;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        deleteOther: async (businessKey, vppBusinessKey) => {
            return await deleteOtherById(businessKey, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.otherEnergyId = undefined;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        saveStorageToHousehold: async (dto, householdBusinessKey) => {
            console.log("1. dto", dto);
            return await saveStorageToHousehold(dto, householdBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getStorageById: async (storageId) => {
            return await getStorageById(storageId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.storage = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        updateStorage: async (storageBusinessKey, vppBusinessKey, dto) => {
            return await updateStorageById(storageBusinessKey, vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.storageId = dto.storageId;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        deleteStorage: async (businessKey, vppBusinessKey) => {
            return await deleteStorageById(businessKey, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.storageId = undefined;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getAllActionRequestsByVppId: async (vppBusinessKey) => {
            return await getAllActionRequestsByVppId(vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.dashboardState.actionRequestsByVpp = result.data;
                        let i = 0;
                        store.dashboardState.actionRequestsByVpp.forEach((actionRequest) => {
                            actionRequest.key = "" + i;
                            i++;
                        });
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        getActionRequestById: async (actionRequestBusinessKey) => {
            return await getActionRequestById(actionRequestBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.dashboardState.selectedActionRequest = result.data;
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },
        scheduleActionRequestByVppId: async (vppBusinessKey) => {
            return await scheduleActionRequest(vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        return {success: result.success, message: result.message, variant: "success"}
                    } else {
                        return {success: result.success, message: result.message, variant: "error"}
                    }
                }, (error) => {
                    let result = error.response.data;
                    return {success: result.success, message: result.message, variant: "error"}
                }
            );
        },

    }));

    return store;
};
export default MasterdataContext;