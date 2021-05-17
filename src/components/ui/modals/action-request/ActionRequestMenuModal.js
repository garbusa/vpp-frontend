import {Button, Modal} from "antd/lib/index";
import React, {useContext} from "react";
import {useSnackbar} from "notistack";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";

export const ActionRequestMenuModal = observer(() => {
    const {enqueueSnackbar} = useSnackbar();

    const vppStore = useContext(RootStoreContext).vppStore;

    const cancelRequest = () => {
        vppStore.dashboardState.isLoadingOrAddingRequest = false;
    };

    const onRequest = () => {
        vppStore.dashboardState.isAddingRequest = true;
    };

    const onOpenLoadRequestModal = () => {
        //load exist requests here
        if (vppStore.dashboardState.selectedVppId) {
            vppStore.getAllActionRequestsByVppId(vppStore.dashboardState.selectedVppId).then(
                (result) => {
                    if (result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                        vppStore.dashboardState.isLoadingRequest = true;
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant});
                        vppStore.dashboardState.isLoadingOrAddingRequest = false;
                        vppStore.dashboardState.isLoadingRequest = false;
                    }
                }
            );
        }

    };

    return (
        <Modal
            closable={false}
            title="Maßnahmenabfrage"
            visible={vppStore.dashboardState.isLoadingOrAddingRequest}
            footer={[
                <Button key="submit" type="primary" onClick={onRequest}>
                    Neue Abfrage
                </Button>,
                <Button type="primary" onClick={onOpenLoadRequestModal}>
                    Abfrage laden
                </Button>,
                <Button key="back" onClick={cancelRequest}>
                    Abbrechen
                </Button>
            ]}
        >
            <p>Bei der Erstellung einer neuen Maßnahmenabfrage wird eine 24-stündige Lasten- und Erzeugungsprognose
                für das ausgewählte virtuelle Kraftwerk erzeugt. Dazu werden Indifferenzen der Last und Erzeugung
                erkannt und
                Handlungsempfehlungen in Form eines Katalogs abgegeben.</p>
            <p>Möchten Sie eine neue Anfrage erstellen oder eine vorherige laden?</p>
        </Modal>
    )
});
