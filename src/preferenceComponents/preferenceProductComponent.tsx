import React from "react";
import {Button, Card, Col, Row, Space} from "antd";
import {AppstoreOutlined, GithubOutlined, GitlabOutlined, ProfileOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceProductComponent {
    state: stateType,
    props: propType
}

class PreferenceProductComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card title={"更多产品"} size={"small"}
                  extra={<AppstoreOutlined style={{color: this.props.fontColor}}/>}
                  style={{border: "1px solid " + this.props.fontColor}}
                  headStyle={{
                      backgroundColor: this.props.backgroundColor,
                      color: this.props.fontColor,
                      borderBottom: "2px solid " + this.props.fontColor
                  }}
                  bodyStyle={{backgroundColor: this.props.backgroundColor}}
            >
                <Row gutter={[0, 8]}>
                    <Col span="19">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<ProfileOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor, cursor: "default"}}>
                            {"云开帮助文档"}
                        </Button>
                    </Col>
                    <Col span="5">
                        <Space>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GithubOutlined/>}
                                    href={"https://github.com/xyk953651094/SkyDocuments/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GitlabOutlined/>}
                                    href={"https://gitlab.com/xyk953651094/SkyDocuments/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                        </Space>
                    </Col>
                    <Col span="19">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<AppstoreOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor, cursor: "default"}}>
                            {"云开壁纸（React）"}
                        </Button>
                    </Col>
                    <Col span="5">
                        <Space>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GithubOutlined/>}
                                    href={"https://github.com/xyk953651094/SkyWallpaper-Electron/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GitlabOutlined/>}
                                    href={"https://gitlab.com/xyk953651094/SkyWallpaper-Electron/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                        </Space>
                    </Col>
                    <Col span="19">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<i className="bi bi-puzzle"/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor, cursor: "default"}}>
                            {"云开新标签页（Vue）"}
                        </Button>
                    </Col>
                    <Col span="5">
                        <Space>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GithubOutlined/>}
                                    href={"https://github.com/xyk953651094/SkyNewTab-Vue/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GitlabOutlined/>}
                                    href={"https://gitlab.com/xyk953651094/SkyNewTab-Vue/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                        </Space>
                    </Col>
                    <Col span="19">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<i className="bi bi-puzzle"/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor, cursor: "default"}}>

                            {"云开诗词新标签页（React）"}
                        </Button>
                    </Col>
                    <Col span="5">
                        <Space>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GithubOutlined/>}
                                    href={"https://github.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GitlabOutlined/>}
                                    href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                        </Space>
                    </Col>
                    <Col span="19">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<i className="bi bi-puzzle"/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor, cursor: "default"}}>

                            {"云开诗词新标签页（Angular）"}
                        </Button>
                    </Col>
                    <Col span="5">
                        <Space>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GithubOutlined/>}
                                    href={"https://github.com/xyk953651094/SkyNewTab-Poem-Angular/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"}
                                    shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                    icon={<GitlabOutlined/>}
                                    href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-Angular/"} target={"_self"}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default PreferenceProductComponent;