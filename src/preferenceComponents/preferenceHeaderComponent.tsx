import React from "react";
import {Row, Col, Space, Typography, Button} from "antd";
import {GiftOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;

type propType = {
    hoverColor: string,
    fontColor: string,
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

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.props.hoverColor;
        e.currentTarget.style.color = getFontColor(this.props.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.props.fontColor;
    }

    render() {
        return (
            <Row align={"middle"}>
                <Col span={12}>
                    <Text style={{color: this.props.fontColor}}>{"菜单栏"}</Text>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Button type={"text"} shape={"round"} icon={<GiftOutlined/>}
                            href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            style={{color: this.props.fontColor}}>
                        支持
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default PreferenceHeaderComponent;