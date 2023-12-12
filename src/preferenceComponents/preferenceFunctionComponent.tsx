import React from "react";
import {
    Button,
    Card,
    Col,
    Form,
    message, Modal,
    Radio,
    RadioChangeEvent,
    Row,
    Space,
    Switch,
    Typography
} from "antd";
import {RedoOutlined, SettingOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getPreferenceDataStorage} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import {defaultPreferenceData} from "../typescripts/publicConstants";

const {Text} = Typography;

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    getPreferenceData: any
}

type stateType = {
    displayResetPreferenceModal: boolean,
    displayClearStorageModal: boolean,
    preferenceData: PreferenceDataInterface,
}

interface PreferenceFunctionComponent {
    state: stateType,
    props: propType
}

class PreferenceFunctionComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            displayResetPreferenceModal: false,
            displayClearStorageModal: false,
            preferenceData: getPreferenceDataStorage(),
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
            message.success("已更换按钮形状");
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
                message.success("已开启简洁模式");
            } else {
                message.success("已关闭简洁模式");
            }
        })
    }

    // 重置设置
    resetPreferenceBtnOnClick() {
        this.setState({
            displayResetPreferenceModal: true,
        })
    }
    resetPreferenceOkBtnOnClick() {
        this.setState({
            displayResetPreferenceModal: false,
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
            message.success("已重置设置，一秒后刷新页面");
            this.refreshWindow();
        })
    }
    resetPreferenceCancelBtnOnClick() {
        this.setState({
            displayResetPreferenceModal: false,
        })
    }

    // 重置插件
    clearStorageBtnOnClick() {
        this.setState({
            displayClearStorageModal: true,
        })
    }

    clearStorageOkBtnOnClick() {
        this.setState({
            displayClearStorageModal: false,
        }, () => {
            localStorage.clear();
            message.success("已重置插件，一秒后刷新页面");
            this.refreshWindow();
        })
    }

    clearStorageCancelBtnOnClick() {
        this.setState({
            displayClearStorageModal: false,
        })
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
            <>
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
                                    <Col span={12}><Radio value={"baidu"}>百度</Radio></Col>
                                    <Col span={12}><Radio value={"bing"}>必应</Radio></Col>
                                    <Col span={12}><Radio value={"google"}>谷歌</Radio></Col>
                                    <Col span={12}><Radio value={"yandex"}>央捷科斯</Radio></Col>
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
                        <Form.Item name={"simpleMode"} label={"简洁模式"} valuePropName={"checked"}>
                            <Switch checkedChildren="已开启" unCheckedChildren="已关闭"
                                    onChange={this.simpleModeSwitchOnChange.bind(this)}/>
                        </Form.Item>
                        <Form.Item name={"clearStorageButton"} label={"危险设置"}>
                            <Space>
                                <Button type={"text"} shape={this.state.preferenceData.buttonShape} icon={<RedoOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                        onClick={this.resetPreferenceBtnOnClick.bind(this)}
                                        style={{color: this.props.fontColor}}>
                                    重置设置
                                </Button>
                                <Button type={"text"} shape={this.state.preferenceData.buttonShape} icon={<RedoOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                        onClick={this.clearStorageBtnOnClick.bind(this)}
                                        style={{color: this.props.fontColor}}>
                                    重置插件
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
                <Modal title={
                    <Text style={{color: this.props.fontColor}}>
                        {"确定重置设置？"}
                    </Text>
                }
                       closeIcon={false}
                       centered
                       open={this.state.displayResetPreferenceModal}
                       onOk={this.resetPreferenceOkBtnOnClick.bind(this)}
                       onCancel={this.resetPreferenceCancelBtnOnClick.bind(this)}
                       destroyOnClose={true}
                       maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                >
                    <Text style={{color: this.props.fontColor}}>
                        {"注意：所有设置项将被重置为默认值，确定重置吗？"}
                    </Text>
                </Modal>
                <Modal title={
                    <Text style={{color: this.props.fontColor}}>
                        {"确定重置插件？"}
                    </Text>
                }
                       closeIcon={false}
                       centered
                       open={this.state.displayClearStorageModal}
                       onOk={this.clearStorageOkBtnOnClick.bind(this)}
                       onCancel={this.clearStorageCancelBtnOnClick.bind(this)}
                       destroyOnClose={true}
                       maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                >
                    <Text style={{color: this.props.fontColor}}>
                        {"注意：本地存储的所有数据将被清空，确定重置吗？"}
                    </Text>
                </Modal>
            </>
        );
    }
}

export default PreferenceFunctionComponent;