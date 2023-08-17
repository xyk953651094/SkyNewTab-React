import React from "react";
import {Row, Col, Avatar, Button, Card} from "antd";
import "../stylesheets/clockComponent.scss"
import {LinkOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
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
                        <Button type={"text"} shape={"round"} href={"https://unsplash.com/"}
                                target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            <Avatar size={16} shape={"square"} src={"https://unsplash.com/favicon.ico"}/>
                            &nbsp;&nbsp;Unsplash
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={"round"} href={"https://www.pexels.com/"}
                                target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            <Avatar size={16} shape={"square"} src={"https://www.pexels.com/favicon.ico"}/>
                            &nbsp;&nbsp;Pexels
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={"round"} href={"https://pixabay.com/"}
                                target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            <Avatar size={16} shape={"square"} src={"https://pixabay.com/favicon.ico"}/>
                            &nbsp;&nbsp;Pixabay
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={"round"} href={"https://www.jetbrains.com/"}
                                target={"_blank"}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.props.fontColor}}>
                            <Avatar size={16} shape={"square"} src={"https://www.jetbrains.com/favicon.ico"}/>
                            &nbsp;&nbsp;JetBrains
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default PreferenceLinkComponent;