import React from "react";
import {Button, Col, Row, Typography} from "antd";
import {GiftOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const {Text} = Typography;

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceHeaderComponent {
    state: stateType,
    props: propType
}

class PreferenceHeaderComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row align={"middle"}>
                <Col span={12}>
                    <Text style={{color: this.props.fontColor}}>{"菜单栏"}</Text>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GiftOutlined/>}
                            href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                            onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                            onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                            style={{color: this.props.fontColor}}>
                        支持
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default PreferenceHeaderComponent;