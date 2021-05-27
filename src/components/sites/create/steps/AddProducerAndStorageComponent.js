import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Col, Popconfirm, Row} from "antd";
import history from "../../../../history";
import {CreateStepComponent} from "../../../ui/step/CreateStepComponent";
import {EditVppForm} from "../../../ui/data-forms/vpp/EditVppForm";


/**
 * Diese Komponente beinhaltet den Schritt, um Erzeugungs- und Speicheranlagen einem VK hinzuzufügen
 * @type {React.FunctionComponent<object>}
 */
const AddProducerAndStorageComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    useEffect(() => {
        if (store.vppStore.creatingState.step !== 3) {
            if (store.vppStore.creatingState.step === 0) {
                history.push("/erstellen")
            }
            if (store.vppStore.creatingState.step === 1) {
                history.push("/erstellen/schritt-1")
            }
            if (store.vppStore.creatingState.step === 2) {
                history.push("/erstellen/schritt-2")
            }
        }
    }, []);

    const onBack = () => {
        store.vppStore.creatingState.step = 2;
        history.push('/erstellen/schritt-2');
    };

    const onEnd = () => {
        store.vppStore.resetCreatingState();
        enqueueSnackbar("Der Prozess wurde erfolgreich beendet", {variant: "success"});
        history.push('/bearbeiten');
    };

    return (
        <div className={'create-vpp'}>
            <CreateStepComponent currentStep={3}/>
            <h2 style={{marginTop: 32}}>Schritt 3: Hinzufügen der Erzeugungs- und Speicheranlagen</h2>
            <p>In diesem Schritt werden den zuvor angelegten Haushalten und Dez. Kraftwerke die Erzeugungs- und
                Speicheranlagen hinzugefügt</p>

            <EditVppForm state={store.vppStore.creatingState}/>

            <Row style={{marginTop: 16}} justify="end">
                <Col>
                    <Button style={{marginRight: 8}} onClick={onBack} type="primary">
                        Zurück zu Schritt 3
                    </Button>
                </Col>
                <Col>
                    <Popconfirm
                        title="Möchten Sie diesen Prozess wirklich beenden?"
                        onConfirm={onEnd}
                        onCancel={() => {
                        }}
                        okText="Ja"
                        cancelText="Nein"
                    >
                        <Button type="primary">
                            Prozess abschließen
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
        </div>

    );
});
export default AddProducerAndStorageComponent;
