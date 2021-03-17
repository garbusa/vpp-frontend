import React, {useEffect} from "react"
import {useLocalObservable} from "mobx-react-lite"
import {
    deleteDppById,
    deleteHouseholdById,
    deleteProducerById,
    deleteStorageById,
    deleteVppById,
    getAllDppByVppId,
    getAllHouseholdByVppId,
    getAllVpps,
    getDppById,
    getHouseholdById,
    getProducerById,
    getStorageById,
    getVppById,
    publishVppById,
    saveDppToVpp,
    saveHouseholdToVpp,
    saveProducerToDpp,
    saveProducerToHousehold,
    saveStorageToDpp,
    saveStorageToHousehold,
    saveVpp,
    unpublishVppById,
    updateDppById,
    updateHouseholdById,
    updateProducerById,
    updateStorageById,
    updateVppById
} from "../services/MasterdataService"
import {autorun, set, toJS} from "mobx";


function autoSave(_this, name) {
    const storedJson = localStorage.getItem(name)
    if (storedJson) {
        set(_this, JSON.parse(storedJson))
    }
    autorun(() => {
        const value = toJS(_this)
        localStorage.setItem(name, JSON.stringify(value))
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
        storageId: undefined,
        isEditingVpp: false,
        isEditingDpp: false,
        isEditingHousehold: false,
        isEditingProducer: false,
        isEditingStorage: false,
        isAddingVpp: false,
        isAddingDpp: false,
        isAddingHousehold: false,
        isAddingProducer: false,
        isAddingStorage: false,

        isAddingToDpp: false,
        isAddingToHousehold: false,

        vpp: {
            virtualPowerPlantId: undefined
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
        storage: {
            storageId: undefined,
            ratedPower: undefined,
            energyType: undefined,
            capacity: undefined
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
        isAddingStorage: false,
        isAddingToDpp: false,
        isAddingToHousehold: false,
        producerName: undefined,
        producerPower: undefined,
        producerEnergyType: undefined,
        producerCapacity: 100,
        producerIsRunning: undefined,
        producerType: undefined,
        storageName: undefined,
        storagePower: undefined,
        storageEnergyType: undefined,
        storageCapacity: 100
    },


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
            store.stepThreeState.producerCapacity = initialValues.stepThreeState.producerCapacity;
            store.stepThreeState.producerEnergyType = initialValues.stepThreeState.producerEnergyType;
            store.stepThreeState.producerIsRunning = initialValues.stepThreeState.producerIsRunning;
            store.stepThreeState.producerName = initialValues.stepThreeState.producerName;
            store.stepThreeState.producerPower = initialValues.stepThreeState.producerPower;
            store.stepThreeState.producerType = initialValues.stepThreeState.producerType;

            store.stepThreeState.storageCapacity = initialValues.stepThreeState.storageCapacity;
            store.stepThreeState.storageEnergyType = initialValues.stepThreeState.storageEnergyType;
            store.stepThreeState.storageName = initialValues.stepThreeState.storageName;
            store.stepThreeState.storagePower = initialValues.stepThreeState.storagePower;
        },
        resetEditStates: async () => {
            store.editState.vpp = initialValues.editState.vpp;
            store.editState.dpp = initialValues.editState.dpp;
            store.editState.household = initialValues.editState.household;
            store.editState.producer = initialValues.editState.producer;
            store.editState.storage = initialValues.editState.storage;
        },
        getAllVppsAction: async () => {
            store.isLoading = true;

            return await getAllVpps().then(
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
        saveProducerToDpp: async (dto, dppBusinessKey) => {
            return await saveProducerToDpp(dto, dppBusinessKey).then(
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
        saveProducerToHousehold: async (dto, householdBusinessKey) => {
            return await saveProducerToHousehold(dto, householdBusinessKey).then(
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
        getProducerById: async (producerId) => {
            return await getProducerById(producerId).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.producer = result.data;
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
        updateProducer: async (producerBusinessKey, vppBusinessKey, dto) => {
            return await updateProducerById(producerBusinessKey, vppBusinessKey, dto).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.producerId = dto.producerId;
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
        deleteProducer: async (businessKey, vppBusinessKey) => {
            return await deleteProducerById(businessKey, vppBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.editState.producerId = undefined;
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
    }));

    return store;
};
export default MasterdataContext;