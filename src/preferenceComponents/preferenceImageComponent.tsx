import React from "react";
import {
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Input,
    message,
    Radio,
    RadioChangeEvent,
    Row,
    Select,
    Space,
    Switch
} from "antd";
import {CheckOutlined, SettingOutlined, StopOutlined} from "@ant-design/icons";
import {
    btnMouseOut,
    btnMouseOver,
    getPreferenceDataStorage,
    getTimeDetails,
    isEmpty
} from "../typescripts/publicFunctions";
import {CheckboxValueType} from "antd/es/checkbox/Group";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import $ from "jquery";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    getPreferenceData: any
}

type stateType = {
    preferenceData: PreferenceDataInterface,
    buttonShape: "circle" | "default" | "round" | undefined,
    lastRequestTime: string,
    disableImageTopic: boolean
}

interface PreferenceImageComponent {
    state: stateType,
    props: propType
}

class PreferenceImageComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            preferenceData: getPreferenceDataStorage(),
            buttonShape: "round",
            lastRequestTime: "暂无信息",
            disableImageTopic: false
        };
    }

    // 图片动效
    dynamicEffectRadioOnChange(event: RadioChangeEvent) {
        this.setState({
            preferenceData: this.setPreferenceData({dynamicEffect: event.target.value}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已更换显示效果，一秒后刷新页面");
            this.refreshWindow();
        })
    }

    // 图片质量
    imageQualityRadioOnChange(event: RadioChangeEvent) {
        this.setState({
            preferenceData: this.setPreferenceData({imageQuality: event.target.value}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已更换图片质量，一秒后刷新页面");
            this.refreshWindow();
        })
    }

    // 图片主题
    imageTopicsCheckboxOnChange(checkedValues: CheckboxValueType[]) {
        this.setState({
            preferenceData: this.setPreferenceData({imageTopics: checkedValues}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已更换图片主题，下次切换图片时生效");
            if (checkedValues.length === 0) {
                message.info("全不选与全选的效果一样");
            }
        })
    }

    // 自定义主题
    submitCustomTopicBtnOnClick() {
        let inputValue = $("#customTopicInput").val();
        this.setState({
            preferenceData: this.setPreferenceData({customTopic: inputValue}),
            disableImageTopic: !isEmpty(inputValue)
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已启用自定主题，下次切换图片时生效");
        })
    }

    clearCustomTopicBtnOnClick() {
        this.setState({
            preferenceData: this.setPreferenceData({customTopic: ""}),
            disableImageTopic: false
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已禁用自定主题，一秒后刷新页面");
            this.refreshWindow();
        })
    }

    changeImageTimeOnChange(value: string) {
        this.setState({
            preferenceData: this.setPreferenceData({changeImageTime: value}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已修改切换间隔，一秒后刷新页面");
            this.refreshWindow();
        })
    }

    nightModeSwitchOnChange(checked: boolean, e: any) {
        this.setState({
            preferenceData: this.setPreferenceData({nightMode: checked}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            if (checked) {
                message.success("已降低背景亮度");
            } else {
                message.success("已恢复背景亮度");
            }
        })
    }

    // 无图模式
    noImageModeSwitchOnChange(checked: boolean, e: any) {
        this.setState({
            preferenceData: this.setPreferenceData({noImageMode: checked}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            if (checked) {
                message.success("已开启无图模式，一秒后刷新页面");
            } else {
                message.success("已关闭无图模式，一秒后刷新页面");
            }
            this.refreshWindow();
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
        let tempLastRequestTime: any = localStorage.getItem("lastImageRequestTime");
        if (tempLastRequestTime !== null) {
            this.setState({
                lastRequestTime: getTimeDetails(new Date(parseInt(tempLastRequestTime))).showDetail,
            })
        }

        this.setState({
            buttonShape: this.state.preferenceData.buttonShape === "round" ? "circle" : "default",
            disableImageTopic: !isEmpty(this.state.preferenceData.customTopic)
        })
    }

    render() {
        return (
            <Card title={"背景设置"} size={"small"}
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
                    <Form.Item name={"dynamicEffect"} label={"鼠标互动"}>
                        <Radio.Group buttonStyle={"solid"}
                                     onChange={this.dynamicEffectRadioOnChange.bind(this)}>
                            <Row gutter={[0, 8]}>
                                <Col span={12}><Radio value={"all"}>视差</Radio></Col>
                                <Col span={12}><Radio value={"translate"}>平移</Radio></Col>
                                <Col span={12}><Radio value={"rotate"}>旋转</Radio></Col>
                                <Col span={12}><Radio value={"close"}>关闭</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"imageQuality"} label={"图片质量"}>
                        <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                     onChange={this.imageQualityRadioOnChange.bind(this)}>
                            <Row>
                                <Col span={12}><Radio value={"full"}>清晰</Radio></Col>
                                <Col span={12}><Radio value={"regular"}>省流</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"imageTopics"} label={"图片主题"}>
                        <Checkbox.Group disabled={this.state.disableImageTopic}
                                        onChange={this.imageTopicsCheckboxOnChange.bind(this)}>
                            <Row gutter={[0, 8]}>
                                <Col span={12}><Checkbox name={"travel"}
                                                         value={"Fzo3zuOHN6w"}>旅游</Checkbox></Col>
                                <Col span={12}><Checkbox name={"wallpapers"}
                                                         value={"bo8jQKTaE0Y"}>壁纸</Checkbox></Col>
                                <Col span={12}><Checkbox name={"3d-renders"}
                                                         value={"CDwuwXJAbEw"}>三维</Checkbox></Col>
                                <Col span={12}><Checkbox name={"textures-patterns"}
                                                         value={"iUIsnVtjB0Y"}>纹理</Checkbox></Col>
                                <Col span={12}><Checkbox name={"experimental"}
                                                         value={"qPYsDzvJOYc"}>实验</Checkbox></Col>
                                <Col span={12}><Checkbox name={"architecture"}
                                                         value={"rnSKDHwwYUk"}>建筑</Checkbox></Col>
                                <Col span={12}><Checkbox name={"nature"}
                                                         value={"6sMVjTLSkeQ"}>自然</Checkbox></Col>
                                <Col span={12}><Checkbox name={"business-work"}
                                                         value={"aeu6rL-j6ew"}>商务</Checkbox></Col>
                                <Col span={12}><Checkbox name={"fashion"}
                                                         value={"S4MKLAsBB74"}>时尚</Checkbox></Col>
                                <Col span={12}><Checkbox name={"film"}
                                                         value={"hmenvQhUmxM"}>电影</Checkbox></Col>
                                <Col span={12}><Checkbox name={"food-drink"}
                                                         value={"xjPR4hlkBGA"}>饮食</Checkbox></Col>
                                <Col span={12}><Checkbox name={"health"}
                                                         value={"_hb-dl4Q-4U"}>健康</Checkbox></Col>
                                <Col span={12}><Checkbox name={"people"}
                                                         value={"towJZFskpGg"}>人物</Checkbox></Col>
                                <Col span={12}><Checkbox name={"interiors"}
                                                         value={"R_Fyn-Gwtlw"}>精神</Checkbox></Col>
                                <Col span={12}><Checkbox name={"street-photography"}
                                                         value={"xHxYTMHLgOc"}>街头</Checkbox></Col>
                                <Col span={12}><Checkbox name={"animals"}
                                                         value={"Jpg6Kidl-Hk"}>动物</Checkbox></Col>
                                <Col span={12}><Checkbox name={"spirituality"}
                                                         value={"_8zFHuhRhyo"}>灵魂</Checkbox></Col>
                                <Col span={12}><Checkbox name={"arts-culture"}
                                                         value={"bDo48cUhwnY"}>文化</Checkbox></Col>
                                <Col span={12}><Checkbox name={"history"}
                                                         value={"dijpbw99kQQ"}>历史</Checkbox></Col>
                                <Col span={12}><Checkbox name={"athletics"}
                                                         value={"Bn-DjrcBrwo"}>体育</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item label={"自定主题"}>
                        <Space>
                            <Form.Item name={"customTopic"} noStyle>
                                <Input id={"customTopicInput"} placeholder="英文搜索最准确" allowClear/>
                            </Form.Item>
                            <Button type={"text"} shape={this.state.buttonShape} icon={<CheckOutlined/>}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    onClick={this.submitCustomTopicBtnOnClick.bind(this)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"} shape={this.state.buttonShape} icon={<StopOutlined/>}
                                    onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                    onClick={this.clearCustomTopicBtnOnClick.bind(this)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                        </Space>
                    </Form.Item>
                    <Form.Item name={"changeImageTime"} label={"切换间隔"}
                               extra={"上次切换：" + this.state.lastRequestTime}>
                        <Select style={{width: 156}} onChange={this.changeImageTimeOnChange.bind(this)}>
                            <Select.Option value={"900000"}>{"每 15 分钟"}</Select.Option>
                            <Select.Option value={"1800000"}>{"每 30 分钟"}</Select.Option>
                            <Select.Option value={"3600000"}>{"每 60 分钟"}</Select.Option>
                        </Select>
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item name={"nightMode"} label={"降低亮度"} valuePropName={"checked"}>
                                <Switch checkedChildren="已开启" unCheckedChildren="已关闭"
                                        onChange={this.nightModeSwitchOnChange.bind(this)}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={"noImageMode"} label={"无图模式"} valuePropName={"checked"}>
                                <Switch checkedChildren="已开启" unCheckedChildren="已关闭"
                                        onChange={this.noImageModeSwitchOnChange.bind(this)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        );
    }
}

export default PreferenceImageComponent;