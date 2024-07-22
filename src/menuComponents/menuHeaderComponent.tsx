import React from "react";
import {Button, Col, Row, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const {Text} = Typography;

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface MenuHeaderComponent {
    state: stateType,
    props: propType
}

class MenuHeaderComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row align={"middle"}>
                <Col span={6}>
                    <Text style={{color: this.props.fontColor}}>{"菜单栏"}</Text>
                </Col>
                <Col span={18} style={{textAlign: "right"}}>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                            icon={<InfoCircleOutlined />}
                            onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                            onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                            style={{color: this.props.fontColor, cursor: "default"}}>
                        {"版本：V" + require('../../package.json').version}
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default MenuHeaderComponent;