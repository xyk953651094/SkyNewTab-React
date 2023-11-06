import React from "react";
import {Button, Card, Space} from "antd";
import {CalendarOutlined, CloudOutlined, CodeOutlined, FileImageOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceInfoComponent {
    state: stateType,
    props: propType
}

class PreferenceInfoComponent extends React.Component {
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
            <Card title={"产品信息"} size={"small"}
                  extra={<InfoCircleOutlined style={{color: this.props.fontColor}}/>}
                  style={{border: "1px solid " + this.props.fontColor}}
                  headStyle={{
                      backgroundColor: this.props.backgroundColor,
                      color: this.props.fontColor,
                      borderBottom: "2px solid " + this.props.fontColor
                  }}
                  bodyStyle={{backgroundColor: this.props.backgroundColor}}
            >
                <Space direction={"vertical"}>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CalendarOutlined/>}
                            href={"https://www.mxnzp.com/"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            style={{color: this.props.fontColor}}>
                        {"节气来源：https://www.mxnzp.com"}
                    </Button>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CloudOutlined/>}
                            href={"https://www.jinrishici.com/"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            style={{color: this.props.fontColor}}>
                        {"天气来源：https://www.jinrishici.com"}
                    </Button>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<FileImageOutlined/>}
                            href={"https://unsplash.com/"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            style={{color: this.props.fontColor}}>
                        {"图片来源：https://unsplash.com"}
                    </Button>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CodeOutlined/>}
                            href={"https://www.jetbrains.com.cn/community/opensource/#support/"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            style={{color: this.props.fontColor}}>
                        {"开发支持：JetBrains 免费许可证计划"}
                    </Button>
                </Space>
            </Card>
        );
    }
}

export default PreferenceInfoComponent;