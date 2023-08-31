import React from "react";
import {Avatar, Button, Card, Col, Row, Space} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
}

type stateType = {}

interface PreferenceInfoComponent {
    state: stateType,
    props: propType
}

class PreferenceInfoComponent extends React.Component {
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
            <Card title={"产品信息"} size={"small"}
                  extra={<InfoCircleOutlined style={{color: this.props.fontColor}}/>}
                  style={{border: "1px solid " + this.props.fontColor}}
                  headStyle={{
                      backgroundColor: this.props.backgroundColor,
                      color: this.props.fontColor,
                      borderBottom: "2px solid " + this.props.fontColor
                  }}
                  bodyStyle={{backgroundColor: this.props.backgroundColor}}
            >
                <Space direction={"vertical"}>
                    <Button type={"text"} shape={"round"} icon={<InfoCircleOutlined/>}
                            href={"https://www.mxnzp.com"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            className={"poemFont"} style={{color: this.props.fontColor}}>
                        {"节气来源：https://www.mxnzp.com"}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<InfoCircleOutlined/>}
                            href={"https://www.jinrishici.com"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            className={"poemFont"} style={{color: this.props.fontColor}}>
                        {"天气来源：https://www.jinrishici.com"}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<InfoCircleOutlined/>}
                            href={"https://www.jinrishici.com"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            className={"poemFont"} style={{color: this.props.fontColor}}>
                        {"诗词来源：https://www.jinrishici.com"}
                    </Button>
                </Space>
            </Card>
        );
    }
}

export default PreferenceInfoComponent;