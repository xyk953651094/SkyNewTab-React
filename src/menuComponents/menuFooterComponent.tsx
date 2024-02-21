import React from "react";
import {Button, Space} from "antd";
import {GithubOutlined, GitlabOutlined, NotificationOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface MenuFooterComponent {
    state: stateType,
    props: propType
}

class MenuFooterComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Space>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                        href={"https://github.com/xyk953651094/SkyNewTab-React/"} target={"_self"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    GitHub
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                        href={"https://gitlab.com/xyk953651094/SkyNewTab-React/"} target={"_self"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    GitLab
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<NotificationOutlined/>}
                        href={"https://xyk953651094.blogspot.com/"} target={"_self"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    Blogger
                </Button>
            </Space>
        );
    }
}

export default MenuFooterComponent;