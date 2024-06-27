import React from "react";
import {Button, Space} from "antd";
import {GiftOutlined, GithubOutlined, GitlabOutlined, WechatOutlined} from "@ant-design/icons";
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
                    产品主页
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                        href={"https://gitlab.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    产品主页
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<WechatOutlined />}
                        href={"https://github.com/xyk953651094/xyk953651094/assets/28004442/fd605f5c-d2ca-43eb-ae16-86d17d5f6fb1/"} target={"_blank"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    公众号
                </Button>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<i className="bi bi-rss-fill"></i>}
                        href={"https://xyk953651094.blogspot.com/"} target={"_blank"}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor}}>
                    博客
                </Button>
            </Space>
        );
    }
}

export default PopupFooterComponent;