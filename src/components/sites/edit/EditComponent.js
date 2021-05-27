import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Alert, Button, Col, Row, Tooltip} from "antd";
import EditVppFormComponent from "./EditVppFormComponent";

/**
 * Diese Komponente bildet die "VK bearbeiten" Webseite ab
 * @type {React.FunctionComponent<object> | (Function & {displayName: string})}
 */
const EditComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    useEffect(() => {
        store.vppStore.getAllVppsAction().then(
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
        fetchVpp(vppId).then(() => {
            fetchHouseholds(vppId).then(
                () => {
                    fetchDpps(vppId).then(() => {
                        store.vppStore.editState.vppId = vppId;
                    }, () => {
                        store.vppStore.editState.vppId = undefined;
                    });
                }, () => {
                    store.vppStore.editState.vppId = undefined;
                }
            );
        });

    };

    const fetchVpp = async (vppId) => {
        store.vppStore.getVppById(vppId).then((result) => {
            if (!result.success) {
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        });
    };

    const fetchHouseholds = async (vppId) => {
        store.vppStore.getHouseholdsByVpp(vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                }
            }
        )
    };

    const fetchDpps = async (vppId) => {
        store.vppStore.getDppsByVpp(vppId).then(
            (result) => {
                if (!result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                }
            }
        )
    };

    if (store.vppStore.isLoading) {
        return null;

    } else {
        return (
            <div className={'edit-vpp'}>
                <h2>Virtuelles Kraftwerk editieren</h2>
                <p>In diesem Bereich können Sie bestehende virtuelle Kraftwerke editieren löschen und publizieren.</p>
                {store.vppStore.vpps.length < 1
                    ? <Row>
                        <Col>
                            <Alert
                                description={"Es existieren momentan keine virtuellen Kraftwerke, die bearbeitet werden können."}/>
                        </Col>
                    </Row>
                    : store.vppStore.vpps.map((vpp) => {
                        return (
                            <Tooltip placement={"right"}
                                     title={"Status: " + (vpp.published ? "veröffentlicht" : "nicht veröffentlicht")}>
                                <Button style={{marginRight: 8}} onClick={e => onSelectVpp(vpp.virtualPowerPlantId)}
                                        type="primary"
                                        htmlType="submit">
                                    {vpp.virtualPowerPlantId}
                                </Button>
                            </Tooltip>
                        )
                    })
                }
                <EditVppFormComponent/>
            </div>
        );
    }


});

export default EditComponent;
