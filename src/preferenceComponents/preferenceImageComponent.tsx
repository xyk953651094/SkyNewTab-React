import React from "react";
import {
    Alert,
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
    Space,
    Typography
} from "antd";
import {CheckOutlined, StopOutlined, SettingOutlined} from "@ant-design/icons";
import {getFontColor, isEmptyString} from "../typescripts/publicFunctions";
import {defaultPreferenceData} from "../typescripts/publicConstants";
import {CheckboxValueType} from "antd/es/checkbox/Group";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const {Paragraph} = Typography;
const $ = require("jquery");

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    getPreferenceData: any
}

type stateType = {
    preferenceData: PreferenceDataInterface,
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
            preferenceData: defaultPreferenceData,
            disableImageTopic: false
        };
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.props.hoverColor;
        e.currentTarget.style.color = getFontColor(this.props.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.props.fontColor;
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
            message.success("已更换图片主题，下次加载时生效");
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
            disableImageTopic: !isEmptyString(inputValue)
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已修改自定主题，一秒后刷新页面");
            this.refreshWindow();
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

    refreshWindow() {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    setPreferenceData(data: Object) {
        return Object.assign({}, this.state.preferenceData, data);
    }

    componentWillMount() {
        // 初始化偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }
        this.setState({
            preferenceData: tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData),
        }, () => {
            this.setState({
                disableImageTopic: !isEmptyString(this.state.preferenceData.customTopic)
            })
        })
    }

    render() {
        return (
            <Card title={"图片设置"} size={"small"}
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
                            <Row>
                                <Col span={12}><Radio value={"all"}>视差</Radio></Col>
                                <Col span={12}><Radio value={"translate"}>平移</Radio></Col>
                                <Col span={12}><Radio value={"rotate"}>旋转</Radio></Col>
                                <Col span={12}><Radio value={"close"}>关闭</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"imageQuality"} label={"图片质量"}>
                        <Radio.Group buttonStyle={"solid"}
                                     onChange={this.imageQualityRadioOnChange.bind(this)}>
                            <Row>
                                <Col span={12}><Radio value={"full"}>最高</Radio></Col>
                                <Col span={12}><Radio value={"regular"}>标准</Radio></Col>
                                <Col span={12}><Radio value={"small"}>较低</Radio></Col>
                                <Col span={12}><Radio value={"small_s3"}>最低</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"imageTopics"} label={"图片主题"}>
                        <Checkbox.Group disabled={this.state.disableImageTopic}
                                        onChange={this.imageTopicsCheckboxOnChange.bind(this)}>
                            <Row>
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
                            <Button type={"text"} shape={"circle"} icon={<CheckOutlined/>}
                                    onMouseOver={this.btnMouseOver.bind(this)}
                                    onMouseOut={this.btnMouseOut.bind(this)}
                                    onClick={this.submitCustomTopicBtnOnClick.bind(this)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                            <Button type={"text"} shape={"circle"} icon={<StopOutlined />}
                                    onMouseOver={this.btnMouseOver.bind(this)}
                                    onMouseOut={this.btnMouseOut.bind(this)}
                                    onClick={this.clearCustomTopicBtnOnClick.bind(this)}
                                    style={{color: this.props.fontColor}}>
                            </Button>
                        </Space>
                    </Form.Item>
                    <Alert
                        message="提示信息"
                        description={
                            <Paragraph>
                                <ol>
                                    <Space direction={"vertical"}>
                                        <li>新的主题刷新的可能不会立即生效</li>
                                        <li>图片主题全不选与全选的效果一致</li>
                                        <li>自定主题不为空时将禁用图片主题</li>
                                        <li>只有禁用自定主题图片主题才生效</li>
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

export default PreferenceImageComponent;