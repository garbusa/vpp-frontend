import {Button, Modal, Table} from "antd";
import React, {useContext} from "react";
import {RootStoreContext} from "../../../../store/RootStore";
import {observer} from "mobx-react";

/**
 * Diese Komponente bildet einen Handlungsmaßnahmenkatalog ab
 * @type {function(*): *}
 */
export const ActionRequestCatalogModal = observer(() => {
    const vppStore = useContext(RootStoreContext).vppStore;

    const onCloseActionCatalog = () => {
        vppStore.dashboardState.isViewingActionCatalog = false;
        vppStore.dashboardState.selectedActionCatalog = {
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

    const ActionAlternatives = () => {
        if (vppStore.dashboardState.selectedActionCatalog) {
            if (vppStore.dashboardState.selectedActionCatalog.problemType === "OVERFLOW") {
                return <div>
                    <ul>
                        <li>Einspeisung des durchschnittlichen Überschusses ins öffentliche Netz</li>
                        <li>Hinzuschalten neuer Speicheranlagen</li>
                    </ul>
                    <p style={{fontSize: 10}}>*aktuelle Manipulation wird nicht berücksichtigt</p>
                </div>

            } else if (vppStore.dashboardState.selectedActionCatalog.problemType === "SHORTAGE") {
                return <div>
                    <ul>
                        <li>Abspeisung der durchschnittlich benötigten Energie aus dem öffentlichen Netz</li>
                        <li>Hinzuschalten neuer Erzeugungsanlagen</li>
                    </ul>

                    <p style={{fontSize: 10}}>*aktuelle Manipulation wird nicht berücksichtigt</p>
                </div>
            }
        }
    };

    const getProblemType = (type) => {
        if (type === "SHORTAGE") {
            return "Energieengpass";
        } else if (type === "OVERFLOW") {
            return "Energieüberschuss";
        } else {
            return null;
        }
    };

    return (<Modal
        closable={false}
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
                Handlungsempfehlungskatalog
            </div>
        }
        visible={vppStore.dashboardState.isViewingActionCatalog}
        footer={[
            <Button key="back" onClick={onCloseActionCatalog}>
                Abbrechen
            </Button>
        ]}
    >
        <p>Zeitraum: {timestampToLocalString(vppStore.dashboardState.selectedActionCatalog.startTimestamp)} bis {timestampToLocalString(vppStore.dashboardState.selectedActionCatalog.endTimestamp)}</p>
        <p>Art des Problems: {getProblemType(vppStore.dashboardState.selectedActionCatalog.problemType)}</p>
        <p>Durchschnittliche
            Energielücke: {vppStore.dashboardState.selectedActionCatalog.averageGap} kW</p>
        <h2>Lösungsvorschläge mittels Erzeugungsanlagen</h2>
        <Table pagination={{pageSize: 4}} size="small"
               dataSource={vppStore.dashboardState.selectedActionCatalog.actions.filter((action) => !action.isStorage).slice()}
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
                           return value + " kW"
                       }
                   }
               ]}/>

        <h2>Lösungsvorschläge mittels Speicheranlagen</h2>
        <Table pagination={{pageSize: 4}} size="small"
               dataSource={vppStore.dashboardState.selectedActionCatalog.actions.filter((action) => action.isStorage).slice()}
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
                           return value + " kW"
                       }
                   },
                   {
                       title: 'verfügbare Ladezeit',
                       dataIndex: 'hours',
                       key: 'hours',
                       render: (value) => {
                           return value + " Stunden*"
                       }
                   }
               ]}/>

        <h2>Alternative Lösungsvorschläge</h2>
        <p>Falls die zuvor genannten Lösungsvorschläge nicht ausreichend sind, können Sie folgende Vorschläge
            durchführen:</p>
        {ActionAlternatives()}
    </Modal>);
});