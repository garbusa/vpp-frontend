import React, {useContext, useEffect} from "react";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/RootStore";
import {useSnackbar} from "notistack";
import {Button, Col, Modal, Row, Spin, Table} from "antd";
import {Line} from "react-chartjs-2";

const DashboardComponent = observer((props) => {
    const {enqueueSnackbar} = useSnackbar();
    const store = useContext(RootStoreContext);

    const columns = [
        {
            title: 'Request Id',
            dataIndex: 'actionRequestId',
        },
        {
            title: 'VPP Id',
            dataIndex: 'virtualPowerPlantId',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            render: (record) => {
                let date = new Date(0);
                date.setSeconds(record, 0);
                return <p>{date.toLocaleString('de-DE')}</p>
            },
            sorter: (a, b) => {
                let aDate = new Date(0);
                let bDate = new Date(0);
                aDate.setSeconds(a.timestamp, 0);
                bDate.setSeconds(b.timestamp, 0);
                return bDate - aDate;
            },
            defaultSortOrder: 'ascend',
            sortOrder: 'ascend'
        }
    ];

    const onSelectVpp = (vppId) => {
        store.masterdataStore.dashboardState.selectedVppId = vppId;
        store.masterdataStore.dashboardState.isLoadingOrAddingRequest = true;
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    useEffect(() => {
        store.masterdataStore.getAllVppsAction().then(
            (result) => {
                if (result.success) {
                    enqueueSnackbar(result.message, {variant: result.variant});
                } else {
                    enqueueSnackbar(result.message, {variant: result.variant})
                }
            }
        );

    }, []);

    const cancelRequest = () => {
        store.masterdataStore.dashboardState.isLoadingOrAddingRequest = false;
    };

    const onRequest = () => {
        if (store.masterdataStore.dashboardState.selectedVppId) {
            store.masterdataStore.scheduleActionRequestByVppId(store.masterdataStore.dashboardState.selectedVppId).then(
                (result) => {
                    if (result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                        //waiting and load last action
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant});
                    }
                    store.masterdataStore.dashboardState.isLoadingOrAddingRequest = false;
                    store.masterdataStore.dashboardState.isLoadingRequest = false;
                }
            );
        }

    };

    const onOpenLoadRequestModal = () => {
        //load exist requests here
        if (store.masterdataStore.dashboardState.selectedVppId) {
            store.masterdataStore.getAllActionRequestsByVppId(store.masterdataStore.dashboardState.selectedVppId).then(
                (result) => {
                    if (result.success) {
                        enqueueSnackbar(result.message, {variant: result.variant});
                        store.masterdataStore.dashboardState.isLoadingRequest = true;
                    } else {
                        enqueueSnackbar(result.message, {variant: result.variant});
                        store.masterdataStore.dashboardState.isLoadingOrAddingRequest = false;
                        store.masterdataStore.dashboardState.isLoadingRequest = false;
                    }
                }
            );
        }

    };

    const cancelLoadRequest = () => {
        store.masterdataStore.dashboardState.selectedActionRequestId = undefined;
        store.masterdataStore.dashboardState.selectedActionRequest = undefined;
        store.masterdataStore.dashboardState.selectedActionRequestKeys = [];
        store.masterdataStore.dashboardState.isLoadingOrAddingRequest = false;
        store.masterdataStore.dashboardState.isLoadingRequest = false;
    };

    const acceptLoadRequest = () => {
        //do new request here
        if (store.masterdataStore.dashboardState.selectedActionRequestId) {
            fetchActionRequest();
            let refreshId = setInterval(function () {
                if (store.masterdataStore.dashboardState.selectedActionRequest) {
                    console.log("re-fetching actionRequest", store.masterdataStore.dashboardState.selectedActionRequest.finished);
                    fetchActionRequest();
                    if (store.masterdataStore.dashboardState.selectedActionRequest.finished) {
                        console.log("stop re-fetching actionRequest");
                        clearInterval(refreshId);
                    }
                }
            }, 5000);
        }
        store.masterdataStore.dashboardState.isLoadingOrAddingRequest = false;
        store.masterdataStore.dashboardState.isLoadingRequest = false;
    };

    const fetchActionRequest = () => {
        store.masterdataStore.getActionRequestById(store.masterdataStore.dashboardState.selectedActionRequestId).then(
            (result) => {
                if (result.success) {
                    console.log(store.masterdataStore.dashboardState.selectedActionRequest);
                    store.dashboardStore.getAllLoadsByActionRequestId(store.masterdataStore.dashboardState.selectedActionRequest.actionRequestId).then((response) => {
                        if (response.success) {
                            let labels = [];
                            let data = [];
                            store.dashboardStore.loads.map(load => {
                                let loadSum = 0;
                                load.households.map(household => {
                                    loadSum = loadSum + household.loadValue;
                                });
                                let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                                d.setUTCSeconds(load.startTimestamp);
                                labels.push(d.toLocaleTimeString('de-DE'));
                                data.push(loadSum / 1000); // watt into kw
                            });
                            store.dashboardStore.setLoadsLabels(labels);
                            store.dashboardStore.setLoadsDataset(data);
                        }
                        store.dashboardStore.getAllProductionsByActionRequestId(store.masterdataStore.dashboardState.selectedActionRequest.actionRequestId).then((response) => {
                            if (response.success) {
                                let labels = [];
                                let data = [];
                                store.dashboardStore.productions.map(production => {
                                    let producerSum = 0;
                                    production.producers.map(producer => {
                                        producerSum = producerSum + producer.currentValue;
                                    });
                                    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                                    d.setUTCSeconds(production.startTimestamp);
                                    labels.push(d.toLocaleTimeString('de-DE'));
                                    data.push(producerSum);
                                });
                                store.dashboardStore.setProductionsLabels(labels);
                                store.dashboardStore.setProductionsDataset(data);
                            }
                        })
                    });
                }
            }
        );
    };

    const rowSelection = {
        selectedRowKeys: store.masterdataStore.dashboardState.selectedActionRequestKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            store.masterdataStore.dashboardState.selectedActionRequestKeys = selectedRowKeys;
            if (selectedRows.length === 1) {
                store.masterdataStore.dashboardState.selectedActionRequestId = selectedRows[0].actionRequestId;
            }

        },

    };

    const onOpenActionCatalog = (actionCatalog) => {
        if (actionCatalog) {
            console.log("onclick actioncatalog:", actionCatalog);
            store.masterdataStore.dashboardState.selectedActionCatalog = actionCatalog;
            store.masterdataStore.dashboardState.isViewingActionCatalog = true;
        }

    };

    const onCloseActionCatalog = () => {
        store.masterdataStore.dashboardState.isViewingActionCatalog = false;
        store.masterdataStore.dashboardState.selectedActionCatalog = {
            startTimestamp: undefined,
            endTimestamp: undefined,
            problemType: undefined,
            actions: []
        };

    };

    const timestampToLocalString = (timestamp) => {
        let date = new Date(0);
        date.setUTCSeconds(timestamp);
        return date.toLocaleString();
    };

    const actionAlternatives = () => {
        if (store.masterdataStore.dashboardState.selectedActionCatalog) {
            if (store.masterdataStore.dashboardState.selectedActionCatalog.problemType === "OVERFLOW") {
                return <ul>
                    <li>Einspeisung des durchschnittlichen Überschusses ins öffentliche Netz</li>
                    <li>Hinzuschalten neuer Speicheranlagen</li>
                </ul>

            } else if (store.masterdataStore.dashboardState.selectedActionCatalog.problemType === "SHORTAGE") {
                return <ul>
                    <li>Abspeisung der duchschnittlich benötigten Energie aus dem öffentlichen Netz</li>
                    <li>Hinzuschalten neuer Erzeugungsanlagen</li>
                </ul>
            }
        }
    };

    const showActionRequest = () => {
        if (store.masterdataStore.dashboardState.selectedActionRequest !== undefined) {
            if (store.masterdataStore.dashboardState.selectedActionRequest.finished) {
                return <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <h3>Maßnahmenübersicht</h3>
                                {store.masterdataStore.dashboardState.selectedActionRequest.catalogs !== undefined &&
                                <Table pagination={{pageSize: 4}} size="small"
                                       dataSource={store.masterdataStore.dashboardState.selectedActionRequest.catalogs.slice()}
                                       columns={[
                                           {
                                               title: 'Start',
                                               dataIndex: 'startTimestamp',
                                               key: 'startTimestamp',
                                               render: (record) => {
                                                   let date = new Date(0);
                                                   date.setUTCSeconds(record);
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
                                               title: 'Ende',
                                               dataIndex: 'endTimestamp',
                                               key: 'endTimestamp',
                                               render: (record) => {
                                                   let date = new Date(0);
                                                   date.setUTCSeconds(record);
                                                   return date.toLocaleString();
                                               }
                                           },
                                           {
                                               title: 'Problem',
                                               dataIndex: 'problemType',
                                               key: 'problemType',
                                           },
                                           {
                                               title: 'Aktionen',
                                               key: 'action',
                                               render: (text, record) => (
                                                   <Button
                                                       onClick={() => onOpenActionCatalog(record)}>Maßnahmenkatalog</Button>
                                               ),
                                           },
                                       ]}/>
                                }

                            </Col>
                        </Row>
                        <Row>
                            <Col span={16}>
                                <h3>Lasten- und Erzeugungsübersicht</h3>
                                <Line data={{
                                    labels: store.dashboardStore.loadsLabels.slice(),
                                    datasets: [{
                                        label: store.masterdataStore.dashboardState.selectedVppId + " Last",
                                        data: store.dashboardStore.loadsDataset.slice(),
                                        fill: false,
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1,
                                        order: 1
                                    }, {
                                        label: store.masterdataStore.dashboardState.selectedVppId + " Erzeugung",
                                        data: store.dashboardStore.productionsDataset.slice(),
                                        fill: false,
                                        borderColor: 'rgb(201, 161, 218)',
                                        tension: 0.1,
                                        order: 2
                                    }, {
                                        label: "Stromüberfluss Grenze",
                                        data: store.dashboardStore
                                            .loadsDataset
                                            .map((x) => x + (x / 100 * store.masterdataStore.vpps
                                                .filter((vpp) => vpp.virtualPowerPlantId === store.masterdataStore.dashboardState.selectedVppId)[0].overflowThreshold))
                                            .slice(),
                                        fill: false,
                                        borderColor: 'rgb(255, 0, 0)',
                                        tension: 0.1,
                                        order: 3
                                    }, {
                                        label: "Stromengpass Grenze",
                                        data: store.dashboardStore
                                            .productionsDataset
                                            .map((x) => x + (x / 100 * store.masterdataStore.vpps
                                                .filter((vpp) => vpp.virtualPowerPlantId === store.masterdataStore.dashboardState.selectedVppId)[0].shortageThreshold))
                                            .slice(),
                                        fill: false,
                                        borderColor: 'rgb(200, 0, 0)',
                                        tension: 0.1,
                                        order: 4
                                    }
                                    ]
                                }} options={options}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            } else {
                return <Spin size="large"/>
            }
        }

    };


    if (store.masterdataStore.isLoading) {
        return (
            <div className="app">
                loading
            </div>
        );

        /**/


    } else if (store.masterdataStore.vpps.length > 0) {
        return (

            <div className="app">
                <h2>Dashboard</h2>
                <p>Bitte wähle ein virtuelles Kraftwerk aus.</p>
                {store.masterdataStore.vpps.map((vpp) => {
                    return <Button
                        onClick={() => onSelectVpp(vpp.virtualPowerPlantId)}>{vpp.virtualPowerPlantId}</Button>
                })}

                <Modal title="Maßnahmenabfrage"
                       visible={store.masterdataStore.dashboardState.isLoadingOrAddingRequest}
                       onCancel={cancelRequest}
                       footer={[
                           <Button key="back" onClick={cancelRequest}>
                               Abbrechen
                           </Button>,
                           <Button key="submit" type="primary" onClick={onRequest}>
                               Neue Abfrage
                           </Button>,
                           <Button type="primary" onClick={onOpenLoadRequestModal}>
                               Abfrage laden
                           </Button>,
                       ]}
                >
                    <p>Möchtest du eine neue Anfrage erstellen oder eine vorherige laden?</p>
                </Modal>

                <Modal title="Maßnahmenabfrage erstellen" visible={
                    store.masterdataStore.dashboardState.isLoadingOrAddingRequest &&
                    store.masterdataStore.dashboardState.isLoadingRequest
                }
                       onOk={acceptLoadRequest}
                       onCancel={cancelLoadRequest}
                       width={1000}
                >
                    <p>Bitte wähle </p>
                    <Table
                        rowSelection={{
                            type: "radio",
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={store.masterdataStore.dashboardState.actionRequestsByVpp.slice()}
                    />
                </Modal>

                {showActionRequest()}

                <Modal
                    width={1000}
                    title={
                        <div
                            style={{
                                width: '100%',
                                cursor: 'move',
                            }}
                            onFocus={() => {
                            }}
                            onBlur={() => {
                            }}
                        >
                            Maßnahmenkatalog
                        </div>
                    }
                    visible={store.masterdataStore.dashboardState.isViewingActionCatalog}
                    onOk={onCloseActionCatalog}
                    onCancel={onCloseActionCatalog}
                >
                    <p>Zeitraum: {timestampToLocalString(store.masterdataStore.dashboardState.selectedActionCatalog.startTimestamp)} bis {timestampToLocalString(store.masterdataStore.dashboardState.selectedActionCatalog.endTimestamp)}</p>
                    <p>Art des Problems: {store.masterdataStore.dashboardState.selectedActionCatalog.problemType}</p>
                    <p>Durchschnittliche
                        Energielücke: {store.masterdataStore.dashboardState.selectedActionCatalog.cumulativeGap} kWh</p>
                    <h2>Lösungsvorschläge mittels Erzeugungsanlagen</h2>
                    <Table pagination={{pageSize: 4}} size="small"
                           dataSource={store.masterdataStore.dashboardState.selectedActionCatalog.actions.filter((action) => !action.isStorage).slice()}
                           columns={[
                               {
                                   title: 'Name der Erzeugungsanlage',
                                   dataIndex: 'producerOrStorageId',
                                   key: 'producerOrStorageId',
                               },
                               {
                                   title: 'Lösungsvorschlag',
                                   dataIndex: 'actionType',
                                   key: 'actionType',
                                   render: (value) => {
                                       if (value === "PRODUCER_UP") {
                                           return "Erzeugungsanlage hochfahren"
                                       } else if (value === "PRODUCER_DOWN") {
                                           return "Erzeugungsanlage runterfahren"
                                       }
                                   }
                               },
                               {
                                   title: 'regelbare Energie',
                                   dataIndex: 'actionValue',
                                   key: 'actionValue',
                                   render: (value) => {
                                       return value + " kWh"
                                   }
                               }
                           ]}/>

                    <h2>Lösungsvorschläge mittels Speicheranlagen</h2>
                    <Table pagination={{pageSize: 4}} size="small"
                           dataSource={store.masterdataStore.dashboardState.selectedActionCatalog.actions.filter((action) => action.isStorage).slice()}
                           columns={[
                               {
                                   title: 'Name der Erzeugungsanlage',
                                   dataIndex: 'producerOrStorageId',
                                   key: 'producerOrStorageId',
                               },
                               {
                                   title: 'Lösungsvorschlag',
                                   dataIndex: 'actionType',
                                   key: 'actionType',
                                   render: (value) => {
                                       if (value === "STORAGE_LOAD") {
                                           return "Speicher aufladen"
                                       } else if (value === "STORAGE_UNLOAD") {
                                           return "Speicher entladen"
                                       }
                                   }
                               },
                               {
                                   title: 'regelbare Energie',
                                   dataIndex: 'actionValue',
                                   key: 'actionValue',
                                   render: (value) => {
                                       return value + " kWh"
                                   }
                               },
                               {
                                   title: 'verfügbare Ladezeit',
                                   dataIndex: 'hours',
                                   key: 'hours',
                                   render: (value) => {
                                       return value + " Stunden"
                                   }
                               }
                           ]}/>

                    <h2>Alternative Lösungsvorschläge</h2>
                    <p>Falls die zuvor genannten Lösungsvorschläge nicht ausreichend sind, können folgende Vorschläge
                        durchgeführt werden:</p>
                    {actionAlternatives()}
                </Modal>
            </div>
        );


    } else {
        return (
            <div className="app">
                <h1>Dashboard</h1>
                Es konnte kein virtuelles Kraftwerk geladen werden. Bitte erstellen Sie ein virtuelles Kraftwerk.
            </div>
        );
    }


});

export default DashboardComponent;
