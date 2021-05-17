import React from "react";
import {Spin} from "antd";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";

export const ServiceLoading = (props) => {
    const {servicesOnline} = props;
    const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

    if (!servicesOnline) {
        return <div
            style={
                {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 9999,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }
            }

        >
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", flexDirection: "column"
            }}>
                <Spin style={{display: "block", height: 50, width: 50}} size={"large"} indicator={antIcon}/>
                <h3>Derzeit sind nicht alle Dienste erreichbar. Bitte überprüfen Sie die einzelnen Dienste.</h3>
            </div>

        </div>;
    } else {
        return null;
    }

};