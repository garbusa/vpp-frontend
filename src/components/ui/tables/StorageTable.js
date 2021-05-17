import {observer} from "mobx-react";
import {EditDeleteButtonGroup} from "../button-groups/EditDeleteButtonGroup";
import {Button, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";

export const StorageTable = observer((props) => {

    const {onOpenCreate, onOpenEdit, onDelete, combine, dppOrHouseholdId} = props;


    const storageColumns = [
        {
            title: 'Speicheranlagen',
            dataIndex: 'storageId',
            key: 'storageId',
        },
        {
            title: 'Aktionen',
            key: 'actions',
            render: (record) => (
                <EditDeleteButtonGroup
                    onEdit={onOpenEdit}
                    onDelete={onDelete}
                    id={record.storageId}
                />
            ),
        },
    ];

    return <div>
        <Table
            style={{marginTop: 16}}
            dataSource=
                {combine}

            columns={storageColumns}/>
        <Button onClick={(e) => onOpenCreate(dppOrHouseholdId)}
                type="primary"
                icon={<PlusOutlined/>}>
            Speicheranlage hinzufügen
        </Button>
    </div>
});
