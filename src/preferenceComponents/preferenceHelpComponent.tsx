import React from "react";
import {Button, Card, Col, Row} from "antd";
import {GithubOutlined, GitlabOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceHelpComponent {
    state: stateType,
    props: propType
}

class PreferenceHelpComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card title={"帮助文档"} size={"small"}
                  extra={<QuestionCircleOutlined style={{color: this.props.fontColor}}/>}
                  style={{border: "1px solid " + this.props.fontColor}}
                  headStyle={{
                      backgroundColor: this.props.backgroundColor,
                      color: this.props.fontColor,
                      borderBottom: "2px solid " + this.props.fontColor
                  }}
                  bodyStyle={{backgroundColor: this.props.backgroundColor}}
            >
                <Row>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                                href={"https://xyk953651094.github.io/SkyDocuments/"} target={"_blank"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            {"GitHub Pages"}
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                                href={"https://xyk953651094.gitlab.io/SkyDocuments/"} target={"_blank"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            {"GitLab Pages"}
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default PreferenceHelpComponent;