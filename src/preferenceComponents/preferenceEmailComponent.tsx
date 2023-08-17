import React from "react";
import {Button, Card, Col, Row} from "antd";
import "../stylesheets/clockComponent.scss"
import {ExclamationCircleOutlined, InfoCircleOutlined, SendOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
}

type stateType = {}

interface PreferenceLinkComponent {
    state: stateType,
    props: propType
}

class PreferenceLinkComponent extends React.Component {
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
            <Card title={"联系作者"} size={"small"}
                  extra={<SendOutlined style={{color: this.props.fontColor}}/>}
                  style={{border: "1px solid " + this.props.fontColor}}
                  headStyle={{
                      backgroundColor: this.props.backgroundColor,
                      color: this.props.fontColor,
                      borderBottom: "2px solid " + this.props.fontColor
                  }}
                  bodyStyle={{backgroundColor: this.props.backgroundColor}}
            >
                <Row gutter={[0, 8]}>
                    <Col span="12">
                        <Button type={"text"} shape={"round"} icon={<InfoCircleOutlined/>}
                                href={"mailto:xyk953651094@qq.com?&subject=云开新标签页-功能建议"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            功能建议
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={"round"} icon={<ExclamationCircleOutlined/>}
                                href={"mailto:xyk953651094@qq.com?&subject=云开新标签页-问题反馈"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            问题反馈
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default PreferenceLinkComponent;