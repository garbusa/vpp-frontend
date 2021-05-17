import {observer} from "mobx-react";
import {EditDeleteButtonGroup} from "../button-groups/EditDeleteButtonGroup";
import {Button, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";

export const ProducerTable = observer((props) => {

    const {onOpenCreate, onOpenEdit, onDelete, combine, dppOrHouseholdId} = props;

    const producerColumns = [
            {
                title: 'Erzeugungsanlagen',
                dataIndex: 'producerId',
                key: 'producerId',
            },
            {
                title: 'Typ',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Aktionen',
                key: 'actions',
                render: (record) => (
                    <EditDeleteButtonGroup
                        onEdit={onOpenEdit}
                        onDelete={onDelete}
                        id={record.producerId}
                        type={record.type}
                    />

                ),
            },
        ]
    ;

    return <div>
        <Table
            style={{marginTop: 16}}
            dataSource=
                {combine}
            columns={producerColumns}/>
        <Button onClick={() => onOpenCreate(dppOrHouseholdId)}
                type="primary"
                icon={<PlusOutlined/>}>
            Erzeugungsanlage hinzufügen
        </Button>
    </div>
});
