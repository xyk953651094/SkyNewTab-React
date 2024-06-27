import React from "react";
import {Button, Col, Row, Space, Typography} from "antd";
import {GiftOutlined, WechatOutlined} from "@ant-design/icons";
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
                    <Space>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape === "round" ? "circle" : this.props.preferenceData.buttonShape}
                                icon={<WechatOutlined />}
                                href={"https://github.com/xyk953651094/xyk953651094/assets/28004442/fd605f5c-d2ca-43eb-ae16-86d17d5f6fb1/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape === "round" ? "circle" : this.props.preferenceData.buttonShape}
                                icon={<i className="bi bi-rss-fill"></i>}
                                href={"https://xyk953651094.blogspot.com/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                        </Button>
                    </Space>
                </Col>
            </Row>
        );
    }
}

export default MenuHeaderComponent;