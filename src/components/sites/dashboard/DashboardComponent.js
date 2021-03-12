import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";

const DashboardComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    useEffect(() => {
        store.masterdataStore.getAllVppsAction().then(
            (result) => {
                if (result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant})
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            }
        );
        //


    }, []);

    if (store.masterdataStore.isLoading) {
        return (
            <div className="test">
                loading
            </div>
        );

    } else {
        return (

            <div className="test">
                {store.masterdataStore.vpps.map((item) => {
                    return <div key={item.virtualPowerPlantId}>{item.virtualPowerPlantId} - {item.published}</div>
                })}
            </div>
        );
    }


});

export default DashboardComponent;
