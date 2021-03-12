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

    creatingState: {
        step: 0,
        vppId: null
    },

    stepOneState: {
        isAddingDpp: false,
        dppName: '',
    },

    stepTwoState: {
        isAddingHousehold: false,
        householdName: '',
        householdAmount: 0,
    },

    stepThreeState: {
        isAddingProducer: false,
        isAddingStorage: false,
        isAddingToDpp: false,
        isAddingToHousehold: false,
        producerName: '',
        producerPower: -1,
        producerEnergyType: '',
        producerCapacity: -1,
        producerIsRunning: false,
        producerType: '',
        storageName: '',
        storagePower: -1,
        storageEnergyType: '',
        storageCapacity: -1
    },


};

const MasterdataContext = () => {

    useEffect(() => {
        autoSave(store, 'masterdataStore')
    }, []);

    const store = useLocalObservable(() => ({
        ...initialValues,

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