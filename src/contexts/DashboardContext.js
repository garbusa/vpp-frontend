import React, {useEffect} from "react"
import {useLocalObservable} from "mobx-react-lite"
import {autorun, configure, set, toJS} from "mobx";
import {getAllLoadsByActionRequestId} from "../services/LoadService";
import {getAllProductionsByActionRequestId} from "../services/ProductionService";

configure({enforceActions: "never"});

function autoSave(_this, name) {
    const storedJson = localStorage.getItem(name);
    if (storedJson) {
        set(_this, JSON.parse(storedJson));
    }
    autorun(() => {
        const value = toJS(_this);
        localStorage.setItem(name, JSON.stringify(value));
    });
}

const initialValues = {
    loads: [],
    loadsLabels: [],
    loadsDataset: [],
    productions: [],
    productionsLabels: [],
    productionsDataset: [],
};

const DashboardContext = () => {

    useEffect(() => {
        autoSave(store, 'dashboardStore')
    }, []);

    const store = useLocalObservable(() => ({
        ...initialValues,
        resetState: async () => {

        },
        getAllLoadsByActionRequestId: async (actionRequestBusinessKey) => {
            return await getAllLoadsByActionRequestId(actionRequestBusinessKey).then(
                (response) => {
                    let result = response.data;
                    if (result.success) {
                        store.loads = result.data;
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
                        store.productions = result.data;
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
            store.loadsLabels = labels;
        },
        setLoadsDataset: (data) => {
            store.loadsDataset = data;
        },
        setProductionsLabels: (labels) => {
            store.productionsLabels = labels;
        },
        setProductionsDataset: (data) => {
            store.productionsDataset = data;
        },
    }));

    return store;
};
export default DashboardContext;