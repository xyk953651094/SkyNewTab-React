import React from "react";
import "../../App.css";
import DonationComponent from "../donation";
import OtherAppComponent from "../otherApp";
import {Button, Tooltip, Drawer, Card, Typography, Form, Row, Col, Radio, Checkbox, Space, Alert, message} from "antd";
import type {RadioChangeEvent} from "antd";
import type {CheckboxValueType} from "antd/es/checkbox/Group";
import {MoreOutlined, SettingOutlined} from "@ant-design/icons";
import {changeThemeColor, getFontColor} from "../../typescripts/publicFunctions";
import {FormInitialValuesInterface, ThemeColorInterface} from "../../typescripts/publicInterface";
import {defaultFormInitialValues, device} from "../../typescripts/publicConstents";
const $ = require("jquery");
const {Text} = Typography;

type propType = {
    themeColor: ThemeColorInterface,
    display: "none" | "block",
    imageData: any,
    getDisplayEffect: any,
    getDynamicEffect: any,
    getImageTopics: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    componentBackgroundColor: string,
    componentFontColor: string,
    displayDrawer: boolean,
    drawerPosition: "right" | "bottom",
    holidayData: any,
    formInitialValues: FormInitialValuesInterface
}

interface PreferenceComponent {
    state: stateType,
    props: propType
}

class PreferenceComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            fontColor: "",
            componentBackgroundColor: "",
            componentFontColor: "",
            displayDrawer: false,
            drawerPosition: "right",
            holidayData: "",
            formInitialValues: defaultFormInitialValues
        };
    }

    componentDidMount() {
        // 初始化偏好设置
        let tempDisplayEffectRadio: string | null = localStorage.getItem("displayEffect");
        let tempDynamicEffectRadio: string | null = localStorage.getItem("dynamicEffect");
        let tempImageTopicsCheckbox: string | string[] | null = localStorage.getItem("imageTopics");
        if (tempImageTopicsCheckbox !== null) {
            tempImageTopicsCheckbox = tempImageTopicsCheckbox.split(",");
        }

        this.setState({
            formInitialValues: {
                "displayEffectRadio": tempDisplayEffectRadio === null ? "regular" : tempDisplayEffectRadio,
                "dynamicEffectRadio": tempDynamicEffectRadio === null ? "all" : tempDynamicEffectRadio,
                "imageTopicsCheckbox": tempImageTopicsCheckbox === null ? ["Fzo3zuOHN6w"] : tempImageTopicsCheckbox,
            }
        });

        // 屏幕适配
        if(device === "iPhone" || device === "Android") {
            this.setState({
                drawerPosition: "bottom"
            })
        }

        // 修改各类弹窗样式
        $("body").bind("DOMNodeInserted", () => {
            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-title").css("color", this.state.fontColor);
                $(".ant-popover-inner-content").css("color", this.state.fontColor);
            }
            
            // toolTip
            let toolTipEle = $(".ant-tooltip");
            if (toolTipEle.length && toolTipEle.length > 0) {
                $(".ant-tooltip-inner").css("color", this.state.fontColor);
            }

            // messgae
            let messageEle = $(".ant-message");
            if(messageEle.length && messageEle.length > 0) {
                $(".ant-message-notice-content").css({"backgroundColor": this.state.backgroundColor, "color": this.state.fontColor});
                $(".ant-message-custom-content > .anticon").css("color", this.state.fontColor);
            }

            // drawer
            let drawerEle = $(".ant-drawer");
            if (drawerEle.length && drawerEle.length > 0) {
                $(".ant-drawer-close").css("color", this.state.fontColor);
                $(".ant-drawer-title").css("color", this.state.fontColor);
                $(".ant-card").css("border", "1px solid " + this.state.fontColor);
                $(".ant-card-head").css({"backgroundColor": this.state.backgroundColor, "borderBottom": "2px solid " + this.state.fontColor});
                $(".ant-card-head-title").css("color", this.state.fontColor);
                $(".ant-card-extra").css("color", this.state.fontColor);
                $(".ant-card-body").css("backgroundColor", this.state.backgroundColor);
                $(".ant-typography").css("color", this.state.fontColor);
                $(".ant-form-item-label > label").css("color", this.state.fontColor);
                $(".ant-radio-wrapper").children(":last-child").css("color", this.state.fontColor);
                $(".ant-checkbox-wrapper").children(":last-child").css("color", this.state.fontColor);
                // $(".ant-collapse").css("backgroundColor", this.state.backgroundColor);
                // $(".ant-collapse-header").css("color", this.state.fontColor);
                $(".ant-list-item-meta-title").css("color", this.state.fontColor);
            }
        });
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            },() => {
                changeThemeColor(".preferenceBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.imageData !== prevProps.imageData) {
            this.setState({
                componentBackgroundColor: nextProps.imageData.color,
                componentFontColor: getFontColor(nextProps.imageData.color),
            });
        }
    }

    // componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
    //     $(".ant-drawer-close").css("color", this.state.fontColor);
    //     $(".ant-drawer-title").css("color", this.state.fontColor);
    //     $(".ant-card").css("border", "1px solid " + this.state.fontColor);
    //     $(".ant-card-head").css({"backgroundColor": this.state.backgroundColor, "borderBottom": "2px solid " + this.state.fontColor});
    //     $(".ant-card-head-title").css("color", this.state.fontColor);
    //     $(".ant-card-extra").css("color", this.state.fontColor);
    //     $(".ant-card-body").css("backgroundColor", this.state.backgroundColor);
    //     $(".ant-typography").css("color", this.state.fontColor);
    //     $(".ant-form-item-label > label").css("color", this.state.fontColor);
    //     $(".ant-radio-wrapper").children(":last-child").css("color", this.state.fontColor);
    //     $(".ant-checkbox-wrapper").children(":last-child").css("color", this.state.fontColor);
    //     $(".ant-collapse").css("backgroundColor", this.state.backgroundColor);
    //     $(".ant-collapse-header").css("color", this.state.fontColor);
    //     $(".ant-list-item-meta-title").css("color", this.state.fontColor);
    // }

    drawerOnShow() {
        this.setState({
            displayDrawer: true,
        })
    };

    drawerOnClose() {
        this.setState({
            displayDrawer: false,
        })
    };

    // 图片质量
    displayEffectRadioOnChange(event: RadioChangeEvent) {
        this.props.getDisplayEffect(event.target.value);
        localStorage.setItem("displayEffect", event.target.value);
        message.success("调整成功，新的图片质量将在下次加载时生效");
    }

    // 图片动效
    dynamicEffectRadioOnChange(event: RadioChangeEvent) {
        this.props.getDynamicEffect(event.target.value);
        localStorage.setItem("dynamicEffect", event.target.value);
        message.success("调整成功，新的显示效果已生效");
    }

    // 图片主题
    imageTopicsCheckboxOnChange(checkedValues: CheckboxValueType[]) {
        let value = "";
        for (let i = 0; i < checkedValues.length; i++) {
            value += checkedValues[i];
            if (i !== checkedValues.length - 1) {
                value += ",";
            }
        }
        this.props.getImageTopics(value);
        localStorage.setItem("imageTopics", value);
        message.success("调整成功，新的主题将在下次加载时生效");
        if (checkedValues.length === 0) {
            message.info("全不选与全选的效果一样");
        }
    }

    render() {
        return (
            <>
                <Tooltip title={"偏好设置"} placement="topRight" color={this.state.backgroundColor}>
                    <Button shape="round" icon={<MoreOutlined />} size={"large"}
                            onClick={this.drawerOnShow.bind(this)}
                            // id={"preferenceBtn"}
                            className={"preferenceBtn componentTheme zIndexHigh"}
                            style={{display: this.props.display}}
                    />
                </Tooltip>
                <Drawer
                    title={"菜单栏"}
                    size={"default"}
                    height={500}
                    placement={this.state.drawerPosition}
                    onClose={this.drawerOnClose.bind(this)}
                    open={this.state.displayDrawer}
                    drawerStyle={{backgroundColor: this.state.backgroundColor}}
                    footer={
                        <Row align={"middle"}>
                            <Col span={12}>
                                <Text>Sky 新标签页 Pro V1.0.2</Text>
                            </Col>
                        </Row>
                    }
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title={"偏好设置"} size={"small"} extra={<SettingOutlined />}>
                                <Form layout={"vertical"} colon={false} initialValues={this.state.formInitialValues}>
                                    <Form.Item name="displayEffectRadio" label="图片质量">
                                        <Radio.Group buttonStyle={"solid"} onChange={this.displayEffectRadioOnChange.bind(this)}>
                                            <Radio value={"regular"}>标准</Radio>
                                            <Radio value={"full"}>较高</Radio>
                                            <Radio value={"raw"}>最高</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="dynamicEffectRadio" label="图片动效">
                                        <Radio.Group buttonStyle={"solid"} onChange={this.dynamicEffectRadioOnChange.bind(this)}>
                                            <Radio value={"close"}>关闭</Radio>
                                            <Radio value={"translate"}>平移</Radio>
                                            <Radio value={"rotate"}>旋转</Radio>
                                            <Radio value={"all"}>全部</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="imageTopicsCheckbox" label="图片主题">
                                        <Space direction="vertical" size="small">
                                            <Alert message="全不选与全选效果相同" type="info" showIcon/>
                                            <Checkbox.Group onChange={this.imageTopicsCheckboxOnChange.bind(this)}>
                                                <Row>
                                                    <Col span={12}><Checkbox name={"travel"}             value="Fzo3zuOHN6w">旅游</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"wallpapers"}         value="bo8jQKTaE0Y">壁纸</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"3d-renders"}         value="CDwuwXJAbEw">3D渲染</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"textures-patterns"}  value="iUIsnVtjB0Y">纹理</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"experimental"}       value="qPYsDzvJOYc">实验</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"architecture"}       value="rnSKDHwwYUk">建筑</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"nature"}             value="6sMVjTLSkeQ">自然</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"business-work"}      value="aeu6rL-j6ew">商务</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"fashion"}            value="S4MKLAsBB74">时尚</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"film"}               value="hmenvQhUmxM">电影</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"food-drink"}         value="xjPR4hlkBGA">饮食</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"health"}             value="_hb-dl4Q-4U">健康</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"people"}             value="towJZFskpGg">人物</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"interiors"}          value="R_Fyn-Gwtlw">精神</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"street-photography"} value="xHxYTMHLgOc">街头</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"animals"}            value="Jpg6Kidl-Hk">动物</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"spirituality"}       value="_8zFHuhRhyo">灵魂</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"arts-culture"}       value="bDo48cUhwnY">文化</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"history"}            value="dijpbw99kQQ">历史</Checkbox></Col>
                                                    <Col span={12}><Checkbox name={"athletics"}          value="Bn-DjrcBrwo">体育</Checkbox></Col>
                                                </Row>
                                            </Checkbox.Group>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <DonationComponent themeColor={this.props.themeColor}/>
                        </Col>
                        <Col span={24}>
                            <OtherAppComponent themeColor={this.props.themeColor}/>
                        </Col>
                    </Row>
                </Drawer>
            </>
        );
    }
}

export default PreferenceComponent;