import React, {useEffect} from "react"
import {useLocalObservable} from "mobx-react-lite"
import {
    getAllDppByVppId,
    getAllHouseholdByVppId,
    getAllVpps,
    saveDppToVpp,
    saveHouseholdToVpp,
    saveProducerToDpp,
    saveProducerToHousehold,
    saveStorageToDpp,
    saveStorageToHousehold,
    saveVpp
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
    isLoading: false,

    confirmationDialog: {
        isOpen: false,
        result: undefined,
    },

    creatingState: {
        step: 0,
        vppId: undefined
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
        resetConfirmationDialog: async () => {
            store.confirmationDialog.isOpen = initialValues.confirmationDialog.isOpen;
            store.confirmationDialog.result = initialValues.confirmationDialog.result;
        },
        resetStateOnEnd: async () => {
            store.vpps = initialValues.vpps;
            store.dpps = initialValues.dpps;
            store.creatingState = initialValues.creatingState;
            store.stepOneState = initialValues.stepOneState;
            store.stepTwoState = initialValues.stepTwoState;
            store.stepThreeState = initialValues.stepThreeState;
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
        saveHousehold: async (dto, vppBusinessKey) => {
            return await saveHouseholdToVpp(dto, vppBusinessKey).then(
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
    }));

    return store;
};
export default MasterdataContext;