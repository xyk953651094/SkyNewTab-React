import React from "react";
import {Button, Space} from "antd";
import {GithubOutlined, GitlabOutlined, NotificationOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceFooterComponent {
    state: stateType,
    props: propType
}

class PreferenceFooterComponent extends React.Component {
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
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                        href={"https://github.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.props.fontColor}}>
                    GitHub
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                        href={"https://gitlab.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.props.fontColor}}>
                    GitLab
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<NotificationOutlined/>}
                        href={"https://xyk953651094.blogspot.com/"} target={"_blank"}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.props.fontColor}}>
                    博客
                </Button>
            </Space>
        );
    }
}

export default PreferenceFooterComponent;