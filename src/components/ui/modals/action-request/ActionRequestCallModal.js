import {Button, Modal, Table} from "antd";
import React, {useContext} from "react";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";

/**
 * In dieser Komponente können bestehende Maßnahmenabfragen eingesehen und abgerufen werden
 * @type {function(): *}
 */
export const ActionRequestCallModal = observer(() => {
    const vppStore = useContext(RootStoreContext).vppStore;

    const columns = [
        {
            title: 'Name der Maßnahmenabfrage',
            dataIndex: 'actionRequestId',
        },
        {
            title: 'Name des virtuellen Kraftwerks',
            dataIndex: 'virtualPowerPlantId',
        },
        {
            title: 'Zeitstempel',
            dataIndex: 'timestamp',
            render: (record) => {
                Date.prototype.addHours = function (h) {
                    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
                    return this;
                };
                let date = new Date(0);
                date.setSeconds(record, 0);
                date.addHours(1);
                return <p>{date.toLocaleString()}</p>
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
        }, {
            title: 'Aktueller Status',
            dataIndex: 'status',
        },
    ];


    const cancelLoadRequest = () => {
        vppStore.dashboardState.selectedActionRequestId = undefined;
        vppStore.dashboardState.selectedActionRequest = undefined;
        vppStore.dashboardState.isLoadingRequest = false;
        vppStore.resetSelectedActionRequests();
    };

    const acceptLoadRequest = () => {
        //do new request here
        if (vppStore.dashboardState.selectedActionRequestId) {
            fetchActionRequest();
            let refreshId = setInterval(function () {
                if (vppStore.dashboardState.selectedActionRequest) {
                    fetchActionRequest();
                    if (vppStore.dashboardState.selectedActionRequest.status === "FINISHED" ||
                        vppStore.dashboardState.selectedActionRequest.status === "FAILED") {
                        console.log("stop re-fetching actionRequest");
                        clearInterval(refreshId);
                    }
                }
            }, 5000);
        }
        vppStore.dashboardState.isLoadingOrAddingRequest = false;
        vppStore.dashboardState.isLoadingRequest = false;
        vppStore.resetSelectedActionRequests();
    };

    const fetchActionRequest = () => {
        vppStore.getActionRequestById(vppStore.dashboardState.selectedActionRequestId).then(
            (result) => {
                if (result.success) {
                    vppStore.getAllLoadsByActionRequestId(vppStore.dashboardState.selectedActionRequest.actionRequestId).then((response) => {
                        if (response.success) {
                            let labels = [];
                            let data = [];
                            vppStore.dashboardState.loads.map(load => {
                                let loadSum = 0;
                                load.households.map(household => {
                                    loadSum = loadSum + household.loadValue;
                                });
                                let d = new Date(0);
                                d.setUTCSeconds(load.startTimestamp);
                                labels.push(d.toLocaleTimeString());
                                data.push(((loadSum / 1000) < 0.) ? 0. : loadSum / 1000); // watt into kw
                            });
                            vppStore.setLoadsLabels(labels);
                            vppStore.setLoadsDataset(data);
                        }
                        vppStore.getAllProductionsByActionRequestId(vppStore.dashboardState.selectedActionRequest.actionRequestId).then((response) => {
                            if (response.success) {
                                let labels = [];
                                let data = [];
                                vppStore.dashboardState.productions.map(production => {

                                    let producerSum = 0;
                                    production.producers.map(producer => {
                                        producerSum = producerSum + producer.currentValue;
                                    });
                                    let d = new Date(0);
                                    d.setUTCSeconds(production.startTimestamp);
                                    labels.push(d.toLocaleTimeString());
                                    data.push((producerSum < 0.) ? 0. : producerSum);
                                });
                                vppStore.setProductionsLabels(labels);
                                vppStore.setProductionsDataset(data);
                            }
                        })
                    });
                }
            }
        );
    };

    const rowSelection = {
        selectedRowKeys: vppStore.dashboardState.selectedActionRequestKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            vppStore.dashboardState.selectedActionRequestKeys = selectedRowKeys;
            if (selectedRows.length === 1) {
                vppStore.dashboardState.selectedActionRequestId = selectedRows[0].actionRequestId;
            }

        },

    };


    return (<Modal
        destroyOnClose={true}
        closable={false}
        title="Maßnahmenabfrage aufrufen"
        visible={vppStore.dashboardState.isLoadingOrAddingRequest && vppStore.dashboardState.isLoadingRequest}
        footer={[
            <Button key="submit" type="primary" onClick={acceptLoadRequest}>
                Abrufen
            </Button>,
            <Button key="back" onClick={cancelLoadRequest}>
                Abbrechen
            </Button>
        ]}
        width={1000}
    >
        <p>Bitte wähle Sie eine Maßnahmenabfrage aus: </p>
        <Table
            rowSelection={{
                type: "radio",
                ...rowSelection,
            }}
            columns={columns}
            pagination={{pageSize: 4}}
            dataSource={vppStore.dashboardState.actionRequestsByVpp.slice()}
        />
    </Modal>);
});