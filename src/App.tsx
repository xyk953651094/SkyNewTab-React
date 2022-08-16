import React from "react";
import "./App.css";
import "./stylesheets/publicStyles.css"

import GreetComponent from "./components/greet";
import WeatherComponent from "./components/weather";
import DownloadComponent from "./components/download";
import HtmlLinkComponent from "./components/htmlLink";
import WallpaperComponent from "./components/wallpaper";
import SearchComponent from "./components/search";
import AuthorComponent from "./components/author";
import CreatTimeComponent from "./components/createTime";

import { Layout, Row, Col, Space } from "antd";
import { setColorTheme, getThemeColor, deviceModel } from "./typescripts/publicFunctions";
const { Header, Content, Footer } = Layout;

type propType = {}

type stateType = {
    componentDisplay: "none" | "block",
    mobileComponentDisplay: "none" | "block",
    wallpaperComponentDisplay: "none" | "block",
    imageColor: string,
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
            imageColor: "",
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
            imageColor: setColorTheme()
        })
        
        let clientId = "ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM";
        let orientation = "landscape";
        let imageXHR = new XMLHttpRequest();
        imageXHR.open("GET","https://api.unsplash.com/photos/random?client_id=" + clientId + "&orientation=" + orientation + "&content_filter=high");
        imageXHR.onload = function(){
            if(imageXHR.status === 200){
                let imageData = JSON.parse(imageXHR.responseText);

                if(device === "iPhone" || device === "Android") {  // 小屏显示底部按钮
                    tempThis.setState({
                        componentDisplay: "none",
                        mobileComponentDisplay: "block",
                        wallpaperComponentDisplay: "block",
                        imageColor: getThemeColor(imageData.color),
                        downloadLink: imageData.links.download,
                        htmlLink: imageData.links.html,
                        imageLink: imageData.urls.regular,
                    })
                }
                else {
                    tempThis.setState({
                        componentDisplay: "block",
                        mobileComponentDisplay: "none",
                        wallpaperComponentDisplay: "block",
                        imageColor: getThemeColor(imageData.color),
                        downloadLink: imageData.links.download,
                        htmlLink: imageData.links.html,
                        imageLink: imageData.urls.regular,
                        author: imageData.user.name,
                        authorLink: imageData.user.links.html,
                        createTime: imageData.created_at.split("T")[0],
                    })
                }
            }
            else{
                // message.error("无法获取背景图片");
            }
        }
        imageXHR.onerror=function(){
            // message.error("无法获取背景图片");
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
                                    imageColor={this.state.imageColor}
                                />
                                <WeatherComponent
                                    display={this.state.componentDisplay}
                                    imageColor={this.state.imageColor}
                                />
                            </Space>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Space size={"small"}>
                                <DownloadComponent
                                    display={this.state.componentDisplay}
                                    imageColor={this.state.imageColor}
                                    downloadLink={this.state.downloadLink}
                                />
                                <HtmlLinkComponent
                                    display={this.state.componentDisplay}
                                    imageColor={this.state.imageColor}
                                    htmlLink={this.state.htmlLink}
                                />
                                {/*<Button type="primary" shape="round" icon={<SettingOutlined />} size={"large"} />*/}
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
                                    imageColor={this.state.imageColor}
                                    downloadLink={this.state.downloadLink}
                                />
                                <HtmlLinkComponent
                                    display={this.state.mobileComponentDisplay}
                                    imageColor={this.state.imageColor}
                                    htmlLink={this.state.htmlLink}
                                />
                            </Space>
                        </Col>
                        <Col span={12} style={{textAlign: "right"}}>
                            <Space size={"small"} align={"end"}>
                                <AuthorComponent
                                    display={this.state.componentDisplay}
                                    imageColor={this.state.imageColor}
                                    author={this.state.author}
                                    authorLink={this.state.authorLink}
                                />
                                <CreatTimeComponent
                                    display={this.state.componentDisplay}
                                    imageColor={this.state.imageColor}
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
