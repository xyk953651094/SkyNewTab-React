import React from "react";
import {Button, Card, Col, Row} from "antd";
import {GithubOutlined, GitlabOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface MenuInfoComponent {
    state: stateType,
    props: propType
}

class MenuInfoComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card title={"产品信息"} size={"small"}
                  extra={<InfoCircleOutlined style={{color: this.props.fontColor}}/>}
                  style={{border: "1px solid " + this.props.fontColor}}
                  styles={{
                      header: {
                          backgroundColor: this.props.backgroundColor,
                          color: this.props.fontColor,
                          borderBottom: "2px solid " + this.props.fontColor
                      },
                      body: {
                          backgroundColor: this.props.backgroundColor
                      }
                  }}
            >
                <Row gutter={[0, 8]}>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyNewTab-React/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            {"产品主页"}
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                                href={"https://gitlab.com/xyk953651094/SkyNewTab-React/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            {"产品主页"}
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyNewTab-React/releases/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            {"更新日志"}
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                                href={"https://gitlab.com/xyk953651094/SkyNewTab-React/-/releases/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            {"更新日志"}
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                                href={"https://xyk953651094.github.io/SkyDocuments/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            {"帮助文档"}
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                                href={"https://xyk953651094.gitlab.io/SkyDocuments/"} target={"_self"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            {"帮助文档"}
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default MenuInfoComponent;