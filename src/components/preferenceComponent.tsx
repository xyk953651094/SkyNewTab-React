import React from "react";
import type {RadioChangeEvent} from "antd";
import {Avatar, Button, Card, Checkbox, Input, Col, Drawer, Form, message, Radio, Row, Space, Switch, Tooltip, Typography} from "antd";
import {
    DeleteOutlined,
    GiftOutlined,
    GithubOutlined,
    LinkOutlined,
    MessageOutlined,
    MoreOutlined,
    SettingOutlined
} from "@ant-design/icons";
import type {CheckboxValueType} from "antd/es/checkbox/Group";
import {changeThemeColor, getFontColor, isEmptyString} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import {defaultPreferenceData, device} from "../typescripts/publicConstants";

const {Text} = Typography;

type propType = {
    themeColor: ThemeColorInterface,
    getPreferenceData: any,
}

type stateType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    displayDrawer: boolean,
    drawerPosition: "right" | "bottom",
    holidayData: any,
    preferenceData: PreferenceDataInterface,
    disableImageTopic: boolean
}

interface PreferenceComponent {
    state: stateType,
    props: propType
}

class PreferenceComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            displayDrawer: false,
            drawerPosition: "right",
            holidayData: "",
            preferenceData: defaultPreferenceData,
            disableImageTopic: false
        };
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.state.hoverColor;
        e.currentTarget.style.color = getFontColor(this.state.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.state.fontColor;
    }

    showDrawerBtnOnClick() {
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
        this.setState({
            preferenceData: this.setPreferenceData({searchEngine: event.target.value}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已更换搜索引擎");
        })
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
    customTopicInputOnChange(event: any) {
        this.setState({
            preferenceData: this.setPreferenceData({customTopic: event.target.value}),
            disableImageTopic: !isEmptyString(event.target.value)
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            message.success("已更换自定义主题，下次加载时生效");
        })
    }

    // 简洁模式
    simpleModeSwitchOnChange(checked: boolean) {
        this.setState({
            preferenceData: this.setPreferenceData({simpleMode: checked}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            if(checked) {
                message.success("已开启简洁模式");
            }
            else {
                message.success("已关闭简洁模式");
            }
        })
    }

    // 无图模式
    noImageModeSwitchOnChange(checked: boolean) {
        this.setState({
            preferenceData: this.setPreferenceData({noImageMode: checked}),
        }, () => {
            this.props.getPreferenceData(this.state.preferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(this.state.preferenceData));
            if(checked) {
                message.success("已开启无图模式，1秒后刷新页面");
            }
            else {
                message.success("已关闭无图模式，1秒后刷新页面");

            }
            this.refreshWindow();
        })
    }

    // 重置设置
    clearStorageBtnOnClick() {
        localStorage.clear();
        message.success("已重置所有内容，1秒后刷新页面");
        this.refreshWindow();
    }

    setPreferenceData(data: Object) {
        return Object.assign({}, this.state.preferenceData, data);
    }

    refreshWindow(){
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    componentDidMount() {
        // 初始化偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if(tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }
        this.setState({
            preferenceData: tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData),
        }, () => {
            this.setState({
                disableImageTopic: !isEmptyString(this.state.preferenceData.customTopic)
            })
        })

        // 屏幕适配
        if (device === "iPhone" || device === "Android") {
            this.setState({
                drawerPosition: "bottom"
            })
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, () => {
                changeThemeColor("#preferenceBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }
    }

    render() {
        return (
            <>
                <Tooltip title={"菜单栏"} placement={"bottomRight"} color={this.state.backgroundColor}>
                    <Button shape={"circle"} icon={<MoreOutlined/>} size={"large"}
                            onClick={this.showDrawerBtnOnClick.bind(this)}
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
                    closeIcon={false}
                    headerStyle={{color: this.state.fontColor, borderBottomColor: this.state.fontColor}}
                    drawerStyle={{backgroundColor: this.state.backgroundColor}}
                    // maskStyle={{backgroundColor: this.state.backgroundColor, opacity: 0.45}}
                    maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                    footer={
                        <Space>
                            <Button type={"text"} shape={"round"} icon={<GithubOutlined/>}
                                    href={"https://github.com/xyk953651094"} target={"_blank"}
                                    onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                    style={{color: this.state.fontColor}}>
                                主页
                            </Button>
                            <Button type={"text"} shape={"round"} icon={<MessageOutlined/>}
                                    href={"https://xyk953651094.blogspot.com"} target={"_blank"}
                                    onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                    style={{color: this.state.fontColor}}>
                                博客
                            </Button>
                            <Button type={"text"} shape={"round"} icon={<GiftOutlined/>}
                                    href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                                    onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                    style={{color: this.state.fontColor}}>
                                支持
                            </Button>
                        </Space>
                    }
                    footerStyle={{
                        backgroundColor: this.state.backgroundColor,
                        borderTopColor: this.state.fontColor,
                        textAlign: "center"
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title={"图片设置"} size={"small"}
                                  extra={<SettingOutlined style={{color: this.state.fontColor}}/>}
                                  style={{border: "1px solid " + this.state.fontColor}}
                                  headStyle={{
                                      backgroundColor: this.state.backgroundColor,
                                      color: this.state.fontColor,
                                      borderBottom: "2px solid " + this.state.fontColor
                                  }}
                                  bodyStyle={{backgroundColor: this.state.backgroundColor}}
                            >
                                <Form colon={false} initialValues={this.state.preferenceData}>
                                    <Form.Item name={"dynamicEffect"} label={"图片动效"}>
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
                                        <Checkbox.Group disabled={this.state.disableImageTopic} onChange={this.imageTopicsCheckboxOnChange.bind(this)}>
                                            <Row>
                                                <Col span={12}><Checkbox name={"travel"}
                                                                         value={"Fzo3zuOHN6w"}>旅游</Checkbox></Col>
                                                <Col span={12}><Checkbox name={"wallpapers"}
                                                                         value={"bo8jQKTaE0Y"}>壁纸</Checkbox></Col>
                                                <Col span={12}><Checkbox name={"3d-renders"}
                                                                         value={"CDwuwXJAbEw"}>3D渲染</Checkbox></Col>
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
                                    <Form.Item name={"customTopic"} label={"其他主题"}
                                               extra={
                                                    <Space direction={"vertical"}>
                                                        <Text style={{color: this.state.fontColor}}>按下回车生效，英文结果最准确</Text>
                                                        <Text style={{color: this.state.fontColor}}>其它主题不为空时将禁用图片主题</Text>
                                                    </Space>
                                               }
                                    >
                                        <Input onPressEnter={this.customTopicInputOnChange.bind(this)}
                                            placeholder="输入后按下 Enter 键生效" allowClear />
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title={"功能设置"} size={"small"}
                                  extra={<SettingOutlined style={{color: this.state.fontColor}}/>}
                                  style={{border: "1px solid " + this.state.fontColor}}
                                  headStyle={{
                                      backgroundColor: this.state.backgroundColor,
                                      color: this.state.fontColor,
                                      borderBottom: "2px solid " + this.state.fontColor
                                  }}
                                  bodyStyle={{backgroundColor: this.state.backgroundColor}}
                            >
                                <Form colon={false} initialValues={this.state.preferenceData}>
                                    <Form.Item name={"searchEngine"} label={"搜索引擎"}>
                                        <Radio.Group buttonStyle={"solid"}
                                                     onChange={this.searchEngineRadioOnChange.bind(this)}>
                                            <Row>
                                                <Col span={12}><Radio value={"baidu"}>Baidu</Radio></Col>
                                                <Col span={12}><Radio value={"bing"}>Bing</Radio></Col>
                                                <Col span={12}><Radio value={"google"}>Google</Radio></Col>
                                                <Col span={12}><Radio value={"yandex"}>Yandex</Radio></Col>
                                            </Row>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name={"simpleMode"} label={"简洁模式"} valuePropName={"checked"}>
                                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" onChange={this.simpleModeSwitchOnChange.bind(this)}/>
                                    </Form.Item>
                                    <Form.Item name={"noImageMode"} label={"无图模式"} valuePropName={"checked"}>
                                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" onChange={this.noImageModeSwitchOnChange.bind(this)}/>
                                    </Form.Item>
                                    <Form.Item name={"clearStorageButton"} label={"危险设置"}>
                                        <Button type={"text"} shape={"round"} icon={<DeleteOutlined/>}
                                                onMouseOver={this.btnMouseOver.bind(this)}
                                                onMouseOut={this.btnMouseOut.bind(this)}
                                                onClick={this.clearStorageBtnOnClick.bind(this)}
                                                style={{color: this.state.fontColor}}>
                                            清空并重置所有内容
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title={"友情链接"} size={"small"}
                                  extra={<LinkOutlined style={{color: this.state.fontColor}}/>}
                                  style={{border: "1px solid " + this.state.fontColor}}
                                  headStyle={{
                                      backgroundColor: this.state.backgroundColor,
                                      color: this.state.fontColor,
                                      borderBottom: "2px solid " + this.state.fontColor
                                  }}
                                  bodyStyle={{backgroundColor: this.state.backgroundColor}}
                            >
                                <Space direction={"vertical"}>
                                    <Button type={"text"} shape={"round"} href={"https://unsplash.com/"}
                                            target={"_blank"}
                                            onMouseOver={this.btnMouseOver.bind(this)}
                                            onMouseOut={this.btnMouseOut.bind(this)}
                                            style={{color: this.state.fontColor}}>
                                        <Avatar size={16} shape={"square"} src={"https://unsplash.com/favicon.ico"}/>
                                        &nbsp;&nbsp;Unsplash.com
                                    </Button>
                                    <Button type={"text"} shape={"round"} href={"https://www.pexels.com/"}
                                            target={"_blank"}
                                            onMouseOver={this.btnMouseOver.bind(this)}
                                            onMouseOut={this.btnMouseOut.bind(this)}
                                            style={{color: this.state.fontColor}}>
                                        <Avatar size={16} shape={"square"} src={"https://www.pexels.com/favicon.ico"}/>
                                        &nbsp;&nbsp;Pexels.com
                                    </Button>
                                    <Button type={"text"} shape={"round"} href={"https://pixabay.com/"}
                                            target={"_blank"}
                                            onMouseOver={this.btnMouseOver.bind(this)}
                                            onMouseOut={this.btnMouseOut.bind(this)}
                                            style={{color: this.state.fontColor}}>
                                        <Avatar size={16} shape={"square"} src={"https://pixabay.com/favicon.ico"}/>
                                        &nbsp;&nbsp;Pixabay.com
                                    </Button>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Drawer>
            </>
        );
    }
}

export default PreferenceComponent;