import React from "react";
import "./stylesheets/publicStyles.scss"

import GreetComponent from "./components/greetComponent";
import WeatherComponent from "./components/weatherComponent";
import TodoComponent from "./components/todoComponent";
import HtmlLinkComponent from "./components/htmlLinkComponent";
import PreferenceComponent from "./components/preferenceComponent";
import WallpaperComponent from "./components/wallpaperComponent";
import SearchComponent from "./components/searchComponent";
import CollectionComponent from "./components/collectionComponent";
import AuthorComponent from "./components/authorComponent"

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
import ClockComponent from "./components/clockComponent";
import DailyComponent from "./components/dailyComponent";
const {Header, Content, Footer} = Layout;
const $ = require("jquery");

type propType = {}

type stateType = {
    componentDisplay: "none" | "block",
    wallpaperComponentDisplay: "none" | "block",
    themeColor: ThemeColorInterface,
    imageData: any,

    searchEngine: "bing" | "baidu" | "google",
    dynamicEffect: "close" | "translate" | "rotate" | "all",
    imageSource: "Unsplash" | "Pexels"
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

            searchEngine: "bing",
            dynamicEffect: "all",
            imageSource: "Unsplash",
        }
    }

    // 偏好设置
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

    getImageSource(imageSource: "Unsplash" | "Pexels") {
        this.setState({
            imageSource: imageSource,
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
                let bodyBackgroundColor = data.color;
                let bodyFontColor = getFontColor(bodyBackgroundColor);
                changeThemeColor("body", bodyBackgroundColor, bodyFontColor);

                let componentBackgroundColor = getComponentBackgroundColor(data.color);
                let componentFontColor = getFontColor(componentBackgroundColor);
                this.setState({
                    themeColor: {
                        "componentBackgroundColor": componentBackgroundColor,
                        "componentFontColor": componentFontColor,
                    },
                })
            }
        })
    }

    // 获取背景图片
    getWallpaper(imageSource: "Unsplash" | "Pexels") {
        let tempThis = this;
        let headers = {};
        let url = "";
        let data = {};

        switch (imageSource) {
            case "Unsplash":
                url = "https://api.unsplash.com/photos/random?";
                data = {
                    "client_id": clientId,
                    "orientation": (device === "iPhone" || device === "Android") ? "portrait" : "landscape",
                    "content_filter": "high",
                };
                break;
            case "Pexels":
                headers = { "authorization": "sbJpn7uRC2FAknG1nefeRAYquBuMxyP68BaJ2joKCr6MtxAjqwBvth6h"};
                url = "https://api.pexels.com/v1/curated";
                data = {
                    "per_page": 1,
                };
                break;
        }

        httpRequest(headers, url, data, "GET")
            .then(function(resultData: any){
                let imageData = {};
                switch (imageSource) {
                    case "Unsplash":
                        imageData = {
                            displayUrl: resultData.urls.regular,
                            previewUrl: resultData.urls.small,
                            imageLink: resultData.links.html,
                            userName: resultData.user.name,
                            userLink: resultData.user.links.html,
                            color: resultData.color,
                        };
                        break;
                    case "Pexels":
                        imageData = {
                            displayUrl: resultData.photos[0].src.landscape,
                            previewUrl: resultData.photos[0].src.tiny,
                            imageLink: resultData.photos[0].url,
                            userName: resultData.photos[0].photographer,
                            userLink: resultData.photos[0].photographer_url,
                            color: resultData.photos[0].avg_color,
                        };
                        break;
                }

                localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                localStorage.setItem("lastImage", JSON.stringify(imageData));                 // 保存请求结果，防抖节流
                tempThis.setWallpaper(imageData);
            })
            .catch(function(){
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
        let tempSearchEngine = localStorage.getItem("searchEngine");
        let tempDynamicEffect = localStorage.getItem("dynamicEffect");
        let tempImageSource = localStorage.getItem("imageSource");

        this.setState({
            searchEngine: tempSearchEngine === null ? "bing" : tempSearchEngine,
            dynamicEffect: tempDynamicEffect === null ? "all" : tempDynamicEffect,
            imageSource: tempImageSource === null ? "Unsplash" : tempImageSource,
        }, () => {
            // 设置颜色主题
            this.setState({
                themeColor: setColorTheme()
            }, () => {
                // 设置背景图片，防抖节流
                let lastRequestTime: any = localStorage.getItem("lastImageRequestTime");
                let nowTimeStamp = new Date().getTime();
                if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                    this.getWallpaper(this.state.imageSource);
                }
                else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
                    this.getWallpaper(this.state.imageSource);
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

        // 修改各类弹窗样式
        $("body").bind("DOMNodeInserted", () => {
            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-popover-inner-content").css("color", this.state.themeColor.componentFontColor);
                $(".ant-checkbox-group-item").css("color", this.state.themeColor.componentFontColor);
                $(".ant-list-item").css("borderBlockEndColor", this.state.themeColor.componentFontColor);
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
            if(messageEle.length && messageEle.length > 0) {
                $(".ant-message-notice-content").css({"backgroundColor": this.state.themeColor.componentBackgroundColor, "color": this.state.themeColor.componentFontColor});
                $(".ant-message-custom-content > .anticon").css("color", this.state.themeColor.componentFontColor);
            }

            // drawer
            let drawerEle = $(".ant-drawer");
            if (drawerEle.length && drawerEle.length > 0) {
                $(".ant-drawer-close").css("color", this.state.themeColor.componentFontColor);
                $(".ant-drawer-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-form-item-label > label").css("color", this.state.themeColor.componentFontColor);
                $(".ant-radio-wrapper").children(":last-child").css("color", this.state.themeColor.componentFontColor);
                $(".ant-collapse").css("backgroundColor", this.state.themeColor.componentBackgroundColor);
                $(".ant-collapse-header").css("color", this.state.themeColor.componentFontColor);
                $(".ant-list-item").css("borderBlockEndColor", this.state.themeColor.componentFontColor);
                $(".ant-list-item-meta-title").css("color", this.state.themeColor.componentFontColor);
            }

            // modal
            let modalEle = $(".ant-modal");
            if (modalEle.length && modalEle.length > 0) {
                $(".ant-modal-content").css("backgroundColor", this.state.themeColor.componentBackgroundColor);
                $(".ant-modal-title").css({"backgroundColor": this.state.themeColor.componentBackgroundColor, "color": this.state.themeColor.componentFontColor});
                $(".ant-form-item-required").css("color", this.state.themeColor.componentFontColor);
                $(".ant-list-item-meta-title").css("color", this.state.themeColor.componentFontColor);
                $(".ant-list-item-meta-description").css("color", this.state.themeColor.componentFontColor);
                $(".ant-modal-close-x").css("color", this.state.themeColor.componentFontColor);
                $(".ant-empty-description").css("color", this.state.themeColor.componentFontColor);
                $(".ant-tooltip-inner").css("color", this.state.themeColor.componentFontColor);
                // $(".ant-modal-mask").css("zIndex", 1);
            }
        });
    }

    render() {
        return (
            <Layout>
                <Header id={"header"} className={"zIndexMiddle"}>
                    <Row>
                        <Col xs={0} sm={0} md={12} lg={{span: 11, offset: 1}} xl={{span: 11, offset: 1}}>
                            <Space size={"small"}>
                                <GreetComponent
                                    themeColor={this.state.themeColor}
                                />
                                <WeatherComponent
                                    themeColor={this.state.themeColor}
                                />
                            </Space>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={11} xl={11} style={{textAlign: "right"}}>
                            <Space size={"small"}>
                                <DailyComponent
                                    themeColor={this.state.themeColor}
                                />
                                <TodoComponent
                                    themeColor={this.state.themeColor}
                                />
                                <PreferenceComponent
                                    themeColor={this.state.themeColor}
                                    imageData={this.state.imageData}
                                    getSearchEngine={this.getSearchEngine.bind(this)}
                                    getDynamicEffect={this.getDynamicEffect.bind(this)}
                                    getImageSource={this.getImageSource.bind(this)}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content id={"content"} className={"center"}>
                    <WallpaperComponent
                        display={this.state.wallpaperComponentDisplay}
                        imageData={this.state.imageData}
                        dynamicEffect={this.state.dynamicEffect}
                    />
                    <Space direction={"vertical"} align={"center"}>
                        <ClockComponent themeColor={this.state.themeColor}/>
                        <SearchComponent searchEngine={this.state.searchEngine}/>
                        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                            <CollectionComponent themeColor={this.state.themeColor}/>
                        </Col>
                    </Space>
                </Content>
                <Footer id={"footer"}>
                    <Row>
                        <Col xs={0} sm={0} md={24} lg={23} xl={23} style={{textAlign: "right"}}>
                            <Space size={"small"} align={"end"}>
                                <AuthorComponent
                                    themeColor={this.state.themeColor}
                                    display={this.state.componentDisplay}
                                    imageData={this.state.imageData}
                                    imageSource={this.state.imageSource}
                                />
                                <HtmlLinkComponent
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
