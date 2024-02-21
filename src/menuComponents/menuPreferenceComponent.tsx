import React from "react";
import {
    Button,
    Card, Checkbox,
    Col,
    Form, Input,
    message, Modal,
    Radio,
    RadioChangeEvent,
    Row, Select,
    Space,
    Switch,
    Typography
} from "antd";
import {CheckOutlined, RedoOutlined, SettingOutlined, StopOutlined} from "@ant-design/icons";
import {
    btnMouseOut,
    btnMouseOver,
    getPreferenceDataStorage, getTimeDetails, isEmpty, resetRadioColor, resetSwitchColor,
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import {defaultPreferenceData} from "../typescripts/publicConstants";
import {CheckboxValueType} from "antd/es/checkbox/Group";

const {Text} = Typography;

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    getPreferenceData: any,
}

type stateType = {
    formDisabled: boolean,  // 刷新页面前禁止更改设置
    lastImageRequestTime: string,
    disableImageTopic: boolean,
    imageTopicStatus: string,
    customTopicStatus: string,
    customTopicInputValue: string,
    displayResetPreferenceModal: boolean,
    displayClearStorageModal: boolean,
    preferenceData: PreferenceDataInterface,
}

interface MenuPreferenceComponent {
    state: stateType,
    props: propType
}

class MenuPreferenceComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            formDisabled: false,
            lastImageRequestTime: "暂无信息",
            disableImageTopic: false,
            imageTopicStatus: "已启用图片主题",
            customTopicStatus: "已禁用自定主题",
            customTopicInputValue: "",
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
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);

            message.success("已更换搜索引擎");
            // resetRadioColor(event.target.value, ["bing", "google"], this.props.hoverColor);
        })
    }

    // 按钮形状
    buttonShapeRadioOnChange(event: RadioChangeEvent) {
        this.setState({
            preferenceData: this.setPreferenceData({buttonShape: event.target.value}),
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);

            message.success("已更换按钮形状");
            // resetRadioColor(event.target.value, ["round", "default"], this.props.hoverColor);
        })
    }
    
    // 图片动效
    dynamicEffectRadioOnChange(event: RadioChangeEvent) {
        this.setState({
            formDisabled: true,
            preferenceData: this.setPreferenceData({dynamicEffect: event.target.value}),
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);
            message.success("已更换显示效果，一秒后刷新页面");
            // resetRadioColor(event.target.value, ["all", "translate", "rotate", "close"], this.props.hoverColor);
            this.refreshWindow();
        })
    }

    // 图片质量
    imageQualityRadioOnChange(event: RadioChangeEvent) {
        this.setState({
            formDisabled: true,
            preferenceData: this.setPreferenceData({imageQuality: event.target.value}),
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);
            message.success("已更换图片质量，一秒后刷新页面");
            // resetRadioColor(event.target.value, ["full", "regular"], this.props.hoverColor);
            this.refreshWindow();
        })
    }

    // 图片主题
    imageTopicsCheckboxOnChange(checkedValues: CheckboxValueType[]) {
        this.setState({
            preferenceData: this.setPreferenceData({imageTopics: checkedValues}),
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);
            message.success("已更换图片主题，下次切换图片时生效");
            if (checkedValues.length === 0) {
                message.info("全不选与全选的效果一样");
            }
            // resetCheckboxColor(checkedValues, imageTopics, this.props.hoverColor);
        })
    }

    // 自定主题
    customTopicInputOnChange(e: any) {
        this.setState({
            customTopicInputValue: e.target.value
        })
    }

    submitCustomTopicBtnOnClick() {
        this.setState({
            preferenceData: this.setPreferenceData({customTopic: this.state.customTopicInputValue}),
            disableImageTopic: !isEmpty(this.state.customTopicInputValue),
            imageTopicStatus: isEmpty(this.state.customTopicInputValue)? "已启用图片主题" : "已禁用图片主题",
            customTopicStatus: isEmpty(this.state.customTopicInputValue)? "已禁用自定主题" : "已启用自定主题",
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);

            if(!isEmpty(this.state.customTopicInputValue)) {
                message.success("已启用自定主题，下次切换图片时生效");
            } else {
                this.setState({
                    formDisabled: true,
                }, () => {
                    message.success("已禁用自定主题，一秒后刷新页面");
                    this.refreshWindow();
                })
            }
        })
    }

    clearCustomTopicBtnOnClick() {
        this.setState({
            formDisabled: true,
            preferenceData: this.setPreferenceData({customTopic: ""}),
            disableImageTopic: false,
            imageTopicStatus: "已启用图片主题",
            customTopicStatus: "已禁用自定主题",
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);
            message.success("已禁用自定主题，一秒后刷新页面");
            this.refreshWindow();
        })
    }

    changeImageTimeOnChange(value: string) {
        this.setState({
            formDisabled: true,
            preferenceData: this.setPreferenceData({changeImageTime: value}),
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);
            message.success("已修改切换间隔，一秒后刷新页面");
            this.refreshWindow();
        })
    }

    nightModeSwitchOnChange(checked: boolean, e: any) {
        this.setState({
            preferenceData: this.setPreferenceData({nightMode: checked}),
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);
            if (checked) {
                message.success("已降低背景亮度");
            } else {
                message.success("已恢复背景亮度");
            }
            // resetSwitchColor("#nightModeSwitch", checked, this.props.hoverColor);
        })
    }

    // 纯色模式
    noImageModeSwitchOnChange(checked: boolean, e: any) {
        this.setState({
            formDisabled: true,
            preferenceData: this.setPreferenceData({noImageMode: checked}),
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);
            if (checked) {
                message.success("已开启纯色模式，一秒后刷新页面");
            } else {
                message.success("已关闭纯色模式，一秒后刷新页面");
            }
            // resetSwitchColor("#noImageModeSwitch", checked, this.props.hoverColor);
            this.refreshWindow();
        })
    }

    // 极简模式
    simpleModeSwitchOnChange(checked: boolean, e: any) {
        this.setState({
            preferenceData: this.setPreferenceData({simpleMode: checked}),
        }, () => {
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            this.props.getPreferenceData(this.state.preferenceData);

            if (checked) {
                message.success("已开启极简模式");
            } else {
                this.setState({
                    formDisabled: true,
                }, () => {
                    message.success("已关闭极简模式，一秒后刷新页面");
                    this.refreshWindow();
                })
            }
            // resetSwitchColor("#simpleModeSwitch", checked, this.props.hoverColor)
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
            formDisabled: true,
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
            formDisabled: true,
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

    componentWillMount() {
        let lastImageRequestTimeStorage: any = localStorage.getItem("lastImageRequestTime");
        if (lastImageRequestTimeStorage !== null) {
            this.setState({
                lastImageRequestTime: getTimeDetails(new Date(parseInt(lastImageRequestTimeStorage))).showDetail,
            })
        }

        this.setState({
            disableImageTopic: !isEmpty(this.state.preferenceData.customTopic)
        }, () => {
            if (this.state.disableImageTopic) {
                this.setState({
                    imageTopicStatus: "已禁用图片主题",
                    customTopicStatus: "已启用自定主题",
                })
            }
        })
    }

    render() {
        return (
            <>
                <Card title={"偏好设置"} size={"small"}
                      extra={<SettingOutlined style={{color: this.props.fontColor}}/>}
                      style={{border: "1px solid " + this.props.fontColor}}
                      headStyle={{
                          backgroundColor: this.props.backgroundColor,
                          color: this.props.fontColor,
                          borderBottom: "2px solid " + this.props.fontColor
                      }}
                      bodyStyle={{backgroundColor: this.props.backgroundColor}}
                >
                    <Form colon={false} initialValues={this.state.preferenceData} disabled={this.state.formDisabled}>
                        <Form.Item name={"searchEngine"} label={"搜索引擎"}>
                            <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                         onChange={this.searchEngineRadioOnChange.bind(this)}>
                                <Row>
                                    <Col span={12}><Radio value={"bing"} id={"bing"}>必应</Radio></Col>
                                    <Col span={12}><Radio value={"google"} id={"google"}>谷歌</Radio></Col>
                                </Row>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={"buttonShape"} label={"按钮形状"}>
                            <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                         onChange={this.buttonShapeRadioOnChange.bind(this)}>
                                <Row>
                                    <Col span={12}><Radio value={"round"} id={"round"}>圆形</Radio></Col>
                                    <Col span={12}><Radio value={"default"} id={"default"}>方形</Radio></Col>
                                </Row>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={"dynamicEffect"} label={"鼠标互动"}>
                            <Radio.Group buttonStyle={"solid"}
                                         onChange={this.dynamicEffectRadioOnChange.bind(this)}>
                                <Row gutter={[0, 8]}>
                                    <Col span={12}><Radio value={"all"} id={"all"}>视差</Radio></Col>
                                    <Col span={12}><Radio value={"translate"} id={"translate"}>平移</Radio></Col>
                                    <Col span={12}><Radio value={"rotate"} id={"rotate"}>旋转</Radio></Col>
                                    <Col span={12}><Radio value={"close"} id={"close"}>关闭</Radio></Col>
                                </Row>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={"imageQuality"} label={"图片质量"}>
                            <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                         onChange={this.imageQualityRadioOnChange.bind(this)}>
                                <Row>
                                    <Col span={12}><Radio value={"full"} id={"full"}>清晰</Radio></Col>
                                    <Col span={12}><Radio value={"regular"} id={"regular"}>省流</Radio></Col>
                                </Row>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={"imageTopics"} label={"图片主题"}  extra={this.state.imageTopicStatus}>
                            <Checkbox.Group disabled={this.state.disableImageTopic}
                                            onChange={this.imageTopicsCheckboxOnChange.bind(this)}>
                                <Row gutter={[0, 8]}>
                                    <Col span={12}><Checkbox name={"travel"}
                                                             value={"Fzo3zuOHN6w"} id={"Fzo3zuOHN6w"}>旅游</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"wallpapers"}
                                                             value={"bo8jQKTaE0Y"} id={"bo8jQKTaE0Y"}>壁纸</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"3d-renders"}
                                                             value={"CDwuwXJAbEw"} id={"CDwuwXJAbEw"}>三维</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"textures-patterns"}
                                                             value={"iUIsnVtjB0Y"} id={"iUIsnVtjB0Y"}>纹理</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"experimental"}
                                                             value={"qPYsDzvJOYc"} id={"qPYsDzvJOYc"}>实验</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"architecture"}
                                                             value={"rnSKDHwwYUk"} id={"rnSKDHwwYUk"}>建筑</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"nature"}
                                                             value={"6sMVjTLSkeQ"} id={"6sMVjTLSkeQ"}>自然</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"business-work"}
                                                             value={"aeu6rL-j6ew"} id={"aeu6rL-j6ew"}>商务</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"fashion"}
                                                             value={"S4MKLAsBB74"} id={"S4MKLAsBB74"}>时尚</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"film"}
                                                             value={"hmenvQhUmxM"} id={"hmenvQhUmxM"}>电影</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"food-drink"}
                                                             value={"xjPR4hlkBGA"} id={"xjPR4hlkBGA"}>饮食</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"health"}
                                                             value={"_hb-dl4Q-4U"} id={"_hb-dl4Q-4U"}>健康</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"people"}
                                                             value={"towJZFskpGg"} id={"towJZFskpGg"}>人物</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"interiors"}
                                                             value={"R_Fyn-Gwtlw"} id={"R_Fyn-Gwtlw"}>精神</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"street-photography"}
                                                             value={"xHxYTMHLgOc"} id={"xHxYTMHLgOc"}>街头</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"animals"}
                                                             value={"Jpg6Kidl-Hk"} id={"Jpg6Kidl-Hk"}>动物</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"spirituality"}
                                                             value={"_8zFHuhRhyo"} id={"_8zFHuhRhyo"}>灵魂</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"arts-culture"}
                                                             value={"bDo48cUhwnY"} id={"bDo48cUhwnY"}>文化</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"history"}
                                                             value={"dijpbw99kQQ"} id={"dijpbw99kQQ"}>历史</Checkbox></Col>
                                    <Col span={12}><Checkbox name={"athletics"}
                                                             value={"Bn-DjrcBrwo"} id={"Bn-DjrcBrwo"}>体育</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item label={"自定主题"} extra={this.state.customTopicStatus}>
                            <Space>
                                <Form.Item name={"customTopic"} noStyle>
                                    <Input style={{width: 170}} placeholder="英文搜索最准确" value={this.state.customTopicInputValue} onChange={this.customTopicInputOnChange.bind(this)} allowClear/>
                                </Form.Item>
                                <Button type={"text"} shape={this.state.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                        icon={<CheckOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                        onClick={this.submitCustomTopicBtnOnClick.bind(this)}
                                        style={{color: this.props.fontColor}}>
                                </Button>
                                <Button type={"text"} shape={this.state.preferenceData.buttonShape === "round" ? "circle" : "default"}
                                        icon={<StopOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                        onClick={this.clearCustomTopicBtnOnClick.bind(this)}
                                        style={{color: this.props.fontColor}}>
                                </Button>
                            </Space>
                        </Form.Item>
                        <Form.Item name={"changeImageTime"} label={"切换间隔"}
                                   extra={"上次切换：" + this.state.lastImageRequestTime}>
                            <Select style={{width: 170}} onChange={this.changeImageTimeOnChange.bind(this)}
                                    options={[
                                        {value: "0", label: "每次刷新（不推荐）"},
                                        {value: "900000", label: "每 15 分钟"},
                                        {value: "1800000", label: "每 30 分钟"},
                                        {value: "3600000", label: "每 60 分钟"},
                                    ]}
                            />
                        </Form.Item>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={"nightMode"} label={"降低亮度"} valuePropName={"checked"}>
                                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"nightModeSwitch"}
                                            onChange={this.nightModeSwitchOnChange.bind(this)}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={"noImageMode"} label={"纯色模式"} valuePropName={"checked"}>
                                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"noImageModeSwitch"}
                                            onChange={this.noImageModeSwitchOnChange.bind(this)}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={"simpleMode"} label={"极简模式"} valuePropName={"checked"}>
                                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"simpleModeSwitch"}
                                            onChange={this.simpleModeSwitchOnChange.bind(this)}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name={"clearStorageButton"} label={"危险设置"} extra={"出现异常时可尝试重置设置或插件"}>
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
                       styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
                >
                    <Text style={{color: this.props.fontColor}}>
                        {"注意：所有设置项将被重置为默认值"}
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
                       styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
                >
                    <Text style={{color: this.props.fontColor}}>
                        {"注意：所有设置项将被重置为默认值，所有数据将被清空"}
                    </Text>
                </Modal>
            </>
        );
    }
}

export default MenuPreferenceComponent;