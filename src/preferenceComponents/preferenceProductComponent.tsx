import React from "react";
import {Button, Card, Col, Row, Space} from "antd";
import {AppstoreOutlined, GithubOutlined, GitlabOutlined} from "@ant-design/icons";
import {changeThemeColor, getFontColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    buttonShape: "circle" | "default" | "round" | undefined,
}

interface PreferenceProductComponent {
    state: stateType,
    props: propType
}

class PreferenceProductComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            buttonShape: "round",
        };
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.props.hoverColor;
        e.currentTarget.style.color = getFontColor(this.props.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.props.fontColor;
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                buttonShape: nextProps.preferenceData.buttonShape === "round" ? "circle" : "default"
            })
        }
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
                    <Col span="16">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<AppstoreOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor, cursor: "default"}}>
                            {"云开新标签页（Vue）"}
                        </Button>
                    </Col>
                    <Col span="8">
                        <Space>
                            <Button type={"text"} shape={this.state.buttonShape} icon={<GithubOutlined/>}
                                    href={"https://github.com/xyk953651094/SkyNewTab-Vue/"} target={"_blank"}
                                    onMouseOver={this.btnMouseOver.bind(this)}
                                    onMouseOut={this.btnMouseOut.bind(this)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"} shape={this.state.buttonShape} icon={<GitlabOutlined />}
                                    href={"https://gitlab.com/xyk953651094/SkyNewTab-Vue/"} target={"_blank"}
                                    onMouseOver={this.btnMouseOver.bind(this)}
                                    onMouseOut={this.btnMouseOut.bind(this)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                        </Space>
                    </Col>
                    <Col span="16">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<AppstoreOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor, cursor: "default"}}>

                            {"云开诗词新标签页"}
                        </Button>
                    </Col>
                    <Col span="8">
                        <Space>
                            <Button type={"text"} shape={this.state.buttonShape} icon={<GithubOutlined/>}
                                    href={"https://github.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_blank"}
                                    onMouseOver={this.btnMouseOver.bind(this)}
                                    onMouseOut={this.btnMouseOut.bind(this)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"} shape={this.state.buttonShape} icon={<GitlabOutlined />}
                                    href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_blank"}
                                    onMouseOver={this.btnMouseOver.bind(this)}
                                    onMouseOut={this.btnMouseOut.bind(this)}
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