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
import {ThemeColorInterface} from "./typescripts/publicInterface";

const {Header, Content, Footer} = Layout;
const $ = require("jquery");

type propType = {}

type stateType = {
    componentDisplay: "none" | "block",
    themeColor: ThemeColorInterface,

    imageData: any,
    searchEngine: string,
    dynamicEffect: "all" | "rotate" | "translate" | "close",
    imageQuality: "full" | "regular" | "small",
    imageTopics: string,
    simpleMode: boolean,
    noImageMode: boolean
}

interface App {
    state: stateType,
    props: propType
}

class App extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            componentDisplay: "none",
            themeColor: {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": "",
            },

            imageData: null,
            searchEngine: "bing",
            dynamicEffect: "all",
            imageQuality: "regular",
            imageTopics: "Fzo3zuOHN6w",
            simpleMode: false,
            noImageMode: false
        }
    }

    getImageData(imageData: any) {
        this.setState({
            componentDisplay: "block",
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

    getSearchEngine(searchEngine: string) {
        this.setState({
            searchEngine: searchEngine
        })
    }

    getDynamicEffect(dynamicEffect: "close" | "translate" | "rotate" | "all") {
        this.setState({
            dynamicEffect: dynamicEffect,
        })
    }

    getImageQuality(imageQuality: "full" | "regular" | "small") {
        this.setState({
            imageQuality: imageQuality,
        })
    }

    getImageTopics(imageTopics: string) {
        this.setState({
            imageTopics: imageTopics
        })
    }

    getSimpleMode(simpleMode: boolean) {
        this.setState({
            simpleMode: simpleMode
        })
    }

    getNoImageMode(noImageMode: boolean) {
        this.setState({
            noImageMode: noImageMode
        })
    }

    componentDidMount() {
        // 加载偏好设置
        let tempSearchEngine = localStorage.getItem("searchEngine");
        let tempDynamicEffect = localStorage.getItem("dynamicEffect");
        let tempImageQuality = localStorage.getItem("imageQuality");
        let tempImageTopics = localStorage.getItem("imageTopics");
        let tempSimpleMode = localStorage.getItem("simpleMode");
        let tempNoImageMode = localStorage.getItem("noImageMode");


        this.setState({
            searchEngine: tempSearchEngine === null ? "bing" : tempSearchEngine,
            dynamicEffect: tempDynamicEffect === null ? "all" : tempDynamicEffect,
            imageQuality: tempImageQuality === null ? "regular" : tempImageQuality,
            imageTopics: tempImageTopics === null ? "Fzo3zuOHN6w" : tempImageTopics,
            simpleMode: tempSimpleMode === null ? false : JSON.parse(tempSimpleMode),
            noImageMode: tempNoImageMode === null ? false : JSON.parse(tempNoImageMode),
        }, () => {
            // 设置颜色主题
            this.setState({
                themeColor: setColorTheme()
            })
        });

        // 修改各类弹窗样式
        $("body").bind("DOMNodeInserted", () => {
            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-popover-inner-content").css("color", this.state.themeColor.componentFontColor);
                $(".ant-checkbox-group-item").css("color", this.state.themeColor.componentFontColor);
                $(".ant-list-item").css({"borderBlockEndColor": this.state.themeColor.componentFontColor, "padding": "8px, 0"});
                $(".ant-list-item-meta-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-list-item-meta-description").css("color", this.state.themeColor.componentFontColor);
                $(".ant-empty-description").css("color", this.state.themeColor.componentFontColor);
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
                $(".ant-list-item").css("borderBlockEndColor", this.state.themeColor.componentFontColor);
                $(".ant-list-item-meta-title").css("color", this.state.themeColor.componentFontColor);
            }

            // modal
            let modalEle = $(".ant-modal");
            if (modalEle.length && modalEle.length > 0) {
                $(".ant-modal-content").css("backgroundColor", this.state.themeColor.componentBackgroundColor);
                $(".ant-modal-title").css({
                    "backgroundColor": this.state.themeColor.componentBackgroundColor,
                    "color": this.state.themeColor.componentFontColor
                });
                $(".ant-list-item").css({"borderBlockEndColor": this.state.themeColor.componentFontColor, "padding": "8px, 0"});
                $(".ant-form-item-label > label").css("color", this.state.themeColor.componentFontColor);
                $(".ant-list-item-meta-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-list-item-meta-description").css("color", this.state.themeColor.componentFontColor);
                // $(".ant-modal-close-x").css("color", this.state.themeColor.componentFontColor);
                $(".ant-empty-description").css("color", this.state.themeColor.componentFontColor);
                $(".ant-tooltip-inner").css("color", this.state.themeColor.componentFontColor);
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
                                    searchEngine={this.state.searchEngine}
                                />
                                <WeatherComponent
                                    themeColor={this.state.themeColor}
                                    searchEngine={this.state.searchEngine}
                                />
                            </Space>
                        </Col>
                        <Col xs={22} sm={22} md={10} lg={10} xl={10} xxl={10} style={{textAlign: "right"}}>
                            <Space size={"small"}>
                                <DailyComponent
                                    themeColor={this.state.themeColor}
                                    simpleMode={this.state.simpleMode}
                                />
                                <TodoComponent
                                    themeColor={this.state.themeColor}
                                    simpleMode={this.state.simpleMode}
                                />
                                <PreferenceComponent
                                    themeColor={this.state.themeColor}
                                    getSearchEngine={this.getSearchEngine.bind(this)}
                                    getDynamicEffect={this.getDynamicEffect.bind(this)}
                                    getImageQuality={this.getImageQuality.bind(this)}
                                    getImageTopics={this.getImageTopics.bind(this)}
                                    getSimpleMode={this.getSimpleMode.bind(this)}
                                    getNoImageMode={this.getNoImageMode.bind(this)}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content id={"content"} className={"center"}>
                    <WallpaperComponent
                        noImageMode={this.state.noImageMode}
                        getImageData={this.getImageData.bind(this)}
                        dynamicEffect={this.state.dynamicEffect}
                        imageQuality={this.state.imageQuality}
                        imageTopics={this.state.imageTopics}
                    />
                    <Space direction={"vertical"} align={"center"}>
                        <ClockComponent themeColor={this.state.themeColor}/>
                        <SearchComponent searchEngine={this.state.searchEngine}/>
                        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                            <CollectionComponent
                                themeColor={this.state.themeColor}
                                simpleMode={this.state.simpleMode}
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
                                    display={this.state.componentDisplay}
                                    imageData={this.state.imageData}
                                    searchEngine={this.state.searchEngine}
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
