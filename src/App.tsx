import React from "react";
import "./stylesheets/publicStyles.scss"

import GreetComponent from "./components/greetComponent";
import WeatherComponent from "./components/weatherComponent";
import DownloadComponent from "./components/downloadComponent";
import HtmlLinkComponent from "./components/htmlLinkComponent";
import PreferenceComponent from "./components/preferenceComponent";
import WallpaperComponent from "./components/wallpaperComponent";
import SearchComponent from "./components/searchComponent";
import AuthorComponent from "./components/authorComponent"
import CreatTimeComponent from "./components/createTimeComponent";

import {Layout, Row, Col, Space} from "antd";
import {clientId, device} from "./typescripts/publicConstants";
import {
    setColorTheme,
    getComponentBackgroundColor,
    getFontColor,
    httpRequest,
    changeThemeColor
} from "./typescripts/publicFunctions";
import {ThemeColorInterface} from "./typescripts/publicInterface";
const {Header, Content, Footer} = Layout;

type propType = {}

type stateType = {
    componentDisplay: "none" | "block",
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

    // 请求完成后处理步骤
    setWallpaper(data: any) {
        this.setState({
            componentDisplay: "block",
            wallpaperComponentDisplay: "block",
            imageData: data,
        }, () => {
            // 修改主题颜色
            if (data.color !== null) {
                let componentBackgroundColor = getComponentBackgroundColor(data.color);
                let componentFontColor = getFontColor(componentBackgroundColor);
                this.setState({
                    themeColor: {
                        "componentBackgroundColor": componentBackgroundColor,
                        "componentFontColor": componentFontColor,
                    },
                })

                let bodyBackgroundColor = data.color;
                let bodyFontColor = getFontColor(bodyBackgroundColor);
                changeThemeColor("body", bodyBackgroundColor, bodyFontColor);
            }
        })
    }

    // 获取背景图片
    getWallpaper() {
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
                localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                localStorage.setItem("lastImage", JSON.stringify(resultData));               // 保存请求结果，防抖节流
                tempThis.setWallpaper(resultData);
            })
            .catch(function(){
                // message.error("获取图片失败");
                // 请求失败也更新请求时间，防止超时后无信息可显示
                localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                // 获取图片失败时显示上次图片
                let lastImage: any = localStorage.getItem("lastImage");
                if (lastImage) {
                    lastImage = JSON.parse(lastImage);
                    tempThis.setWallpaper(lastImage);
                }
            })
            .finally(function(){});
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
            // 设置颜色主题
            this.setState({
                themeColor: setColorTheme()
            }, () => {
                // 设置背景图片，防抖节流
                let lastRequestTime: any = localStorage.getItem("lastImageRequestTime");
                let nowTimeStamp = new Date().getTime();
                if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                    this.getWallpaper();
                }
                else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
                    this.getWallpaper();
                }
                else {  // 一分钟之内使用上一次请求结果
                    let lastImage: any = localStorage.getItem("lastImage");
                    if (lastImage) {
                        lastImage = JSON.parse(lastImage);
                        this.setWallpaper(lastImage);
                    }
                }
            })
        });
    }

    render() {
        return (
            <Layout>
                <Header id={"header"} className={"zIndexMiddle"}>
                    <Row>
                        <Col xs={0} sm={0} md={12} lg={{span: 12, offset: 0}} xl={{span: 12, offset: 0}}>
                            <Space size={"small"}>
                                <GreetComponent
                                    themeColor={this.state.themeColor}
                                />
                                <WeatherComponent
                                    themeColor={this.state.themeColor}
                                />
                            </Space>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{textAlign: "right"}}>
                            <Space size={"small"}>
                                {/*<DownloadComponent*/}
                                {/*    themeColor={this.state.themeColor}*/}
                                {/*    display={this.state.componentDisplay}*/}
                                {/*    imageData={this.state.imageData}*/}
                                {/*/>*/}
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
                        <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: "right"}}>
                            <Space size={"small"} align={"end"}>
                                <AuthorComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.componentDisplay}
                                    imageData={this.state.imageData}
                                />
                                {/*<CreatTimeComponent*/}
                                {/*    themeColor={this.state.themeColor}*/}
                                {/*    display={this.state.componentDisplay}*/}
                                {/*    imageData={this.state.imageData}*/}
                                {/*/>*/}
                            </Space>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        );
    }
}

export default App;
