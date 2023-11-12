import React from "react";

import GreetComponent from "./components/greetComponent";
import WeatherComponent from "./components/weatherComponent";
import DailyComponent from "./components/dailyComponent";
import TodoComponent from "./components/todoComponent";
import PreferenceComponent from "./components/preferenceComponent";
import WallpaperComponent from "./components/wallpaperComponent";
import ClockComponent from "./components/clockComponent";
import SearchComponent from "./components/searchComponent";
import CollectionComponent from "./components/collectionComponent";
import AuthorComponent from "./components/authorComponent";
import AuthorLiteComponent from "./components/authorLiteComponent"

import {Col, Layout, notification, Row, Space, Typography} from "antd";
import "./stylesheets/publicStyles.scss"
import {
    changeThemeColor,
    getFontColor,
    getPreferenceDataStorage,
    getReverseColor,
    setColorTheme
} from "./typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "./typescripts/publicInterface";
import ImageHistoryComponent from "./components/imageHistoryComponent";
import $ from "jquery";

const {Header, Content, Footer} = Layout;
const {Text, Link} = Typography;

type propType = {}

type stateType = {
    themeColor: ThemeColorInterface,

    imageData: any,
    imageHistory: any,
    preferenceData: PreferenceDataInterface,
    componentDisplay: "none" | "block",
}

interface App {
    state: stateType,
    props: propType
}

