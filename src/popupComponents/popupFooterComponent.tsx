import React from "react";
import {Button, Space} from "antd";
import {GiftOutlined, GithubOutlined, MessageOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

type propType = {
    hoverColor: string,
    fontColor: string,
}

type stateType = {}

interface PopupFooterComponent {
    state: stateType,
    props: propType
}

class PopupFooterComponent extends React.Component {
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
            <Space>
                <Button type={"text"} shape={"round"} icon={<GithubOutlined/>}
                        href={"https://github.com/xyk953651094"} target={"_blank"}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.props.fontColor}}>
                    主页
                </Button>
                <Button type={"text"} shape={"round"} icon={<MessageOutlined/>}
                        href={"https://xyk953651094.blogspot.com"} target={"_blank"}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.props.fontColor}}>
                    博客
                </Button>
                <Button type={"text"} shape={"round"} icon={<GiftOutlined/>}
                        href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.props.fontColor}}>
                    支持
                </Button>
            </Space>
        );
    }
}

export default PopupFooterComponent;