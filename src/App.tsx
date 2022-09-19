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
import {setColorTheme, deviceModel, changeThemeColor, getThemeColor} from "./typescripts/publicFunctions";
const {Header, Content, Footer} = Layout;

type propType = {}

type stateType = {
    componentDisplay: "none" | "block",
    mobileComponentDisplay: "none" | "block",
    wallpaperComponentDisplay: "none" | "block",
    imageData: any,
    themeColor: string
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
            themeColor: ""  // 未加载图片前随机显示颜色主题
        }
    }

    componentWillMount() {
        let tempThis = this;
        let device = deviceModel();
        this.setState({
            themeColor: setColorTheme()    // 未加载图片前随机显示颜色主题
        })
        let orientation = "landscape";
        if(device === "iPhone" || device === "Android") {
            orientation = "portrait";  // 获取竖屏图片
        }
        let topics = "bo8jQKTaE0Y,6sMVjTLSkeQ,bDo48cUhwnY,xHxYTMHLgOc,iUIsnVtjB0Y,R_Fyn-Gwtlw,Fzo3zuOHN6w";

        let imageXHR = new XMLHttpRequest();
        imageXHR.timeout = 5000;
        imageXHR.open("GET", "https://api.unsplash.com/photos/random?" + "client_id=" + clientId + "&orientation=" + orientation + "&topics=" + topics + "&content_filter=high");
        imageXHR.onload = function () {
            if (imageXHR.status === 200) {
                let imageData = JSON.parse(imageXHR.responseText);

                tempThis.setState({
                    componentDisplay: "block",
                    mobileComponentDisplay: "none",
                    wallpaperComponentDisplay: "block",
                    imageData: imageData,
                    themeColor: getThemeColor(imageData.color)
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
                                />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content id={"content"} className={"center"}>
                    <WallpaperComponent
                        display={this.state.wallpaperComponentDisplay}
                        imageData={this.state.imageData}
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
