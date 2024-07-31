import React from "react";

import GreetComponent from "./components/greetComponent";
import WeatherComponent from "./components/weatherComponent";
import DailyComponent from "./components/dailyComponent";
import TodoComponent from "./components/todoComponent";
import LinkComponent from "./components/linkComponent"
import MenuComponent from "./components/menuComponent";
import WallpaperComponent from "./components/wallpaperComponent";
import ClockComponent from "./components/clockComponent";
import SearchComponent from "./components/searchComponent";
import CollectionComponent from "./components/collectionComponent";
import AuthorComponent from "./components/authorComponent";
import HistoryComponent from "./components/historyComponent";

import {Col, Layout, notification, Row, Space } from "antd";
import "./stylesheets/publicStyles.scss"
import {
    changeThemeColor,
    getFontColor,
    getImageHistoryStorage,
    getPreferenceDataStorage,
    getReverseColor, resetCheckboxColor, resetRadioColor, resetSwitchColor,
    setThemeColor
} from "./typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "./typescripts/publicInterface";

import $ from "jquery";
import {imageTopics} from "./typescripts/publicConstants";
import FocusComponent from "./components/focusComponent";

const {Header, Content, Footer} = Layout;

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
            imageHistory: getImageHistoryStorage(),
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
                themeColor: setThemeColor()
            })
        }

        // 版本号提醒
        let storageVersion = localStorage.getItem("SkyNewTabReactVersion");
        let currentVersion = require('../package.json').version;
        if (storageVersion !== currentVersion) {
            notification.open({
                icon: null,
                message: "已更新至版本 V" + currentVersion,
                description: "详细内容请前往菜单栏更新日志查看",
                placement: "bottomLeft",
                duration: 5,
                closeIcon: false
            });
            localStorage.setItem("SkyNewTabReactVersion", currentVersion);

            setTimeout(() => {
                notification.open({
                    icon: null,
                    message: "支持作者",
                    description: "如果喜欢这款插件，请考虑五星好评",
                    placement: "bottomLeft",
                    duration: 5,
                    closeIcon: false
                });
            }, 1000);

            // 额外提醒
            // if (currentVersion === "3.1.0") {
            //     setTimeout(() => {
            //         notification.open({
            //             icon: null,
            //             message: "重要通知",
            //             description: "本次更新修改了偏好设置中的切换间隔，如出现异常请点击重置设置按钮",
            //             placement: "bottomLeft",
            //             duration: 10,
            //             closeIcon: false
            //         });
            //     }, 2000);
            // }
        }

        // 修改各类弹窗样式
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // 插入节点时
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 通用
                    $(".ant-list-header, .ant-list-item").css("borderBlockEndColor", this.state.themeColor.componentFontColor);
                    $(".ant-list-header, .ant-list-item, .ant-list-footer").css("padding", "6px 0");
                    $(".ant-list-item-meta-title").css("color", this.state.themeColor.componentFontColor);
                    $(".ant-list-item-meta-description").css("color", this.state.themeColor.componentFontColor);
                    $(".ant-list-item-action").css("marginInlineStart", "0");
                    $(".ant-empty-description").css("color", this.state.themeColor.componentFontColor);
                    $("div.ant-typography").css("margin-bottom", "0");

                    // popover
                    let popoverEle = $(".ant-popover");
                    if (popoverEle.length && popoverEle.length > 0) {
                        $(".ant-popover-title").css("color", this.state.themeColor.componentFontColor);
                        $(".ant-popover-inner-content").css("color", this.state.themeColor.componentFontColor);
                        $(".ant-switch-inner-checked").css("color", getFontColor(this.state.themeColor.themeColor));
                        $(".ant-form-item-extra").css("color", this.state.themeColor.componentFontColor);

                        let dailyNotificationStorage = localStorage.getItem("dailyNotification");
                        if (dailyNotificationStorage) {
                            resetSwitchColor("#dailyNotificationSwitch", JSON.parse(dailyNotificationStorage), this.state.themeColor.themeColor);
                        }
                        let todoNotificationStorage = localStorage.getItem("todoNotification");
                        if (todoNotificationStorage) {
                            resetSwitchColor("#todoNotificationSwitch", JSON.parse(todoNotificationStorage), this.state.themeColor.themeColor);
                        }
                        let focusModeStorage = localStorage.getItem("focusMode");
                        if (focusModeStorage) {
                            resetSwitchColor("#focusModeSwitch", JSON.parse(focusModeStorage), this.state.themeColor.themeColor);
                        }
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
                        $(".ant-switch-inner-checked").css("color", getFontColor(this.state.themeColor.themeColor));
                        $(".ant-collapse").css("backgroundColor", this.state.themeColor.componentBackgroundColor);
                        $(".ant-collapse-header").css("color", this.state.themeColor.componentFontColor);

                        // preferenceImageComponent
                        resetRadioColor(this.state.preferenceData.dynamicEffect, ["all", "translate", "rotate", "close"], this.state.themeColor.themeColor);
                        resetRadioColor(this.state.preferenceData.imageQuality, ["full", "regular"], this.state.themeColor.themeColor);
                        resetCheckboxColor(this.state.preferenceData.imageTopics, imageTopics, this.state.themeColor.themeColor);
                        resetSwitchColor("#nightModeSwitch", this.state.preferenceData.nightMode, this.state.themeColor.themeColor);
                        resetSwitchColor("#noImageModeSwitch", this.state.preferenceData.noImageMode, this.state.themeColor.themeColor);

                        // preferenceFunctionComponent
                        resetRadioColor(this.state.preferenceData.searchEngine, ["bing", "google"], this.state.themeColor.themeColor);
                        resetRadioColor(this.state.preferenceData.buttonShape, ["round", "default"], this.state.themeColor.themeColor);
                        resetSwitchColor("#simpleModeSwitch", this.state.preferenceData.simpleMode, this.state.themeColor.themeColor);
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
                }
            });
        });
        observer.observe(document.body, {childList: true});
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
                                <FocusComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                />
                                <MenuComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                    getPreferenceData={this.getPreferenceData.bind(this)}
                                />
                            </Space>
                        </Col>
                        <Col xs={22} sm={22} md={22} lg={0} xl={0} xxl={0} style={{textAlign: "right"}}>
                            <Space align={"center"}>
                                <LinkComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                    imageData={this.state.imageData}
                                    preferenceData={this.state.preferenceData}
                                />
                                <MenuComponent
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
                        preferenceData={this.state.preferenceData}
                        getImageData={this.getImageData.bind(this)}
                        getImageHistory={this.getImageHistory.bind(this)}
                    />
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                            <ClockComponent
                                themeColor={this.state.themeColor}
                                preferenceData={this.state.preferenceData}
                            />
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                            <Space direction={"vertical"} align={"center"}>
                                <ClockComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                />
                                <SearchComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                />
                                <CollectionComponent
                                    themeColor={this.state.themeColor}
                                    preferenceData={this.state.preferenceData}
                                />
                            </Space>
                        </Col>
                    </Row>
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
                                <HistoryComponent
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
