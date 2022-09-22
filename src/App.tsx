import React from "react";
import "./App.css";
import "./stylesheets/publicStyles.css"

import GreetComponent from "./components/greet";
import WeatherComponent from "./components/weather";
import DownloadComponent from "./components/download";
import HtmlLinkComponent from "./components/htmlLink";
import PreferenceComponent from "./components/preference";
import WallpaperComponent from "./components/wallpaper";
import SearchComponent from "./components/search";
import AuthorComponent from "./components/author";
import CreatTimeComponent from "./components/createTime";

import {Layout, Row, Col, Space, message} from "antd";
import {clientId} from "./typescripts/publicConstents";
import {
    setColorTheme,
    deviceModel,
    changeThemeColor,
    getThemeColor,
} from "./typescripts/publicFunctions";
const {Header, Content, Footer} = Layout;
const $ = require("jquery");

type propType = {}

type stateType = {
    componentDisplay: "none" | "block",
    mobileComponentDisplay: "none" | "block",
    wallpaperComponentDisplay: "none" | "block",
    themeColor: string,
    imageData: any,

    displayEffect: "regular" | "full",
    dynamicEffect: "close" | "translate" | "rotate",
    imageTopics: string,
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
            mobileComponentDisplay: "none",
            wallpaperComponentDisplay: "none",
            themeColor: "",
            imageData: "",

            displayEffect: "regular",
            dynamicEffect: "translate",
            imageTopics: "Fzo3zuOHN6w",
        }
    }

    getDisplayEffect(displayEffect: "regular" | "full") {
        this.setState({
            displayEffect: displayEffect,
        })
    }

    getDynamicEffect(dynamicEffect: "close" | "translate" | "rotate") {
        this.setState({
            dynamicEffect: dynamicEffect,
        })
    }

    getImageTopics(imageTopics: string) {
        this.setState({
            imageTopics: imageTopics
        })
    }

    componentWillMount() {
        let device = deviceModel();
        this.setState({
            themeColor: setColorTheme(),  // 未加载图片前随机显示颜色主题
        }, () => {
            // 获取背景图片
            $.ajax({
                url: "https://api.unsplash.com/photos/random?",
                headers: {
                    "Authorization": "Client-ID " + clientId,
                },
                type: "GET",
                data: {
                    "client_id": clientId,
                    "orientation": (device === "iPhone" || device === "Android")? "portrait" : "landscape",
                    "topics": this.state.imageTopics,
                    "content_filter": "high",
                },
                timeout: 10000,
                success: (imageData: any) => {
                    this.setState({
                        componentDisplay: "block",
                        mobileComponentDisplay: "none",
                        wallpaperComponentDisplay: "block",
                        themeColor: getThemeColor(imageData.color),
                        imageData: imageData,
                    }, () => {
                        // 小屏显示底部按钮
                        if (device === "iPhone" || device === "Android") {
                            this.setState({
                                componentDisplay: "none",
                                mobileComponentDisplay: "block",
                            })
                        }
                    })

                    // 设置body背景颜色
                    changeThemeColor("body", imageData.color);
                },
                error: function () {
                    message.error("获取图片失败");
                }
            });
        });
    }

    render() {
        return (
            <Layout>
                <Header id={"header"} className={"zIndexMiddle"}>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Space size={"small"}>
                                <GreetComponent
                                    themeColor={this.state.themeColor}
                                />
                                <WeatherComponent
                                    themeColor={this.state.themeColor}
                                />
                            </Space>
                        </Col>
                        <Col xs={0} sm={0} md={12} lg={12} xl={12} style={{textAlign: "right"}}>
                            <Space size={"small"}>
                                <DownloadComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.componentDisplay}
                                    imageData={this.state.imageData}
                                />
                                <HtmlLinkComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.componentDisplay}
                                    imageData={this.state.imageData}
                                />
                                <PreferenceComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.componentDisplay}
                                    imageData={this.state.imageData}
                                    getDisplayEffect={this.getDisplayEffect.bind(this)}
                                    getDynamicEffect={this.getDynamicEffect.bind(this)}
                                    getImageTopics={this.getImageTopics.bind(this)}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content id={"content"} className={"center"}>
                    <WallpaperComponent
                        display={this.state.wallpaperComponentDisplay}
                        imageData={this.state.imageData}
                        displayEffect={this.state.displayEffect}
                        dynamicEffect={this.state.dynamicEffect}
                    />
                    <SearchComponent />
                </Content>
                <Footer id={"footer"}>
                    <Row>
                        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                            <Space size={"small"}>
                                <PreferenceComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.mobileComponentDisplay}
                                    imageData={this.state.imageData}
                                    getDisplayEffect={this.getDisplayEffect.bind(this)}
                                    getDynamicEffect={this.getDynamicEffect.bind(this)}
                                    getImageTopics={this.getImageTopics.bind(this)}
                                />
                                <DownloadComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.mobileComponentDisplay}
                                    imageData={this.state.imageData}
                                />
                                <HtmlLinkComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.mobileComponentDisplay}
                                    imageData={this.state.imageData}
                                />
                            </Space>
                        </Col>
                        <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: "right"}}>
                            <Space size={"small"} align={"end"}>
                                <AuthorComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.componentDisplay}
                                    imageData={this.state.imageData}
                                />
                                <CreatTimeComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.componentDisplay}
                                    imageData={this.state.imageData}
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
