import React from "react";
import {Layout, List, message} from "antd";
import "../stylesheets/popupComponent.scss"
import {getFontColor, getPreferenceDataStorage, getReverseColor, setThemeColor} from "../typescripts/publicFunctions";
import PopupImageComponent from "../popupComponents/popupImageComponent";
import PopupStatusComponent from "../popupComponents/popupStatusComponent";
import PopupFooterComponent from "../popupComponents/popupFooterComponent";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import PopupHeaderComponent from "../popupComponents/popupHeaderComponent";
import $ from "jquery";

const {Header, Content, Footer} = Layout;


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
            preferenceData: getPreferenceDataStorage(),
        }
    }

    componentDidMount() {
        const bodyEle = $("body");
        if (this.state.preferenceData.noImageMode) {
            const tempThemeColor = setThemeColor();
            this.setState({
                hoverColor: tempThemeColor.componentBackgroundColor,
                backgroundColor: tempThemeColor.themeColor,
                fontColor: getFontColor(tempThemeColor.themeColor),
            })
        } else {
            let imageData = localStorage.getItem("lastImage");
            if (imageData) {
                const tempImageData = JSON.parse(imageData);
                this.setState({
                    imageData: tempImageData,
                    hoverColor: getReverseColor(tempImageData.color),
                    backgroundColor: tempImageData.color,
                    fontColor: getFontColor(tempImageData.color),
                }, () => {
                    bodyEle.css({"backgroundColor": this.state.backgroundColor});
                });
            } else {
                message.error("暂无图片信息");
            }
        }

        // 修改各类弹窗样式
        bodyEle.bind("DOMNodeInserted", () => {
            // message
            let messageEle = $(".ant-message");
            if (messageEle.length && messageEle.length > 0) {
                $(".ant-message-notice-content").css({
                    "backgroundColor": this.state.hoverColor,
                    "color": getFontColor(this.state.hoverColor)
                });
                $(".ant-message-custom-content > .anticon").css("color", getFontColor(this.state.hoverColor));
            }
        })
    }

    render() {
        return (
            <Layout className={"popupLayout"} style={{backgroundColor: this.state.backgroundColor}}>
                <Header className={"popupHeader"}>
                    <PopupHeaderComponent
                        hoverColor={this.state.hoverColor}
                        fontColor={this.state.fontColor}
                        preferenceData={this.state.preferenceData}
                    />
                </Header>
                <Content className={"popupContent"}>
                    <List>
                        <List.Item className={"alignCenter"} style={{borderBlockEndColor: this.state.fontColor}}>
                            <PopupStatusComponent
                                imageData={this.state.imageData}
                                hoverColor={this.state.hoverColor}
                                fontColor={this.state.fontColor}
                                preferenceData={this.state.preferenceData}
                            />
                        </List.Item>
                        <List.Item className={"alignCenter"}>
                            <PopupImageComponent
                                imageData={this.state.imageData}
                                hoverColor={this.state.hoverColor}
                                fontColor={this.state.fontColor}
                                preferenceData={this.state.preferenceData}
                            />
                        </List.Item>
                    </List>
                </Content>
                <Footer className={"popupFooter"}>
                    <PopupFooterComponent
                        hoverColor={this.state.hoverColor}
                        fontColor={this.state.fontColor}
                        preferenceData={this.state.preferenceData}
                    />
                </Footer>
            </Layout>
        );
    }
}

export default PopupComponent;