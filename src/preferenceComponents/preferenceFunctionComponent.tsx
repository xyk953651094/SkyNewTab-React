import React from "react";
import {Alert, Button, Card, Col, Form, message, Radio, RadioChangeEvent, Row, Space, Switch, Typography} from "antd";
import {RedoOutlined, SettingOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getPreferenceDataStorage} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const {Paragraph} = Typography;

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    getPreferenceData: any
}

type stateType = {
    preferenceData: PreferenceDataInterface,
    disableSwitch: boolean
}

interface PreferenceFunctionComponent {
    state: stateType,
    props: propType
}

class PreferenceFunctionComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            preferenceData: getPreferenceDataStorage(),
            disableSwitch: false
        };
    }

    // 搜索引擎
    searchEngineRadioOnChange(event: RadioChangeEvent) {
        this.setState({
            preferenceData: this.setPreferenceData({searchEngine: event.target.value}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已更换搜索引擎");
        })
    }

    // 按钮形状
    buttonShapeRadioOnChange(event: RadioChangeEvent) {
        this.setState({
            preferenceData: this.setPreferenceData({buttonShape: event.target.value}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已更换按钮形状，一秒后刷新页面");
            this.refreshWindow();
        })
    }

    // 简洁模式
    simpleModeSwitchOnChange(checked: boolean) {
        this.setState({
            preferenceData: this.setPreferenceData({simpleMode: checked}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            if (checked) {
                message.success("已开启简洁模式，一秒后刷新页面");
            } else {
                message.success("已关闭简洁模式，一秒后刷新页面");
            }
            this.refreshWindow();
        })
    }

    displayAlertSwitchOnChange(checked: boolean) {
        this.setState({
            preferenceData: this.setPreferenceData({displayAlert: checked}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            if (checked) {
                message.success("已显示提示信息，一秒后刷新页面");
            } else {
                message.success("已隐藏提示信息，一秒后刷新页面");

            }
            this.refreshWindow();
        })
    }

    // 重置设置
    clearStorageBtnOnClick() {
        localStorage.clear();
        message.success("已重置所有内容，一秒后刷新页面");
        this.refreshWindow();
    }

    refreshWindow() {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    setPreferenceData(data: Object) {
        return Object.assign({}, this.state.preferenceData, data);
    }

    render() {
        return (
            <Card title={"功能设置"} size={"small"}
                  extra={<SettingOutlined style={{color: this.props.fontColor}}/>}
                  style={{border: "1px solid " + this.props.fontColor}}
                  headStyle={{
                      backgroundColor: this.props.backgroundColor,
                      color: this.props.fontColor,
                      borderBottom: "2px solid " + this.props.fontColor
                  }}
                  bodyStyle={{backgroundColor: this.props.backgroundColor}}
            >
                <Form colon={false} initialValues={this.state.preferenceData}>
                    <Form.Item name={"searchEngine"} label={"搜索引擎"}>
                        <Radio.Group buttonStyle={"solid"}
                                     onChange={this.searchEngineRadioOnChange.bind(this)}>
                            <Row gutter={[0, 8]}>
                                <Col span={12}><Radio value={"baidu"}>Baidu</Radio></Col>
                                <Col span={12}><Radio value={"bing"}>Bing</Radio></Col>
                                <Col span={12}><Radio value={"google"}>Google</Radio></Col>
                                <Col span={12}><Radio value={"yandex"}>Yandex</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"buttonShape"} label={"按钮形状"}>
                        <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                     onChange={this.buttonShapeRadioOnChange.bind(this)}>
                            <Row>
                                <Col span={12}><Radio value={"round"}>圆形</Radio></Col>
                                <Col span={12}><Radio value={"default"}>方形</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item name={"simpleMode"} label={"简洁模式"} valuePropName={"checked"}>
                                <Switch checkedChildren="已开启" unCheckedChildren="已关闭"
                                        disabled={this.state.disableSwitch}
                                        onChange={this.simpleModeSwitchOnChange.bind(this)}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={"displayAlert"} label={"提示信息"} valuePropName={"checked"}>
                                <Switch checkedChildren="已显示" unCheckedChildren="已隐藏"
                                        onChange={this.displayAlertSwitchOnChange.bind(this)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name={"clearStorageButton"} label={"危险设置"}>
                        <Button type={"text"} shape={this.state.preferenceData.buttonShape} icon={<RedoOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                onClick={this.clearStorageBtnOnClick.bind(this)}
                                style={{color: this.props.fontColor}}>
                            重置插件
                        </Button>
                    </Form.Item>
                    <Alert
                        message="提示信息"
                        description={
                            <Paragraph>
                                <ol>
                                    <Space direction={"vertical"}>
                                        <li>重置插件将清空缓存恢复初始设置</li>
                                        <li>插件出现任何异常可尝试重置插件</li>
                                    </Space>
                                </ol>
                            </Paragraph>
                        }
                        type="info"
                        style={{display: this.state.preferenceData.displayAlert ? "block" : "none"}}
                    />
                </Form>
            </Card>
        );
    }
}

export default PreferenceFunctionComponent;