import React from "react";
import {Button, Card, Col, Row} from "antd";
import {LinkOutlined, FileImageOutlined, CodeOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceLinkComponent {
    state: stateType,
    props: propType
}

class PreferenceLinkComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.props.hoverColor;
        e.currentTarget.style.color = getFontColor(this.props.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.props.fontColor;
    }

    render() {
        return (
            <Card title={"友情链接"} size={"small"}
                  extra={<LinkOutlined style={{color: this.props.fontColor}}/>}
                  style={{border: "1px solid " + this.props.fontColor}}
                  headStyle={{
                      backgroundColor: this.props.backgroundColor,
                      color: this.props.fontColor,
                      borderBottom: "2px solid " + this.props.fontColor
                  }}
                  bodyStyle={{backgroundColor: this.props.backgroundColor}}
            >
                <Row gutter={[0, 8]}>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<FileImageOutlined />}
                                href={"https://unsplash.com/"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            Unsplash
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<FileImageOutlined />}
                                href={"https://www.pexels.com/"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            Pexels
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<FileImageOutlined />}
                                href={"https://pixabay.com/"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            Pixabay
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<CodeOutlined />}
                                href={"https://www.jetbrains.com/"} target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            JetBrains
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default PreferenceLinkComponent;