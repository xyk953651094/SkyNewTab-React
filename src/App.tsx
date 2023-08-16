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
import AuthorComponent from "./components/authorComponent"

import {Col, Layout, Row, Space} from "antd";
import "./stylesheets/publicStyles.scss"
import {
    changeThemeColor,
    getFontColor,
    getReverseColor,
    setColorTheme
} from "./typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "./typescripts/publicInterface";
import {defaultPreferenceData} from "./typescripts/publicConstants";

const {Header, Content, Footer} = Layout;
const $ = require("jquery");

type propType = {}

type stateType = {
    themeColor: ThemeColorInterface,

    imageData: any,
    preferenceData: PreferenceDataInterface
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
            preferenceData: defaultPreferenceData
        }
    }

    getImageData(imageData: any) {
        this.setState({
            imageData: imageData
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

    getPreferenceData(value: PreferenceDataInterface) {
        this.setState({
            preferenceData: value
        })
    }

    componentDidMount() {
        // 加载偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if(tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }
        this.setState({
            preferenceData: tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData)
        }, () => {
            // 设置颜色主题
            this.setState({
                themeColor: setColorTheme()
            })
        })

        // 修改各类弹窗样式
        $("body").bind("DOMNodeInserted", () => {
            // 通用
            $(".ant-list-item").css({"borderBlockEndColor": this.state.themeColor.componentFontColor, "padding": "10px, 0"});
            $(".ant-list-item-meta-title").css("color", this.state.themeColor.componentFontColor);
            $(".ant-list-item-meta-description").css("color", this.state.themeColor.componentFontColor);
            $(".ant-list-item-action").css("marginInlineStart", "0");
            $(".ant-empty-description").css("color", this.state.themeColor.componentFontColor);

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

            // messgae
            let messageEle = $(".ant-message");
            if (messageEle.length && messageEle.length > 0) {
                $(".ant-message-notice-content").css({
                    "backgroundColor": this.state.themeColor.componentBackgroundColor,
                    "color": this.state.themeColor.componentFontColor
                });
                $(".ant-message-custom-content > .anticon").css("color", this.state.themeColor.componentFontColor);
            }

            // drawer
            let drawerEle = $(".ant-drawer");
            if (drawerEle.length && drawerEle.length > 0) {
                $(".ant-drawer-close").css("color", this.state.themeColor.componentFontColor);
                $(".ant-drawer-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-form-item-label > label").css("color", this.state.themeColor.componentFontColor);
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
                $(".ant-modal-footer > .ant-btn").addClass("ant-btn-round ant-btn-text").removeClass("ant-btn-default ant-btn-primary");
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
                        <Col xs={0} sm={0} md={10} lg={10} xl={10} xxl={10}>
                            <Space size={"small"}>
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
                        <Col xs={22} sm={22} md={10} lg={10} xl={10} xxl={10} style={{textAlign: "right"}}>
                            <Space size={"small"}>
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
                                    getPreferenceData={this.getPreferenceData.bind(this)}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content id={"content"} className={"center"}>
                    <WallpaperComponent
                        getImageData={this.getImageData.bind(this)}
                    />
                    <Space direction={"vertical"} align={"center"}>
                        <ClockComponent themeColor={this.state.themeColor} preferenceData={this.state.preferenceData}/>
                        <SearchComponent preferenceData={this.state.preferenceData}/>
                        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                            <CollectionComponent
                                themeColor={this.state.themeColor}
                                preferenceData={this.state.preferenceData}
                            />
                        </Col>
                    </Space>
                </Content>
                <Footer id={"footer"}>
                    <Row justify="center">
                        <Col xs={0} sm={0} md={20} lg={20} xl={20} style={{textAlign: "right"}}>
                            <Space size={"small"} align={"end"}>
                                <AuthorComponent
                                    themeColor={this.state.themeColor}
                                    imageData={this.state.imageData}
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
