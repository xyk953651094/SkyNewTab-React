import React from "react";
import {Button, Card, Space} from "antd";
import {InfoCircleOutlined, CalendarOutlined, CloudOutlined, FileImageOutlined} from "@ant-design/icons";
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
                            className={"poemFont"} style={{color: this.props.fontColor}}>
                        {"节气来源：https://www.mxnzp.com"}
                    </Button>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CloudOutlined/>}
                            href={"https://www.jinrishici.com/"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            className={"poemFont"} style={{color: this.props.fontColor}}>
                        {"天气来源：https://www.jinrishici.com"}
                    </Button>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<FileImageOutlined/>}
                            href={"https://unsplash.com/"} target={"_blank"}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            className={"poemFont"} style={{color: this.props.fontColor}}>
                        {"图片来源：https://unsplash.com"}
                    </Button>
                    {/*<Alert*/}
                    {/*    message="免责声明"*/}
                    {/*    description="本产品的所有数据源自第三方接口，内容不受作者本人控制，不代表作者本人的观点与立场"*/}
                    {/*    type="info"*/}
                    {/*/>*/}
                </Space>
            </Card>
        );
    }
}

export default PreferenceInfoComponent;