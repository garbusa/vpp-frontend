import {Alert, Col, Row} from "antd";
import {ActionCatalogTable} from "../../ui/tables/ActionCatalogTable";
import React, {useContext} from "react";
import {ActionManipulationTable} from "../../ui/tables/ActionManipulationTable";
import {RootStoreContext} from "../../../store/RootStore";
import {observer} from "mobx-react";
import {LoadProductionChart} from "../../ui/chart/LoadProductionChart";
import {DataLoading} from "../../ui/loading/DataLoading";

/**
 * Diese Komponente beinhaltet bildet die Handlungsempfehlungen, Manipulationen und Last- und Erzeugungsübersicht
 * im Dashboard ab
 * @type {Function}
 */
export const ActionRequestComponent = observer(() => {
    const vppStore = useContext(RootStoreContext).vppStore;

    if (vppStore.dashboardState.selectedVppId !== undefined &&
        vppStore.dashboardState.selectedActionRequest !== undefined) {
        if (vppStore.dashboardState.selectedActionRequest.status === "FINISHED") {
            return <Row style={{marginTop: 32}}>
                <Col>
                    <p>Auf dieser Webseite können Sie die die Handlungsempfehlungen aus den Katalogen entnehmen,<br/>
                        sowie die durchgeführten Manipulationen einsehen. Die Grafik gibt die Tagesprognose für die
                        nächsten 24 Stunden aus.</p>
                </Col>
                <Col span={24}>
                    <ActionCatalogTable/>
                    <ActionManipulationTable/>
                    <LoadProductionChart/>
                </Col>
            </Row>
        } else if (vppStore.dashboardState.selectedActionRequest.status === "FAILED") {
            return <Row>
                <Alert style={{marginTop: 16}}
                       description="Während der Maßnahmenabfrage ist ein Fehler aufgetreten. Bitte überprüfen Sie die Logs der einzelnen Services."
                       type="error"/>
            </Row>
        } else if (vppStore.dashboardState.selectedActionRequest.status === "STARTED") {
            return <DataLoading message={"Die Maßnahmenabfrage wird momentan bearbeitet. Bitte warten Sie..."}/>
        } else {
            return <p style={{marginTop: 16}}>Bitte führen Sie eine Aktion aus, indem Sie ein VK auswählen.</p>;
        }
    } else {
        return <p style={{marginTop: 16}}>Bitte führen Sie eine Aktion aus, indem Sie ein VK auswählen.</p>;
    }
});
