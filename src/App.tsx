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
import {unsplashUrl, clientId} from "./typescripts/publicConstents";
import {setColorTheme, getThemeColor, deviceModel, changeThemeColor} from "./typescripts/publicFunctions";
const {Header, Content, Footer} = Layout;

type propType = {}

type stateType = {
    componentDisplay: "none" | "block",
    mobileComponentDisplay: "none" | "block",
    wallpaperComponentDisplay: "none" | "block",
    imageData: any,
    themeColor: string,
    downloadLink: string,
    htmlLink: string,
    imageLink: string,
    author: string,
    authorLink: string,
    createTime: string,
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
            imageData: "",
            themeColor: "",
            downloadLink: "",
            htmlLink: "",
            imageLink: "",
            author: "",
            authorLink: "",
            createTime: "",
        }
    }

    componentWillMount() {
        let tempThis = this;
        let device = deviceModel();
        this.setState({
            themeColor: setColorTheme()    // 未加载图片前随机显示颜色主题
        })

        let orientation = "landscape";
        let imageSize = "&w=2880&h=1800"
        if(device === "iPhone" || device === "Android") {
            orientation = "portrait";  // 获取竖屏图片
            imageSize = "&w=828&h=1792"
        }
        let topics = "bo8jQKTaE0Y,6sMVjTLSkeQ,bDo48cUhwnY,xHxYTMHLgOc,iUIsnVtjB0Y,R_Fyn-Gwtlw,Fzo3zuOHN6w";

        let imageXHR = new XMLHttpRequest();
        imageXHR
        .open("GET", "https://api.unsplash.com/photos/random?" +
            "client_id=" + clientId +
            "&orientation=" + orientation +
            "&topics=" + topics +
            "&content_filter=high"
        );
        imageXHR
        .onload = function () {
            if (imageXHR.status === 200) {
                let imageData = JSON.parse(imageXHR.responseText);

                tempThis.setState({
                    componentDisplay: "block",
                    mobileComponentDisplay: "none",
                    wallpaperComponentDisplay: "block",
                    imageData: imageData,
                    themeColor: getThemeColor(imageData.color),
                    downloadLink: imageData.links.download_location,
                    htmlLink: imageData.links.html,
                    imageLink: imageData.urls.regular + imageSize,
                    author: "by " + imageData.user.name + " on Unsplash",
                    authorLink: imageData.user.links.html,
                    createTime: imageData.created_at.split("T")[0],
                }, () => {
                    // 小屏显示底部按钮
                    if (device === "iPhone" || device === "Android") {
                        tempThis.setState({
                            componentDisplay: "none",
                            mobileComponentDisplay: "block",
                        })
                    }
                })

                // 设置body背景颜色
                changeThemeColor("body", imageData.color);
            }
            else {
                message.error("获取图片失败");
            }
        }
        imageXHR.onerror = function () {
            message.error("获取图片失败");
        }
        imageXHR.send();
    }

    render() {
        return (
            <Layout>
                <Header id={"header"} className={"zIndexMiddle"}>
                    <Row>
                        <Col span={12}>
                            <Space size={"small"}>
                                <GreetComponent
                                    themeColor={this.state.themeColor}
                                />
                                <WeatherComponent
                                    themeColor={this.state.themeColor}
                                />
                            </Space>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Space size={"small"}>
                                <DownloadComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                    downloadLink={this.state.downloadLink}
                                />
                                <HtmlLinkComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                    htmlLink={this.state.htmlLink}
                                />
                                <PreferenceComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content id={"content"} className={"center"}>
                    <WallpaperComponent
                        display={this.state.wallpaperComponentDisplay}
                        imageLink={this.state.imageLink}
                    />
                    <SearchComponent />
                </Content>
                <Footer id={"footer"}>
                    <Row>
                        <Col span={12} style={{textAlign: "left"}}>
                            <Space size={"small"}>
                                <DownloadComponent
                                    display={this.state.mobileComponentDisplay}
                                    themeColor={this.state.themeColor}
                                    downloadLink={this.state.downloadLink}
                                />
                                <HtmlLinkComponent
                                    display={this.state.mobileComponentDisplay}
                                    themeColor={this.state.themeColor}
                                    htmlLink={this.state.htmlLink}
                                />
                                <PreferenceComponent
                                    display={this.state.mobileComponentDisplay}
                                    themeColor={this.state.themeColor}
                                />
                            </Space>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Space size={"small"} align={"end"}>
                                <AuthorComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                    author={this.state.author}
                                    authorLink={this.state.authorLink + unsplashUrl}
                                />
                                <CreatTimeComponent
                                    display={this.state.componentDisplay}
                                    themeColor={this.state.themeColor}
                                    createTime={this.state.createTime}
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
