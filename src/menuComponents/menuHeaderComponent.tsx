import React from "react";
import {Button, Col, Row, Typography, Space, message} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const {Text} = Typography;

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface MenuHeaderComponent {
    state: stateType,
    props: propType
}

class MenuHeaderComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    toChromeBtnOnClick() {
        window.open("https://chromewebstore.google.com/detail/云开新标签页/mhnihmooegnonhmnapjlnbponpnclfcb/", "_self");
    }

    toEdgeBtnOnClick() {
        window.open("https://microsoftedge.microsoft.com/addons/detail/云开新标签页/ffpiddkdhlajnjakdaiijbnaigmgkhpj/", "_self");
    }

    toFirefoxBtnOnClick() {
        window.open("https://addons.mozilla.org/firefox/addon/云开新标签页/", "_self");
    }

    toSafariBtnOnClick() {
        message.warning("暂未上架 Safari");
    }

    render() {
        return (
            <Row align={"middle"}>
                <Col span={6}>
                    <Text style={{color: this.props.fontColor}}>{"菜单栏"}</Text>
                </Col>
                <Col span={18} style={{textAlign: "right"}}>
                    <Space>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<i className="bi bi-browser-chrome"></i>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                onClick={this.toChromeBtnOnClick.bind(this)}
                                style={{color: this.props.fontColor}}>
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<i className="bi bi-browser-edge"></i>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                onClick={this.toEdgeBtnOnClick.bind(this)}
                                style={{color: this.props.fontColor}}>
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<i className="bi bi-browser-firefox"></i>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                onClick={this.toFirefoxBtnOnClick.bind(this)}
                                style={{color: this.props.fontColor}}>
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<i className="bi bi-browser-safari"></i>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                onClick={this.toSafariBtnOnClick.bind(this)}
                                style={{color: this.props.fontColor}}>
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<InfoCircleOutlined />}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor, cursor: "default"}}>
                            {"V" + require('../../package.json').version}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );
    }
}

export default MenuHeaderComponent;