class App extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            themeColor: {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": "",
            },

            imageData: null,
            imageHistory: [],
            preferenceData: getPreferenceDataStorage(),  // 加载偏好设置
            componentDisplay: "none"
        }
    }

    getImageData(imageData: any) {
        this.setState({
            imageData: imageData,
            componentDisplay: "block"
        }, () => {
            // 修改主题颜色
            if (imageData.color !== null) {
                let bodyBackgroundColor = imageData.color;
                let bodyFontColor = getFontColor(bodyBackgroundColor);
                changeThemeColor("body", bodyBackgroundColor, bodyFontColor);

                let componentBackgroundColor = getReverseColor(imageData.color);
                let componentFontColor = getFontColor(componentBackgroundColor);
                this.setState({
                    themeColor: {
                        "themeColor": imageData.color,
                        "componentBackgroundColor": componentBackgroundColor,
                        "componentFontColor": componentFontColor,
                    },
                })
            }
        })
    }

    getImageHistory(value: any) {
        this.setState({
            imageHistory: value
        })
    }

    getPreferenceData(value: PreferenceDataInterface) {
        this.setState({
            preferenceData: value
        })
    }

    componentDidMount() {
        // 未加载图片前随机设置颜色主题
        if (this.state.themeColor.themeColor === "") {
            this.setState({
                themeColor: setColorTheme()
            })
        }

        // 版本号提醒
        let storageVersion = localStorage.getItem("SkyNewTabReactVersion");
        let currentVersion = require('../package.json').version;
        if (storageVersion !== currentVersion) {
            notification.info({
                message: "已更新至 " + currentVersion,
                description: "详情请前往 GitHub 或 GitLab 查看",
                placement: "bottomLeft",
                duration: 5,
                closeIcon: false
            });
            localStorage.setItem("SkyNewTabReactVersion", currentVersion);
        }

        // 修改各类弹窗样式
        $("body").bind("DOMNodeInserted", () => {
            // 通用
            $(".ant-list-item").css({
                "borderBlockEndColor": this.state.themeColor.componentFontColor,
                "padding": "10px, 0"
            });
            $(".ant-list-item-meta-title").css("color", this.state.themeColor.componentFontColor);
            $(".ant-list-item-meta-description").css("color", this.state.themeColor.componentFontColor);
            $(".ant-list-item-action").css("marginInlineStart", "0");
            $(".ant-empty-description").css("color", this.state.themeColor.componentFontColor);
            $(".ant-alert").css("padding", "10px");
            $("div.ant-typography").css("margin-bottom", "0");
            $("ol").css("margin-bottom", "0");

            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-popover-inner-content").css("color", this.state.themeColor.componentFontColor);
            }

            // toolTip
            let toolTipEle = $(".ant-tooltip");
            if (toolTipEle.length && toolTipEle.length > 0) {
                $(".ant-tooltip-inner").css("color", this.state.themeColor.componentFontColor);
            }

            // message
            let messageEle = $(".ant-message");
            if (messageEle.length && messageEle.length > 0) {
                $(".ant-message-notice-content").css({
                    "backgroundColor": this.state.themeColor.componentBackgroundColor,
                    "color": this.state.themeColor.componentFontColor
                });
                $(".ant-message-custom-content > .anticon").css("color", this.state.themeColor.componentFontColor);
            }

            // notification
            let notificationEle = $(".ant-notification");
            if (notificationEle.length && notificationEle.length > 0) {
                $(".ant-notification-notice").css({"backgroundColor": this.state.themeColor.componentBackgroundColor,});
                $(".ant-notification-notice-icon").css("color", this.state.themeColor.componentFontColor);
                $(".ant-notification-notice-message").css("color", this.state.themeColor.componentFontColor);
                $(".ant-notification-notice-description").css("color", this.state.themeColor.componentFontColor);
            }

            // drawer
            let drawerEle = $(".ant-drawer");
            if (drawerEle.length && drawerEle.length > 0) {
                $(".ant-drawer-close").css("color", this.state.themeColor.componentFontColor);
                $(".ant-drawer-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-form-item-label > label").css("color", this.state.themeColor.componentFontColor);
                $(".ant-form-item-extra").css("color", this.state.themeColor.componentFontColor);
                $(".ant-radio-wrapper").children(":last-child").css("color", this.state.themeColor.componentFontColor);
                $(".ant-checkbox-wrapper").children(":last-child").css("color", this.state.themeColor.componentFontColor);
                $(".ant-collapse").css("backgroundColor", this.state.themeColor.componentBackgroundColor);
                $(".ant-collapse-header").css("color", this.state.themeColor.componentFontColor);
            }

            // modal
            let modalEle = $(".ant-modal");
            if (modalEle.length && modalEle.length > 0) {
                $(".ant-modal-content").css("backgroundColor", this.state.themeColor.componentBackgroundColor);
                $(".ant-modal-title").css({
                    "backgroundColor": this.state.themeColor.componentBackgroundColor,
                    "color": this.state.themeColor.componentFontColor
                });
                $(".ant-form-item-label > label").css("color", this.state.themeColor.componentFontColor);
                $(".ant-modal-footer > .ant-btn").css("color", this.state.themeColor.componentFontColor);
                if (this.state.preferenceData.buttonShape === "round") {
                    $(".ant-modal-footer > .ant-btn").removeClass("ant-btn-default ant-btn-primary").addClass("ant-btn-round ant-btn-text");
                } else {
                    $(".ant-modal-footer > .ant-btn").removeClass("ant-btn-round ant-btn-default ant-btn-primary").addClass("ant-btn-text");
                }

                $(".ant-modal-footer > .ant-btn").on("mouseover", (e: any) => {
                    e.currentTarget.style.backgroundColor = this.state.themeColor.themeColor;
                    e.currentTarget.style.color = getFontColor(this.state.themeColor.themeColor);
                });
                $(".ant-modal-footer > .ant-btn").on("mouseout", (e: any) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = this.state.themeColor.componentFontColor;
                });
            }
        });
    }

    render() {
        return (
            <Layout>
                <Header id={"header"} className={"zIndexMiddle"}>
                    <Row justify="center">
                        <Col xs={0} sm={0} md={0} lg={10} xl={10} xxl={10}>
                            <Space>
                                <GreetComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                />
                                <WeatherComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                />
                            </Space>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={10} xl={10} xxl={10} style={{textAlign: "right"}}>
                            <Space>
                                <DailyComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                />
                                <TodoComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                />
                                <PreferenceComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                    getPreferenceData={this.getPreferenceData.bind(this)}
                                />
                            </Space>
                        </Col>
                        <Col xs={22} sm={22} md={22} lg={0} xl={0} xxl={0} style={{textAlign: "right"}}>
                            <Space align={"center"}>
                                <AuthorLiteComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                    imageData={this.state.imageData}
                                    preferenceData={this.state.preferenceData}
                                />
                                <PreferenceComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                    getPreferenceData={this.getPreferenceData.bind(this)}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content id={"content"} className={"alignCenter"}>
                    <WallpaperComponent
                        getImageData={this.getImageData.bind(this)}
                        getImageHistory={this.getImageHistory.bind(this)}
                    />
                    <Space direction={"vertical"} align={"center"}>
                        <ClockComponent themeColor={this.state.themeColor}/>
                        <SearchComponent themeColor={this.state.themeColor} preferenceData={this.state.preferenceData}/>
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                            <CollectionComponent
                                themeColor={this.state.themeColor}
                                preferenceData={this.state.preferenceData}
                            />
                        </Col>
                    </Space>
                </Content>
                <Footer id={"footer"}>
                    <Row justify="center">
                        <Col xs={0} sm={0} md={0} lg={20} xl={20} style={{textAlign: "right"}}>
                            <Space align={"center"}>
                                <AuthorComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                    imageData={this.state.imageData}
                                    preferenceData={this.state.preferenceData}
                                />
                                <ImageHistoryComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                    imageHistory={this.state.imageHistory}
                                    preferenceData={this.state.preferenceData}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        );
    }
}

export default App;
