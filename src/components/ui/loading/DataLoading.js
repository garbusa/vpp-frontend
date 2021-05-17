import {Alert, Col, Row, Spin} from "antd";
import React from "react";

export const DataLoading = (props) => {
    return <Row style={{marginTop: 16}} type="flex" align="middle">
        <Col>
            <Alert description={<div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spin size="large" style={{display: 'inline-block', verticalAlign: 'middle'}}/>
                <p style={{
                    marginLeft: 8,
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginTop: 12
                }}>{props.message}</p>
            </div>}/>
        </Col>
    </Row>

};