import {observer} from "mobx-react";
import {Button, Popconfirm, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React from "react";

export const EditDeleteButtonGroup = observer((props) => {
    const {onEdit, onDelete, id, type} = props;

    return (
        <div>
            <Space size="middle">
                <Button onClick={() => onEdit(id, type)} type="primary"
                        icon={<EditOutlined/>}/>
                <Popconfirm
                    title="Möchten Sie die Anlage wirklich löschen?"
                    onConfirm={() => (type !== null) ? onDelete(id, type) : onDelete(id)}
                    okText="Ja"
                    cancelText="Nein"
                >
                    <Button type="danger" icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </Space>
        </div>
    );
});