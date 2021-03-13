import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button} from "antd";
import EditVppFormComponent from "./EditVppFormComponent";

const EditComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    useEffect(() => {
        store.masterdataStore.resetStateOnEnd();
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

    const onSelectVpp = (vppId) => {
        fetchHouseholds(vppId).then(
            () => {
                fetchDpps(vppId).then(() => {
                    store.masterdataStore.editState.vppId = vppId;
                });
            }
        );
    };

    const fetchHouseholds = async (vppId) => {
        store.masterdataStore.getHouseholdsByVpp(vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        )
    };

    const fetchDpps = async (vppId) => {
        store.masterdataStore.getDppsByVpp(vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                }
            }
        )
    };

    if (store.masterdataStore.isLoading) {
        return (
            <div className="test">
                loading
            </div>
        );

    } else {
        return (
            <div className={'edit-vpp'}>
                <h2>Virtuelles Kraftwerk editieren</h2>
                <p>In diesem Bereich können bestehende virtuelle Kraftwerke editiert, gelöscht und publiziert
                    werden.</p>
                {store.masterdataStore.vpps.length < 1
                    ? <p>Es gibt momentan keine angelegten virtuellen Kraftwerke</p>
                    : store.masterdataStore.vpps.map((vpp) => {
                        return (
                            <Button onClick={e => onSelectVpp(vpp.virtualPowerPlantId)} type="primary"
                                    htmlType="submit">
                                {vpp.virtualPowerPlantId}
                            </Button>
                        )
                    })
                }
                <EditVppFormComponent/>
            </div>
        );
    }


});

export default EditComponent;
