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
    getAllActiveVpps,
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
    isMasterdataHealthy,
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
import {
    getActionRequestById,
    getAllActionRequestsByVppId,
    isActionHealthy,
    scheduleActionRequest
} from "../services/ActionService";
import {getAllLoadsByActionRequestId, isLoadHealthy} from "../services/LoadService";
import {getAllProductionsByActionRequestId, isProductionHealthy} from "../services/ProductionService";

configure({enforceActions: "never"});

/**
 * Speichert bei Änderungen den Zustand im Browser
 * @param _this
 * @param name
 */
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
    servicesOnline: false,

    /**
     * allgemeine Zustände, die von mehreren Webseiten aktualisiert und verwendet werden
     */
    vpps: [],
    activeVpps: [],
    dpps: [],
    households: [],
    isLoading: false,

    /**
     * Zustand beim Editieren eines VKs
     */
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
            published: undefined
        },
        dpp: {
            decentralizedPowerPlantId: undefined
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

    /**
     * Zustand beim Hinzufügen eines VKs
     */
    creatingState: {
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
            virtualPowerPlantId: undefined
        },
        dpp: {
            decentralizedPowerPlantId: undefined
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

    /**
     * Zustand während dem ersten Schritts beim Hinzufügen eines Vks
     */
    stepOneState: {
        isAddingDpp: false,
        dpp: {
            decentralizedPowerPlantId: undefined
        }
    },

    /**
     * Zustand während dem zweiten Schritts beim Hinzufügen eines Vks
     */
    stepTwoState: {
        isAddingHousehold: false,
        household: {
            householdId: undefined,
            householdMemberAmount: undefined
        },
    },

    /**
     * Zustand im Dashboard
     */
    dashboardState: {
        selectedVppId: undefined,

        isLoadingOrAddingRequest: false,
        isLoadingRequest: false,

        isAddingRequest: false,
        addingActionRequest: {
            actionRequestId: undefined,
            virtualPowerPlantId: undefined,
            timestamp: undefined,
            overflowThreshold: undefined,
            shortageThreshold: undefined,
            producerManipulations: [],
            storageManipulations: [],
            gridManipulations: []
        },

        selectedProducer: [],
        addingProducerManipulation: {
            producerId: undefined,
            startTimestamp: undefined,
            endTimestamp: undefined,
            type: undefined,
            capacity: undefined,
        },
        isAddingProducerManipulation: false,
        isEditingProducerManipulation: false,

        selectedStorages: [],
        addingStorageManipulation: {
            storageId: undefined,
            startTimestamp: undefined,
            endTimestamp: undefined,
            type: undefined,
        },
        isAddingStorageManipulation: false,
        isEditingStorageManipulation: false,

        addingGridManipulation: {
            startTimestamp: undefined,
            endTimestamp: undefined,
            type: undefined,
            ratedPower: undefined
        },
        isAddingGridManipulation: false,
        isEditingGridManipulation: false,

        actionRequestsByVpp: [],
        selectedActionRequestId: undefined,
        selectedActionRequest: {
            actionRequestId: undefined,
            virtualPowerPlantId: undefined,
            timestamp: undefined,
            catalogs: undefined,
            status: undefined,
            overflowThreshold: undefined,
            shortageThreshold: undefined,
            producerManipulations: [],
            storageManipulations: [],
            gridManipulations: []
        },
        selectedActionRequestKeys: [],
        isViewingActionCatalog: false,
        selectedActionCatalog: {
            startTimestamp: undefined,
            endTimestamp: undefined,
            problemType: undefined,
            averageGap: undefined,
            actions: []
        },

        loads: [],
        loadsLabels: [],
        loadsDataset: [],
        productions: [],
        productionsLabels: [],
        productionsDataset: [],
    }

};

/**
 * Beinhaltet Resetfunktionen für einzelne States und ruft die Methoden der Services für die REST-Anfragen zu den
 * Microservices auf
 * @returns {{dpps, isLoading, dashboardState, servicesOnline, creatingState, stepOneState, stepTwoState, activeVpps, vpps, editState, households}&{saveSolarToHousehold: (function(*=, *=): (* | {success: *, variant: string, message: *})), scheduleActionRequestByVppId: (function(*=): (* | {success: *, variant: string, message: *})), getDppById: (function(*=): (* | {success: *, variant: string, message: *})), deleteWater: (function(*=, *=): (* | {success: *, variant: string, message: *})), saveDpp: (function(*=, *=): (* | {success: *, variant: string, message: *})), publishVpp: (function(*=): (* | {success: *, variant: string, message: *})), saveStorageToDpp: (function(*=, *=): (* | {success: *, variant: string, message: *})), updateDpp: (function(*=, *=, *=): (* | {success: *, variant: string, message: *})), getAllVppsAction: (function(): (* | {success: *, variant: string, message: *})), setProductionsLabels: setProductionsLabels, resetCreatingState: resetCreatingState, updateHousehold: (function(*=, *=, *=): (* | {success: *, variant: string, message: *})), updateWater: (function(*=, *=, *=): (* | {success: *, variant: string, message: *})), saveVpp: (function(*=): (* | {success: *, variant: string, message: *})), deleteSolar: (function(*=, *=): (* | {success: *, variant: string, message: *})), unpublishVpp: (function(*=): (* | {success: *, variant: string, message: *})), getOtherById: (function(*=): (* | {success: *, variant: string, message: *})), resetAddingProducerManipulation: resetAddingProducerManipulation, getSolarById: (function(*=): (* | {success: *, variant: string, message: *})), setLoadsDataset: setLoadsDataset, resetAddingRequest: resetAddingRequest, deleteDpp: (function(*=, *=): (* | {success: *, variant: string, message: *})), saveWaterToHousehold: (function(*=, *=): (* | {success: *, variant: string, message: *})), deleteStorage: (function(*=, *=): (* | {success: *, variant: string, message: *})), updateWind: (function(*=, *=, *=): (* | {success: *, variant: string, message: *})), saveOtherToDpp: (function(*=, *=): (* | {success: *, variant: string, message: *})), resetSelectedActionRequests: resetSelectedActionRequests, setProductionsDataset: setProductionsDataset, deleteHousehold: (function(*=, *=): (* | {success: *, variant: string, message: *})), updateOther: (function(*=, *=, *=): (* | {success: *, variant: string, message: *})), getWindById: (function(*=): (* | {success: *, variant: string, message: *})), updateVpp: (function(*=, *=): (* | {success: *, variant: string, message: *})), getActionRequestById: (function(*=): (* | {success: *, variant: string, message: *})), saveHousehold: (function(*=, *=): (* | {success: *, variant: string, message: *})), getHouseholdById: (function(*=): (* | {success: *, variant: string, message: *})), saveOtherToHousehold: (function(*=, *=): (* | {success: *, variant: string, message: *})), getAllActionRequestsByVppId: (function(*=): (* | {success: *, variant: string, message: *})), getAllLoadsByActionRequestId: (function(*=): (* | {success: *, variant: string, message: *})), resetAddingStorageManipulation: resetAddingStorageManipulation, getStorageById: (function(*=): (* | {success: *, variant: string, message: *})), isHealthy: (function(): (* | boolean)), deleteVpp: (function(*=): (* | {success: *, variant: string, message: *})), getAllActiveVppsAction: (function(): (* | {success: *, variant: string, message: *})), saveWindToDpp: (function(*=, *=): (* | {success: *, variant: string, message: *})), updateSolar: (function(*=, *=, *=): (* | {success: *, variant: string, message: *})), resetAddingGridManipulation: resetAddingGridManipulation, saveWindToHousehold: (function(*=, *=): (* | {success: *, variant: string, message: *})), saveStorageToHousehold: (function(*=, *=): (* | {success: *, variant: string, message: *})), getAllProductionsByActionRequestId: (function(*=): (* | {success: *, variant: string, message: *})), getDppsByVpp: (function(*=): (* | {success: *, variant: string, message: *})), deleteOther: (function(*=, *=): (* | {success: *, variant: string, message: *})), getVppById: (function(*=): (* | {success: *, variant: string, message: *})), saveWaterToDpp: (function(*=, *=): (* | {success: *, variant: string, message: *})), getWaterById: (function(*=): (* | {success: *, variant: string, message: *})), saveSolarToDpp: (function(*=, *=): (* | {success: *, variant: string, message: *})), getHouseholdsByVpp: (function(*=): (* | {success: *, variant: string, message: *})), updateStorage: (function(*=, *=, *=): (* | {success: *, variant: string, message: *})), deleteWind: (function(*=, *=): (* | {success: *, variant: string, message: *})), setLoadsLabels: setLoadsLabels}}
 * @constructor
 */
const VppContext = () => {

    useEffect(() => {
        autoSave(store, 'vppStore')
    }, []);

    const store = useLocalObservable(() => ({
        ...initialValues,
        resetCreatingState: async () => {
            store.creatingState = initialValues.creatingState;
        },
        resetAddingRequest: async () => {
            store.dashboardState.addingActionRequest = initialValues.dashboardState.addingActionRequest
        },
        resetAddingProducerManipulation: async () => {
            store.dashboardState.addingProducerManipulation = initialValues.dashboardState.addingProducerManipulation;
            store.dashboardState.selectedProducer = initialValues.dashboardState.selectedProducer;
        },
        resetAddingStorageManipulation: async () => {
            store.dashboardState.addingStorageManipulation = initialValues.dashboardState.addingStorageManipulation;
            store.dashboardState.selectedStorages = initialValues.dashboardState.selectedStorages;
        },
        resetAddingGridManipulation: async () => {
            store.dashboardState.addingGridManipulation = initialValues.dashboardState.addingGridManipulation;
        },
        resetSelectedActionRequests: async () => {
            store.dashboardState.selectedActionRequestKeys = initialValues.dashboardState.selectedActionRequestKeys;
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
        getAllActiveVppsAction: async () => {
            return await runInAction(() => {
                store.isLoading = true;

                return getAllActiveVpps().then(
                    (response) => {
                        let result = response.data;
                        if (result.success) {
                            store.activeVpps = result.data;
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
        getVppById: async (virtualPowerPlantId) => {
            return await getVppById(virtualPowerPlantId).then(
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
        updateVpp: async (virtualPowerPlantId, dto) => {
            return await updateVppById(virtualPowerPlantId, dto).then(
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
        deleteVpp: async (virtualPowerPlantId) => {
            return await deleteVppById(virtualPowerPlantId).then(
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
        publishVpp: async (virtualPowerPlantId) => {
            return await publishVppById(virtualPowerPlantId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.vpp.published = true;
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
        unpublishVpp: async (virtualPowerPlantId) => {
            return await unpublishVppById(virtualPowerPlantId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.vpp.published = false;
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
        saveDpp: async (dto, virtualPowerPlantId) => {
            return await saveDppToVpp(dto, virtualPowerPlantId).then(
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
        getDppsByVpp: async (virtualPowerPlantId) => {
            return await getAllDppByVppId(virtualPowerPlantId).then(
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
        getDppById: async (decentralizedPowerPlantId) => {
            return await getDppById(decentralizedPowerPlantId).then(
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
        updateDpp: async (decentralizedPowerPlantId, virtualPowerPlantId, dto) => {
            return await updateDppById(decentralizedPowerPlantId, virtualPowerPlantId, dto).then(
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
        deleteDpp: async (decentralizedPowerPlantId, virtualPowerPlantId) => {
            return await deleteDppById(decentralizedPowerPlantId, virtualPowerPlantId).then(
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
        saveHousehold: async (virtualPowerPlantId, dto) => {
            return await saveHouseholdToVpp(virtualPowerPlantId, dto).then(
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
        getHouseholdsByVpp: async (virtualPowerPlantId) => {
            return await getAllHouseholdByVppId(virtualPowerPlantId).then(
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
        updateHousehold: async (householdId, virtualPowerPlantId, dto) => {
            return await updateHouseholdById(householdId, virtualPowerPlantId, dto).then(
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
        deleteHousehold: async (householdId, virtualPowerPlantId) => {
            return await deleteHouseholdById(householdId, virtualPowerPlantId).then(
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
        saveStorageToDpp: async (dto, decentralizedPowerPlantId) => {
            return await saveStorageToDpp(dto, decentralizedPowerPlantId).then(
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
        saveWaterToDpp: async (dto, decentralizedPowerPlantId) => {
            return await saveWaterToDpp(dto, decentralizedPowerPlantId).then(
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
        saveWaterToHousehold: async (dto, householdId) => {
            return await saveWaterToHousehold(dto, householdId).then(
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
        saveWindToDpp: async (dto, decentralizedPowerPlantId) => {
            return await saveWindToDpp(dto, decentralizedPowerPlantId).then(
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
        saveWindToHousehold: async (dto, householdId) => {
            return await saveWindToHousehold(dto, householdId).then(
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
        saveSolarToDpp: async (dto, decentralizedPowerPlantId) => {
            return await saveSolarToDpp(dto, decentralizedPowerPlantId).then(
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
        saveSolarToHousehold: async (dto, householdId) => {
            return await saveSolarToHousehold(dto, householdId).then(
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
        saveOtherToDpp: async (dto, decentralizedPowerPlantId) => {
            return await saveOtherToDpp(dto, decentralizedPowerPlantId).then(
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
        saveOtherToHousehold: async (dto, householdId) => {
            return await saveOtherToHousehold(dto, householdId).then(
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
        updateWater: async (waterEnergyId, virtualPowerPlantId, dto) => {
            return await updateWaterById(waterEnergyId, virtualPowerPlantId, dto).then(
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
        updateWind: async (windEnergyId, virtualPowerPlantId, dto) => {
            return await updateWindById(windEnergyId, virtualPowerPlantId, dto).then(
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
        updateSolar: async (solarEnergyId, virtualPowerPlantId, dto) => {
            return await updateSolarById(solarEnergyId, virtualPowerPlantId, dto).then(
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
        updateOther: async (otherEnergyId, virtualPowerPlantId, dto) => {
            return await updateOtherById(otherEnergyId, virtualPowerPlantId, dto).then(
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
        deleteWater: async (waterEnergyId, virtualPowerPlantId) => {
            return await deleteWaterById(waterEnergyId, virtualPowerPlantId).then(
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
        deleteWind: async (windEnergyId, virtualPowerPlantId) => {
            return await deleteWindById(windEnergyId, virtualPowerPlantId).then(
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
        deleteSolar: async (solarEnergyId, virtualPowerPlantId) => {
            return await deleteSolarById(solarEnergyId, virtualPowerPlantId).then(
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
        deleteOther: async (otherEnergyId, virtualPowerPlantId) => {
            return await deleteOtherById(otherEnergyId, virtualPowerPlantId).then(
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
        saveStorageToHousehold: async (dto, householdId) => {
            return await saveStorageToHousehold(dto, householdId).then(
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
        updateStorage: async (storageId, virtualPowerPlantId, dto) => {
            return await updateStorageById(storageId, virtualPowerPlantId, dto).then(
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
        deleteStorage: async (storageId, virtualPowerPlantId) => {
            return await deleteStorageById(storageId, virtualPowerPlantId).then(
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
        getAllActionRequestsByVppId: async (virtualPowerPlantId) => {
            return await getAllActionRequestsByVppId(virtualPowerPlantId).then(
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
        getActionRequestById: async (actionRequestId) => {
            return await getActionRequestById(actionRequestId).then(
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
        scheduleActionRequestByVppId: async (dto) => {
            return await scheduleActionRequest(dto).then(
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
        getAllLoadsByActionRequestId: async (actionRequestId) => {
            return await getAllLoadsByActionRequestId(actionRequestId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.dashboardState.loads = result.data;
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
        getAllProductionsByActionRequestId: async (actionRequestId) => {
            return await getAllProductionsByActionRequestId(actionRequestId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.dashboardState.productions = result.data;
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
        setLoadsLabels: (labels) => {
            store.dashboardState.loadsLabels = labels;
        },
        setLoadsDataset: (data) => {
            store.dashboardState.loadsDataset = data;
        },
        setProductionsLabels: (labels) => {
            store.dashboardState.productionsLabels = labels;
        },
        setProductionsDataset: (data) => {
            store.dashboardState.productionsDataset = data;
        },
        isHealthy: async () => {
            console.log("Prüfe Services: Action -> Load -> Production -> Masterdata");
            return await isActionHealthy().then(
                (response) => {
                    let result = response.data;
                    if (result.status !== "UP") {
                        store.servicesOnline = false;
                        console.log("Action Service läuft nicht");
                        return false;
                    }
                    return isLoadHealthy().then(
                        (response) => {
                            let result = response.data;
                            if (result.status !== "UP") {
                                console.log("Load Service läuft nicht");
                                store.servicesOnline = false;
                                return false;
                            }
                            return isProductionHealthy().then(
                                (response) => {
                                    let result = response.data;
                                    if (result.status !== "UP") {
                                        console.log("Production Service läuft nicht");
                                        store.servicesOnline = false;
                                        return false;
                                    }
                                    return isMasterdataHealthy().then(
                                        (response) => {
                                            let result = response.data;
                                            if (result.status !== "UP") {
                                                console.log("Masterdata Service läuft nicht");
                                                store.servicesOnline = false;
                                                return false;
                                            } else {
                                                store.servicesOnline = true;
                                                console.log("Alle Services laufen");
                                                return true;
                                            }
                                        }, (error) => {
                                            store.servicesOnline = false;
                                            return false;
                                        }
                                    );
                                }, (error) => {
                                    store.servicesOnline = false;
                                    return false;
                                }
                            );
                        }, (error) => {
                            store.servicesOnline = false;
                            return false;
                        }
                    );
                }, (error) => {
                    store.servicesOnline = false;
                    return false;
                }
            );

        }
    }));

    return store;
};
export default VppContext;