import React from "react";
import {Button, Card, Col, Row} from "antd";
import {DislikeOutlined, LikeOutlined, MailOutlined} from "@ant-design/icons";
import {btnMouseOver, btnMouseOut} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceEmailComponent {
    state: stateType,
    props: propType
}

class PreferenceEmailComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card title={"联系作者"} size={"small"}
                  extra={<MailOutlined style={{color: this.props.fontColor}}/>}
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
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<LikeOutlined/>}
                                href={"mailto:xyk953651094@qq.com?&subject=云开新标签页-功能建议"} target={"_blank"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            功能建议
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<DislikeOutlined/>}
                                href={"mailto:xyk953651094@qq.com?&subject=云开新标签页-问题反馈"} target={"_blank"}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                style={{color: this.props.fontColor}}>
                            问题反馈
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default PreferenceEmailComponent;