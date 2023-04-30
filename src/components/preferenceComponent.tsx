import React from "react";
import {Button, Tooltip, Drawer, Card, List, Form, Row, Col, Radio, message, Typography} from "antd";
import type {RadioChangeEvent} from "antd";
import {MoreOutlined, SettingOutlined, GithubOutlined, LinkOutlined} from "@ant-design/icons";
import {changeThemeColor} from "../typescripts/publicFunctions";
import {FormInitialValuesInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import {defaultFormInitialValues, device} from "../typescripts/publicConstants";
const $ = require("jquery");

const {Link} = Typography;

type propType = {
    themeColor: ThemeColorInterface,
    imageData: any,
    getSearchEngine: any,
    getDynamicEffect: any,
    getImageSource: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
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
            displayDrawer: false,
            drawerPosition: "right",
            holidayData: "",
            formInitialValues: defaultFormInitialValues
        };
    }

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

    // 搜索引擎
    searchEngineRadioOnChange(event: RadioChangeEvent) {
        this.props.getSearchEngine(event.target.value);
        localStorage.setItem("searchEngine", event.target.value);
        message.success("已更换搜索引擎");
    }

    // 图片动效
    dynamicEffectRadioOnChange(event: RadioChangeEvent) {
        this.props.getDynamicEffect(event.target.value);
        localStorage.setItem("dynamicEffect", event.target.value);
        message.success("调整成功，新的显示效果已生效");
    }

    // 图片来源
    imageSourceRadioOnChange(event: RadioChangeEvent) {
        this.props.getImageSource(event.target.value);
        localStorage.setItem("imageSource", event.target.value);
        message.success("调整成功，新的图片来源将在下次加载时生效");
    }

    componentDidMount() {
        // 初始化偏好设置
        let tempSearchEngineRadio: string | null = localStorage.getItem("searchEngine");
        let tempDynamicEffectRadio: string | null = localStorage.getItem("dynamicEffect");
        let tempImageSourceRadio: string | null = localStorage.getItem("imageSource");

        this.setState({
            formInitialValues: {
                "searchEngineRadio": tempSearchEngineRadio === null ? "bing" : tempSearchEngineRadio,
                "dynamicEffectRadio": tempDynamicEffectRadio === null ? "all" : tempDynamicEffectRadio,
                "imageSourceRadio": tempImageSourceRadio === null ? "unsplash" : tempImageSourceRadio,
            }
        })

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
                $(".ant-collapse").css("backgroundColor", this.state.backgroundColor);
                $(".ant-collapse-header").css("color", this.state.fontColor);
                $(".ant-list-item-meta-title").css("color", this.state.fontColor);
            }
        });
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, ()=>{
                changeThemeColor("#preferenceBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }
    }

    render() {
        return (
            <>
                <Tooltip title={"偏好设置"} placement="topRight" color={this.state.backgroundColor}>
                    <Button shape="round" icon={<MoreOutlined />} size={"large"}
                            onClick={this.drawerOnShow.bind(this)}
                            id={"preferenceBtn"}
                            className={"componentTheme zIndexHigh"}
                            style={{
                                backgroundColor: this.state.backgroundColor
                            }}
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
                        <Button type="link" href="https://github.com/xyk953651094" target="_blank" icon={<GithubOutlined />}>
                            作者主页
                        </Button>
                    }
                    footerStyle={{backgroundColor: this.state.backgroundColor, textAlign: "center"}}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title={"偏好设置"} size={"small"} extra={<SettingOutlined />}>
                                <Form layout={"vertical"} colon={false} initialValues={this.state.formInitialValues}>
                                    <Form.Item name="searchEngineRadio" label="搜索引擎">
                                        <Radio.Group buttonStyle={"solid"} onChange={this.searchEngineRadioOnChange.bind(this)}>
                                            <Radio value={"bing"}>必应</Radio>
                                            <Radio value={"google"}>谷歌</Radio>
                                            <Radio value={"baidu"}>百度</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="dynamicEffectRadio" label="图片动效（推荐选择全部）">
                                        <Radio.Group buttonStyle={"solid"} onChange={this.dynamicEffectRadioOnChange.bind(this)}>
                                            <Radio value={"close"}>关闭</Radio>
                                            <Radio value={"translate"}>平移</Radio>
                                            <Radio value={"rotate"}>旋转</Radio>
                                            <Radio value={"all"}>全部</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="imageSourceRadio" label="图片来源">
                                        <Radio.Group buttonStyle={"solid"} onChange={this.imageSourceRadioOnChange.bind(this)}>
                                            <Radio value={"unsplash"}>Unsplash</Radio>
                                            <Radio value={"pexels"}>Pixabay</Radio>
                                            <Radio value={"pixabay"}>Pixabay</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title={"网站推荐"} size={"small"} extra={<LinkOutlined />}>
                                <List size="small">
                                    <List.Item><Link href="https://unsplash.com/" target="_blank">Unsplash.com</Link></List.Item>
                                    <List.Item><Link href="https://www.pexels.com/" target="_blank">Pexels.com</Link></List.Item>
                                    <List.Item><Link href="https://pixabay.com/" target="_blank">Pixabay.com</Link></List.Item>
                                </List>
                            </Card>
                        </Col>
                    </Row>
                </Drawer>
            </>
        );
    }
}

export default PreferenceComponent;