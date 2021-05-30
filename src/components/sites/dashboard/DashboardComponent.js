import React, {useContext, useEffect} from "react";

import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Alert, Button, Col, Row} from "antd";
import {ActionRequestMenuModal} from "../../ui/modals/action-request/ActionRequestMenuModal";
import {ActionRequestForm} from "../../ui/data-forms/action-request/ActionRequestForm";
import {ProducerManipulationForm} from "../../ui/data-forms/action-manipulation/ProducerManipulationForm";
import {StorageManipulationForm} from "../../ui/data-forms/action-manipulation/StorageManipulationForm";
import {GridManipulationForm} from "../../ui/data-forms/action-manipulation/GridManipulationForm";
import {ActionRequestCallModal} from "../../ui/modals/action-request/ActionRequestCallModal";
import {ActionRequestCatalogModal} from "../../ui/modals/action-request/ActionRequestCatalogModal";
import {ActionRequestComponent} from "./ActionRequestComponent";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Dashboard Webseite ab
 * @type {Function}
 */
const DashboardComponent = observer(() => {

    const {enqueueSnackbar} = useSnackbar();
    const vppStore = useContext(RootStoreContext).vppStore;

    const onSelectVpp = (vppId) => {
        vppStore.dashboardState.selectedVppId = vppId;
        vppStore.dashboardState.isLoadingOrAddingRequest = true;
    };

    useEffect(() => {
        vppStore.getAllActiveVppsAction().then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        );
    }, []);


    if (vppStore.isLoading) {
        return null;
    } else if (vppStore.activeVpps.length > 0) {
        return (

            <div className="app">
                <h2>Dashboard</h2>
                <Row style={{marginTop: 16, marginBottom: 16}}>
                    <Col>
                        <Alert
                            description={"Falls Ihr gewünschtes virtuelles Kraftwerk nicht aufgelistet ist, sollten Sie den \"veröffentlicht\"-Status überprüfen. Diesen Status können Sie auf der Webseite \"VK bearbeiten\" editieren."}/>
                    </Col>
                </Row>
                {vppStore.activeVpps.map((vpp) => {
                    return <Button
                        onClick={() => onSelectVpp(vpp.virtualPowerPlantId)}>{vpp.virtualPowerPlantId}</Button>
                })}

                <ActionRequestMenuModal/>
                <ActionRequestForm/>

                <ProducerManipulationForm/>
                <StorageManipulationForm/>
                <GridManipulationForm/>

                <ActionRequestCallModal/>


                <ActionRequestComponent/>
                <ActionRequestCatalogModal/>
            </div>
        );
    } else {
        return (
            <div className="app">
                <h1>Dashboard</h1>
                <Row>
                    <Col>
                        <Alert
                            description={"Es konnten keine aktiven virtuelle Kraftwerke gefunden werden. Bitte erstellen Sie ein virtuelles Kraftwerk oder veröffentlichen Sie ein Existierendes."}/>
                    </Col>
                </Row>
            </div>
        );
    }


});

export default DashboardComponent;
