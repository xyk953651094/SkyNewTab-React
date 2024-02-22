import React from "react";
import {Button, Col, Row, Space, Typography} from "antd";
import {GiftOutlined, NotificationOutlined} from "@ant-design/icons";
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
                <Col span={12}>
                    <Text style={{color: this.props.fontColor}}>{"菜单栏"}</Text>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Space>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<NotificationOutlined/>}
                                href={"https://xyk953651094.blogspot.com/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            博客
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GiftOutlined/>}
                                href={"https://afdian.net/a/xyk953651094"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            捐助
                        </Button>
                    </Space>
                </Col>
            </Row>
        );
    }
}

export default MenuHeaderComponent;