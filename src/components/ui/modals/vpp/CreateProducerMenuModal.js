import {Button, Modal} from "antd";
import React from "react";
import {observer} from "mobx-react";

export const CreateProducerMenuModal = observer((props) => {
    const {visible, onOpenWater, onOpenWind, onOpenSolar, onOpenOther, onCancel} = props;

    return (
        <Modal
            closable={false}
            destroyOnClose={true}
            title="Erzeugungsanlage hinzufügen"
            visible={visible}
            footer={[
                <Button key="submit" type="primary" onClick={onOpenWater}>
                    Wasser
                </Button>,
                <Button type="primary" onClick={onOpenWind}>
                    Wind
                </Button>,
                <Button type="primary" onClick={onOpenSolar}>
                    Solar
                </Button>,
                <Button type="primary" onClick={onOpenOther}>
                    Sonstige
                </Button>,
                <Button key="back" onClick={onCancel}>
                    Abbrechen
                </Button>
            ]}
        >
            <p>Bitte wählen Sie die Art der Anlage aus, die Sie hinzufügen möchten.</p>
        </Modal>
    );
});