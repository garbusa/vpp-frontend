import React, {useContext, useEffect} from "react";

import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Alert, Button, Col, Popconfirm, Row, Space, Switch} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import {EditVppForm} from "../../ui/data-forms/vpp/EditVppForm";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet die Bearbeitung eines aktuellen VK ab
 * @type {Function}
 */
const EditVppFormComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    useEffect(() => {
    }, []);


    const onDeleteVpp = () => {
        store.vppStore.deleteVpp(store.vppStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    store.vppStore.getAllVppsAction();
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onChangePublished = () => {
        if (store.vppStore.editState.vpp.published) {
            onUnpublish();
        } else {
            onPublish();
        }
    };

    const onPublish = () => {
        store.vppStore.publishVpp(store.vppStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    store.vppStore.getAllVppsAction()
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    const onUnpublish = () => {
        store.vppStore.unpublishVpp(store.vppStore.editState.vppId).then(
            (result) => {
                if (result.success) {
                    store.vppStore.getAllVppsAction()
                }
                enqueueSnackbar(result.message, {variant: result.variant});
            }
        );
    };

    if (store.vppStore.isLoading) {
        return null;

    } else {
        if (store.vppStore.editState.vppId !== undefined && store.vppStore.editState.vppId !== ''
            && store.vppStore.editState.vppId !== null) {
            return (
                <div className={'edit-vpp-form'}>
                    <p>
                        <h3 style={{marginTop: 32}}>Aktionen für virtuelle Kraftwerke</h3>
                        <Space size="middle">
                            <Popconfirm
                                title={"Möchten Sie wirklich das gesamte virtuelle Kraftwerk löschen?"}
                                onConfirm={() => onDeleteVpp(store.vppStore.editState.vppId)}
                                okText="Ja"
                                cancelText="Nein"
                            >
                                <Button type="danger" icon={<DeleteOutlined/>}>Löschen</Button>
                            </Popconfirm>
                            <Switch checkedChildren="veröffentlicht" unCheckedChildren="nicht veröffentlicht"
                                    onChange={onChangePublished} checked={store.vppStore.editState.vpp.published}/>

                        </Space>
                    </p>
                    <EditVppForm state={store.vppStore.editState}/>
                </div>
            );
        } else if (store.vppStore.vpps.length > 0) {
            return <Row>
                <Col>
                    <Alert style={{marginTop: 16}}
                           description="Wähle Sie ein virtuelles Kraftwerk aus, um es editieren zu können."/>
                </Col>
            </Row>
        } else {
            return null;
        }
    }


});

export default EditVppFormComponent;
