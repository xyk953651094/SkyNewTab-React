import React from "react";
import {Button, Space} from "antd";
import {GiftOutlined, GithubOutlined, GitlabOutlined, NotificationOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
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

    render() {
        return (
            <Space>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                        href={"https://github.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    GitHub 产品主页
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                        href={"https://gitlab.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    GitLab 产品主页
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<NotificationOutlined/>}
                        href={"https://xyk953651094.blogspot.com/"} target={"_blank"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    博客
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GiftOutlined/>}
                        href={"https://afdian.net/a/xyk953651094/"} target={"_blank"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    捐助
                </Button>
            </Space>
        );
    }
}

export default PopupFooterComponent;