import React from "react";
import {Layout, Space, Button, message} from "antd";
import {DashboardOutlined, GithubOutlined, MessageOutlined, GiftOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {getComponentBackgroundColor, getFontColor} from "../typescripts/publicFunctions";
import PopupImageComponent from "../popupComponents/popupImageComponent";
import PopupStatusComponent from "../popupComponents/popupStatusComponent";

const {Header, Content, Footer} = Layout;
const $ = require("jquery")

type propType = {}

type stateType = {
    imageData: any,
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
            backgroundColor: "#ffffff",
            fontColor: "#000000"
        }
    }

    componentDidMount() {
        let imageData = localStorage.getItem("lastImage");
        if (imageData) {
            let tempImageData = JSON.parse(imageData);

            this.setState({
                imageData: tempImageData,
                backgroundColor: getComponentBackgroundColor(tempImageData.color),
                fontColor: getFontColor(getComponentBackgroundColor(tempImageData.color))
            },()=> {
                $("body").css({"backgroundColor": this.state.backgroundColor});
            });
        }
        else {
            message.error("暂无图片信息");
        }
    }

    render() {
        return (
            <Layout className={"popupLayout"} style={{backgroundColor: this.state.backgroundColor}}>
                <Header className={"popupHeader"}>
                    <Space align={"center"}>
                        <Button type="text" shape="round" icon={<DashboardOutlined />} style={{color: this.state.fontColor, cursor: "default"}}>
                            云开新标签页的仪表盘
                        </Button>
                    </Space>
                </Header>
                <Content className={"popupContent"}>
                    <Space direction={"vertical"}>
                        <PopupStatusComponent fontColor={this.state.fontColor} />
                        <PopupImageComponent imageData={this.state.imageData} fontColor={this.state.fontColor} />
                    </Space>
                </Content>
                <Footer className={"popupFooter"}>
                    <Space align={"center"}>
                        <Button type="text" shape="round" icon={<GithubOutlined />} href="https://github.com/xyk953651094" target="_blank" style={{color: this.state.fontColor}}>
                            主页
                        </Button>
                        <Button type="text" shape="round" icon={<MessageOutlined />} href="https://xyk953651094.blogspot.com" target="_blank" style={{color: this.state.fontColor}}>
                            博客
                        </Button>
                        <Button type="text" shape="round" icon={<GiftOutlined />} href="https://afdian.net/a/xyk953651094" target="_blank" style={{color: this.state.fontColor}}>
                            捐赠
                        </Button>
                    </Space>
                </Footer>
            </Layout>
        );
    }
}

export default PopupComponent;