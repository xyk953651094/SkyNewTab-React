import React from "react";
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

import {Layout, Row, Col, Space} from "antd";
import {clientId, device} from "./typescripts/publicConstants";
import {
    setColorTheme,
    getComponentBackgroundColor,
    getFontColor,
    httpRequest
} from "./typescripts/publicFunctions";
import {ThemeColorInterface} from "./typescripts/publicInterface";
const {Header, Content, Footer} = Layout;

type propType = {}

type stateType = {
    componentDisplay: "none" | "block",
    mobileComponentDisplay: "none" | "block",
    wallpaperComponentDisplay: "none" | "block",
    themeColor: ThemeColorInterface,
    imageData: any,

    displayEffect: "regular" | "full" | "raw",
    dynamicEffect: "close" | "translate" | "rotate" | "all",
    imageTopics: string,
    searchEngine: "bing" | "baidu" | "google",
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
            themeColor: {
                "componentBackgroundColor": "",
                "componentFontColor": "",
            },
            imageData: null,

            displayEffect: "regular",
            dynamicEffect: "all",
            imageTopics: "Fzo3zuOHN6w",
            searchEngine: "bing",
        }
    }

    getDisplayEffect(displayEffect: "regular" | "full" | "raw") {
        this.setState({
            displayEffect: displayEffect,
        })
    }

    getDynamicEffect(dynamicEffect: "close" | "translate" | "rotate" | "all") {
        this.setState({
            dynamicEffect: dynamicEffect,
        })
    }

    getImageTopics(imageTopics: string) {
        this.setState({
            imageTopics: imageTopics
        })
    }

    getSearchEngine(searchEngine: string) {
        this.setState({
            searchEngine: searchEngine
        })
    }

    componentDidMount() {
        // 加载偏好设置
        let tempDisplayEffect = localStorage.getItem("displayEffect");
        let tempDynamicEffect = localStorage.getItem("dynamicEffect");
        let tempImageTopics = localStorage.getItem("imageTopics");
        let tempSearchEngine = localStorage.getItem("searchEngine");
        this.setState({
            displayEffect: tempDisplayEffect === null ? "regular" : tempDisplayEffect,
            dynamicEffect: tempDynamicEffect === null ? "all" : tempDynamicEffect,
            imageTopics: tempImageTopics === null ? "Fzo3zuOHN6w" : tempImageTopics,
            searchEngine: tempSearchEngine === null ? "bing" : tempSearchEngine,
        }, () => {
            // 获取背景图片
            this.setState({
                themeColor: setColorTheme()
            }, () => {
                let tempThis = this;
                let url = "https://api.unsplash.com/photos/random?";
                let data = {
                    "client_id": clientId,
                    "orientation": (device === "iPhone" || device === "Android") ? "portrait" : "landscape",
                    "topics": this.state.imageTopics,
                    "content_filter": "high",
                }
                httpRequest(url, data, "GET")
                    .then(function(resultData: any){
                        localStorage.setItem("lastImage", JSON.stringify(resultData));  // 保存本次图片，便于未来无互联网时显示
                        tempThis.setState({
                            componentDisplay: "block",
                            mobileComponentDisplay: "none",
                            wallpaperComponentDisplay: "block",
                            imageData: resultData,
                        }, () => {
                            // 修改主题颜色
                            if (resultData.color !== null) {
                                let componentBackgroundColor = getComponentBackgroundColor(resultData.color);
                                let componentFontColor = getFontColor(componentBackgroundColor);
                                tempThis.setState({
                                    themeColor: {
                                        "componentBackgroundColor": componentBackgroundColor,
                                        "componentFontColor": componentFontColor,
                                    },
                                })

                                document.getElementsByTagName("body")[0].style.backgroundColor = resultData.color;
                                document.getElementsByTagName("body")[0].style.color = getFontColor(resultData.color);
                            }
                        })
                    })
                    .catch(function(){
                        // message.error("获取图片失败");
                        // 获取图片失败时显示上次图片
                        let lastImage: any = localStorage.getItem("lastImage");
                        if (lastImage) {
                            lastImage = JSON.parse(lastImage);
                            tempThis.setState({
                                componentDisplay: "block",
                                mobileComponentDisplay: "none",
                                wallpaperComponentDisplay: "block",
                                imageData: lastImage,
                            }, () => {
                                // 修改主题颜色
                                if (lastImage.color !== null) {
                                    let componentBackgroundColor = getComponentBackgroundColor(lastImage.color);
                                    let componentFontColor = getFontColor(componentBackgroundColor);
                                    tempThis.setState({
                                        themeColor: {
                                            "componentBackgroundColor": componentBackgroundColor,
                                            "componentFontColor": componentFontColor,
                                        },
                                    })

                                    document.getElementsByTagName("body")[0].style.backgroundColor = lastImage.color;
                                    document.getElementsByTagName("body")[0].style.color = getFontColor(lastImage.color);
                                }
                            })
                        }
                    })
                    .finally(function(){
                        // 小屏显示底部按钮
                        if (device === "iPhone" || device === "Android") {
                            tempThis.setState({
                                componentDisplay: "none",
                                mobileComponentDisplay: "block",
                            })
                        }
                    });
            })
        });
    }

    render() {
        return (
            <Layout>
                <Header id={"header"} className={"zIndexMiddle"}>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={{span: 11, offset: 1}} xl={{span: 11, offset: 1}}>
                            <Space size={"small"}>
                                <GreetComponent
                                    themeColor={this.state.themeColor}
                                />
                                <WeatherComponent
                                    themeColor={this.state.themeColor}
                                />
                            </Space>
                        </Col>
                        <Col xs={0} sm={0} md={12} lg={11} xl={11} style={{textAlign: "right"}}>
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
                                    imageData={this.state.imageData}
                                    getDisplayEffect={this.getDisplayEffect.bind(this)}
                                    getDynamicEffect={this.getDynamicEffect.bind(this)}
                                    getImageTopics={this.getImageTopics.bind(this)}
                                    getSearchEngine={this.getSearchEngine.bind(this)}
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
                    <SearchComponent searchEngine={this.state.searchEngine}/>
                </Content>
                <Footer id={"footer"}>
                    <Row>
                        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                            <Space size={"small"}>
                                <PreferenceComponent
                                    themeColor={this.state.themeColor}
                                    imageData={this.state.imageData}
                                    getDisplayEffect={this.getDisplayEffect.bind(this)}
                                    getDynamicEffect={this.getDynamicEffect.bind(this)}
                                    getImageTopics={this.getImageTopics.bind(this)}
                                    getSearchEngine={this.getSearchEngine.bind(this)}
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
                        <Col xs={0} sm={0} md={24} lg={23} xl={23} style={{textAlign: "right"}}>
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
