import {Button, Col, Form, Input, InputNumber, Modal, Row, Table} from "antd/lib/index";
import React, {useContext} from "react";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";
import {useSnackbar} from "notistack";
import {EditDeleteButtonGroup} from "../../button-groups/EditDeleteButtonGroup";
import {Alert} from "antd";

/**
 * Diese Komponente bildet die Eingabemaske für eine Maßnahmenabfrage ab
 * @type {function(): *}
 */
export const ActionRequestForm = observer(() => {
    const {enqueueSnackbar} = useSnackbar();
    const vppStore = useContext(RootStoreContext).vppStore;

    const onCancelCreateActionRequest = () => {
        vppStore.dashboardState.isAddingRequest = false;
        vppStore.resetAddingRequest();
    };

    const onFinishCreateActionRequest = (record) => {
        if (vppStore.dashboardState.selectedVppId) {
            vppStore.dashboardState.addingActionRequest.actionRequestId = record.actionRequestId;
            vppStore.dashboardState.addingActionRequest.virtualPowerPlantId = vppStore.dashboardState.selectedVppId;
            vppStore.dashboardState.addingActionRequest.timestamp = Math.round(Date.now() / 1000);
            vppStore.dashboardState.addingActionRequest.shortageThreshold = record.shortageThreshold;
            vppStore.dashboardState.addingActionRequest.overflowThreshold = record.overflowThreshold;

            vppStore.scheduleActionRequestByVppId(vppStore.dashboardState.addingActionRequest).then(
                (result) => {
                    if (result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                        vppStore.dashboardState.isLoadingOrAddingRequest = false;
                        vppStore.dashboardState.isAddingRequest = false;
                        vppStore.resetAddingRequest()
                        //waiting and load last action
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant});

                    }
                }
            );
        }

    };

    const onOpenAddProducerManipulation = () => {
        if (vppStore.dashboardState.selectedVppId) {
            vppStore.getDppsByVpp(vppStore.dashboardState.selectedVppId).then((result) => {
                if (result.success) {
                    vppStore.getHouseholdsByVpp(vppStore.dashboardState.selectedVppId).then((result) => {
                        if (result.success) {
                            vppStore.dashboardState.isAddingProducerManipulation = true;
                        }
                    });
                }
            });
        }
    };

    const onOpenAddStorageManipulation = () => {
        if (vppStore.dashboardState.selectedVppId) {
            vppStore.getDppsByVpp(vppStore.dashboardState.selectedVppId).then((result) => {
                if (result.success) {
                    vppStore.getHouseholdsByVpp(vppStore.dashboardState.selectedVppId).then((result) => {
                        if (result.success) {
                            vppStore.dashboardState.isAddingStorageManipulation = true;
                        }
                    });
                }
            });
        }
    };

    const onOpenAddGridManipulation = () => {
        vppStore.dashboardState.isAddingGridManipulation = true;
    };

    const onOpenEditProducerManipulation = (record) => {
        vppStore.dashboardState.selectedProducer = [record.producerId];
        vppStore.dashboardState.addingProducerManipulation = record;
        vppStore.dashboardState.isEditingProducerManipulation = true;
    };

    const onDeleteProducerManipulation = (record) => {
        for (let i = 0; i < vppStore.dashboardState.addingActionRequest.producerManipulations.length; i++) {
            if (vppStore.dashboardState.addingActionRequest.producerManipulations[i].producerId === record.producerId &&
                vppStore.dashboardState.addingActionRequest.producerManipulations[i].startTimestamp === record.startTimestamp &&
                vppStore.dashboardState.addingActionRequest.producerManipulations[i].endTimestamp === record.endTimestamp) {
                vppStore.dashboardState.addingActionRequest.producerManipulations.splice(i, 1);
                i--;
            }
        }
    };

    const onOpenEditStorageManipulation = (record) => {
        vppStore.dashboardState.selectedStorages = [record.storageId];
        vppStore.dashboardState.addingStorageManipulation = record;
        vppStore.dashboardState.isEditingStorageManipulation = true;
    };


    const onDeleteStorageManipulation = (record) => {
        for (let i = 0; i < vppStore.dashboardState.addingActionRequest.storageManipulations.length; i++) {
            if (vppStore.dashboardState.addingActionRequest.storageManipulations[i].storageId === record.storageId &&
                vppStore.dashboardState.addingActionRequest.storageManipulations[i].startTimestamp === record.startTimestamp &&
                vppStore.dashboardState.addingActionRequest.storageManipulations[i].endTimestamp === record.endTimestamp) {
                vppStore.dashboardState.addingActionRequest.storageManipulations.splice(i, 1);
                i--;
            }
        }
    };

    const onOpenEditGridManipulation = (record) => {
        vppStore.dashboardState.addingGridManipulation = record;
        vppStore.dashboardState.isEditingGridManipulation = true;
    };

    const onDeleteGridManipulation = (record) => {
        for (let i = 0; i < vppStore.dashboardState.addingActionRequest.gridManipulations.length; i++) {
            if (vppStore.dashboardState.addingActionRequest.gridManipulations[i].startTimestamp === record.startTimestamp &&
                vppStore.dashboardState.addingActionRequest.gridManipulations[i].endTimestamp === record.endTimestamp) {
                vppStore.dashboardState.addingActionRequest.gridManipulations.splice(i, 1);
                i--;
            }
        }
    };

    return (<Modal
        destroyOnClose={true}
        closable={false}
        title="Maßnahmenabfrage erstellen"
        visible={vppStore.dashboardState.isLoadingOrAddingRequest && vppStore.dashboardState.isAddingRequest}
        footer={[
            <Button key="back" onClick={onCancelCreateActionRequest}>
                Abbrechen
            </Button>
        ]}
        width={1000}
    >
        <p>
            Wenn Sie bereits Handlungsempfehlungen bekommen haben, können Sie diese durch sogenannte Manipulationen
            realisieren.<br/>
            Bei Manipulationen werden die aktuellen Kapazitäten der Anlagen manipuliert, die bei der Erzeugungsprognose
            dieser Maßnahmenabfrage berücksichtigt werden.
        </p>
        <Row style={{marginTop: 16, marginBottom: 16}}>
            <Col>
                <Alert
                    message={"Die Zeitstempel werden im System bei der Abfragenbearbeitung auf eine Viertelstunde abgerundet. Deshalb kann es sein, dass sich die Zeitstempel nach dem Absenden überschneiden."}/>
            </Col>
        </Row>
        <Form
            name="createActionRequest"
            initialValues={{remember: false}}
            onFinish={onFinishCreateActionRequest}
            layout="vertical"
        >
            <Form.Item
                label="Name der Maßnahmenabfrage"
                name="actionRequestId"
                rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
            >
                <Input style={{width: 250}}/>
            </Form.Item>

            <Row>
                <Col>
                    <Form.Item
                        style={{marginRight: 16}}
                        label="Energieengpass Schwelle (kW)"
                        name="shortageThreshold"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Energieüberschuss Schwelle (kW)"
                        name="overflowThreshold"
                        rules={[{required: true, message: 'Dieses Feld muss ausgefüllt sein'}]}
                    >
                        <InputNumber style={{width: 250}}/>
                    </Form.Item>
                </Col>
            </Row>

            <h2>Manipulationen durch Erzeugungsanlagen</h2>
            <Table pagination={{pageSize: 4}} size="small"
                   dataSource={vppStore.dashboardState.addingActionRequest.producerManipulations.slice()}
                   columns={[
                       {
                           title: 'Name der Erzeugungsanlage',
                           dataIndex: 'producerId',
                           key: 'producerId',
                       },
                       {
                           title: 'Startzeitpunkt',
                           dataIndex: 'startTimestamp',
                           key: 'startTimestamp',
                           render: (value) => {
                               let date = new Date(0);
                               date.setUTCSeconds(value);
                               return date.toLocaleString();
                           },
                           sorter: (a, b) => {
                               let aDate = new Date(0);
                               let bDate = new Date(0);
                               aDate.setSeconds(a.startTimestamp, 0);
                               bDate.setSeconds(b.startTimestamp, 0);
                               return bDate - aDate;
                           },
                           defaultSortOrder: 'descend'
                       },
                       {
                           title: 'Endzeitpunkt',
                           dataIndex: 'endTimestamp',
                           key: 'endTimestamp',
                           render: (value) => {
                               let date = new Date(0);
                               date.setUTCSeconds(value);
                               return date.toLocaleString();
                           }
                       },
                       {
                           title: 'Manipulationstyp',
                           dataIndex: 'type',
                           key: 'type',
                           render: (value) => {
                               if (value === "PRODUCER_UP") {
                                   return "Erzeugungsanlage hochfahren"
                               } else if (value === "PRODUCER_DOWN") {
                                   return "Erzeugungsanlage runterfahren"
                               }
                           }
                       },
                       {
                           title: 'neue Kapazität',
                           dataIndex: 'capacity',
                           key: 'capacity'
                       }, {
                           title: 'Aktionen',
                           key: 'actions',
                           render: (record) => {
                               return <EditDeleteButtonGroup
                                   onEdit={onOpenEditProducerManipulation}
                                   onDelete={onDeleteProducerManipulation}
                                   id={record}
                               />
                           },
                       },
                   ]}/>
            <Button style={{marginTop: 8}} key="addProducerManipulation"
                    onClick={onOpenAddProducerManipulation}>
                Erzeugungsmanipulation hinzufügen
            </Button>

            <h2 style={{marginTop: 16}}>Manipulation durch Speicheranlagen</h2>
            <Table pagination={{pageSize: 4}} size="small"
                   dataSource={vppStore.dashboardState.addingActionRequest.storageManipulations.slice()}
                   columns={[
                       {
                           title: 'Name der Speicheranlage',
                           dataIndex: 'storageId',
                           key: 'storageId',
                       },
                       {
                           title: 'Startzeitpunkt',
                           dataIndex: 'startTimestamp',
                           key: 'startTimestamp',
                           render: (value) => {
                               let date = new Date(0);
                               date.setUTCSeconds(value);
                               return date.toLocaleString();
                           },
                           sorter: (a, b) => {
                               let aDate = new Date(0);
                               let bDate = new Date(0);
                               aDate.setSeconds(a.startTimestamp, 0);
                               bDate.setSeconds(b.startTimestamp, 0);
                               return bDate - aDate;
                           },
                           defaultSortOrder: 'descend'
                       },
                       {
                           title: 'Endzeitpunkt',
                           dataIndex: 'endTimestamp',
                           key: 'endTimestamp',
                           render: (value) => {
                               let date = new Date(0);
                               date.setUTCSeconds(value);
                               return date.toLocaleString();
                           }
                       },
                       {
                           title: 'Manipulationstyp',
                           dataIndex: 'type',
                           key: 'type',
                           render: (value) => {
                               if (value === "STORAGE_LOAD") {
                                   return "Speicher laden"
                               } else if (value === "STORAGE_UNLOAD") {
                                   return "Speicher entladen"
                               }
                           }
                       }, {
                           title: 'Aktionen',
                           key: 'actions',
                           render: (record) => {
                               return <EditDeleteButtonGroup
                                   onEdit={onOpenEditStorageManipulation}
                                   onDelete={onDeleteStorageManipulation}
                                   id={record}
                               />
                           },
                       },
                   ]}/>
            <Button style={{marginTop: 8}} key="addStorageManipulation"
                    onClick={onOpenAddStorageManipulation}>
                Speichermanipulation hinzufügen
            </Button>

            <h2 style={{marginTop: 16}}>Manipulation durch Stromnetz</h2>
            <Table pagination={{pageSize: 4}} size="small"
                   dataSource={vppStore.dashboardState.addingActionRequest.gridManipulations.slice()}
                   columns={[
                       {
                           title: 'Startzeitpunkt',
                           dataIndex: 'startTimestamp',
                           key: 'startTimestamp',
                           render: (value) => {
                               let date = new Date(0);
                               date.setUTCSeconds(value);
                               return date.toLocaleString();
                           },
                           sorter: (a, b) => {
                               let aDate = new Date(0);
                               let bDate = new Date(0);
                               aDate.setSeconds(a.startTimestamp, 0);
                               bDate.setSeconds(b.startTimestamp, 0);
                               return bDate - aDate;
                           },
                           defaultSortOrder: 'descend'
                       },
                       {
                           title: 'Endzeitpunkt',
                           dataIndex: 'endTimestamp',
                           key: 'endTimestamp',
                           render: (value) => {
                               let date = new Date(0);
                               date.setUTCSeconds(value);
                               return date.toLocaleString();
                           }
                       },
                       {
                           title: 'Manipulationstyp',
                           dataIndex: 'type',
                           key: 'type',
                           render: (value) => {
                               if (value === "GRID_LOAD") {
                                   return "Einspeisen"
                               } else if (value === "GRID_UNLOAD") {
                                   return "Ausspeisen"
                               }
                           }
                       },
                       {
                           title: 'Nennleistung',
                           dataIndex: 'ratedPower',
                           key: 'ratedPower',
                           render: (value) => {
                               return value + " kW"
                           }
                       }, {
                           title: 'Aktionen',
                           key: 'actions',
                           render: (record) => {
                               return <EditDeleteButtonGroup
                                   onEdit={onOpenEditGridManipulation}
                                   onDelete={onDeleteGridManipulation}
                                   id={record}
                               />
                           },
                       },
                   ]}/>
            <Button style={{marginTop: 8}} key="addGridManipulation" onClick={onOpenAddGridManipulation}>
                Stromnetzmanipulation hinzufügen
            </Button>


            <Form.Item style={{marginTop: 32}}>
                <Button type="primary" htmlType="submit">
                    Maßnahmenabfrage erstellen
                </Button>
            </Form.Item>
        </Form>
    </Modal>)
});
