import React from "react";
import {Button, Layout, List, message, Space} from "antd";
import {DashboardOutlined, GiftOutlined, GithubOutlined, MessageOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {getFontColor, getReverseColor} from "../typescripts/publicFunctions";
import PopupImageComponent from "../popupComponents/popupImageComponent";
import PopupStatusComponent from "../popupComponents/popupStatusComponent";
import PopupFooterComponent from "../popupComponents/popupFooterComponent";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import {defaultPreferenceData} from "../typescripts/publicConstants";

const {Header, Content, Footer} = Layout;
const $ = require("jquery")

type propType = {}

type stateType = {
    imageData: any,
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

interface PopupComponent {
    state: stateType,
    props: propType,
}

class PopupComponent extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            imageData: null,
            hoverColor: "#000000",
            backgroundColor: "#ffffff",
            fontColor: "#000000",
            preferenceData: defaultPreferenceData,
        }
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.state.hoverColor;
        e.currentTarget.style.color = getFontColor(this.state.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.state.fontColor;
    }

    componentDidMount() {
        let imageData = localStorage.getItem("lastImage");
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (imageData) {
            let tempImageData = JSON.parse(imageData);

            this.setState({
                imageData: tempImageData,
                hoverColor: tempImageData.color,
                backgroundColor: getReverseColor(tempImageData.color),
                fontColor: getFontColor(getReverseColor(tempImageData.color)),
                preferenceData: tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData),
            }, () => {
                $("body").css({"backgroundColor": this.state.backgroundColor});
            });
        } else {
            message.error("暂无图片信息");
        }

        // 修改各类弹窗样式
        $("body").bind("DOMNodeInserted", () => {
            // messgae
            let messageEle = $(".ant-message");
            if (messageEle.length && messageEle.length > 0) {
                $(".ant-message-notice-content").css({
                    "backgroundColor": this.state.hoverColor,
                    "color": getFontColor(this.state.hoverColor)
                });
                $(".ant-message-custom-content > .anticon").css("color", getFontColor(this.state.hoverColor));
            }

            // $(".ant-list-item").css("borderBlockEndColor", this.state.fontColor);
        })
    }

    render() {
        return (
            <Layout className={"popupLayout"} style={{backgroundColor: this.state.backgroundColor}}>
                <Header className={"popupHeader"}>
                    <Space align={"center"}>
                        <Button type={"text"} shape={"round"} icon={<DashboardOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.state.fontColor, cursor: "default"}}>
                            云开新标签页的仪表盘
                        </Button>
                    </Space>
                </Header>
                <Content className={"popupContent"}>
                    <List>
                        <List.Item style={{borderBlockEndColor: this.state.fontColor}}>
                            <PopupStatusComponent imageData={this.state.imageData} fontColor={this.state.fontColor}
                                                  preferenceData={this.state.preferenceData}/>
                        </List.Item>
                        <List.Item>
                            <PopupImageComponent imageData={this.state.imageData} fontColor={this.state.fontColor}
                                                 preferenceData={this.state.preferenceData}/>
                        </List.Item>
                    </List>
                </Content>
                <Footer className={"popupFooter"}>
                    <PopupFooterComponent  hoverColor={this.state.hoverColor}
                                           backgroundColor={this.state.backgroundColor}
                                           fontColor={this.state.fontColor}/>
                </Footer>
            </Layout>
        );
    }
}

export default PopupComponent;