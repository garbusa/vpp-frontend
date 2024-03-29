import {Steps} from "antd";
import React from "react";

/**
 * Diese Komponente bildet den aktuellen Schritt während des Hinzufügens eines VK
 * @param props
 * @returns {*}
 * @constructor
 */
export const CreateStepComponent = (props) => {
    const {Step} = Steps;
    return (
        <Steps style={{width: 1000, marginLeft: "auto", marginRight: "auto"}} size="small" current={props.currentStep}>
            <Step title="Prozess starten"/>
            <Step title="Dez. Kraftwerke"/>
            <Step title="Haushalte"/>
            <Step title="Anlagen und Bearbeitung"/>
        </Steps>
    );
};