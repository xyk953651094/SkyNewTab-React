import React from "react";
import {Button, Layout, message, Space} from "antd";
import {DashboardOutlined, GiftOutlined, GithubOutlined, MessageOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {getFontColor, getReverseColor} from "../typescripts/publicFunctions";
import PopupImageComponent from "../popupComponents/popupImageComponent";
import PopupStatusComponent from "../popupComponents/popupStatusComponent";

const {Header, Content, Footer} = Layout;
const $ = require("jquery")

type propType = {}

type stateType = {
    imageData: any,
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
}

interface PopupComponent {
    state: stateType,
    props: propType
}

class PopupComponent extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            imageData: null,
            hoverColor: "#000000",
            backgroundColor: "#ffffff",
            fontColor: "#000000"
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
        if (imageData) {
            let tempImageData = JSON.parse(imageData);

            this.setState({
                imageData: tempImageData,
                hoverColor: tempImageData.color,
                backgroundColor: getReverseColor(tempImageData.color),
                fontColor: getFontColor(getReverseColor(tempImageData.color))
            }, () => {
                $("body").css({"backgroundColor": this.state.backgroundColor});
            });
        } else {
            message.error("暂无图片信息");
        }
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
                    <Space direction={"vertical"}>
                        <PopupStatusComponent imageData={this.state.imageData} fontColor={this.state.fontColor}/>
                        <PopupImageComponent imageData={this.state.imageData} fontColor={this.state.fontColor}/>
                    </Space>
                </Content>
                <Footer className={"popupFooter"}>
                    <Space align={"center"}>
                        <Button type={"text"} shape={"round"} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.state.fontColor}}>
                            主页
                        </Button>
                        <Button type={"text"} shape={"round"} icon={<MessageOutlined/>}
                                href={"https://xyk953651094.blogspot.com"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.state.fontColor}}>
                            博客
                        </Button>
                        <Button type={"text"} shape={"round"} icon={<GiftOutlined/>}
                                href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.state.fontColor}}>
                            捐赠
                        </Button>
                    </Space>
                </Footer>
            </Layout>
        );
    }
}

export default PopupComponent;