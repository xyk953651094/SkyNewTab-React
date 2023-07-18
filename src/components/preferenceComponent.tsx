import React from "react";
import {
    Button,
    Tooltip,
    Drawer,
    Card,
    List,
    Form,
    Row,
    Col,
    Radio,
    Checkbox,
    message,
    Space,
    Avatar
} from "antd";
import type {RadioChangeEvent} from "antd";
import {
    MoreOutlined,
    DeleteOutlined,
    SettingOutlined,
    GithubOutlined,
    GiftOutlined,
    LinkOutlined,
    MessageOutlined
} from "@ant-design/icons";
import type {CheckboxValueType} from "antd/es/checkbox/Group";
import {changeThemeColor} from "../typescripts/publicFunctions";
import {PreferenceInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import {defaultFormInitialValues, device} from "../typescripts/publicConstants";

type propType = {
    themeColor: ThemeColorInterface,
    getSearchEngine: any,
    getDynamicEffect: any,
    getImageQuality: any,
    getImageTopics: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    displayDrawer: boolean,
    drawerPosition: "right" | "bottom",
    holidayData: any,
    formInitialValues: PreferenceInterface
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
        this.props.getSearchEngine(event.target.value);
        localStorage.setItem("searchEngine", event.target.value);
        message.success("已更换搜索引擎");
    }

    // 图片动效
    dynamicEffectRadioOnChange(event: RadioChangeEvent) {
        this.props.getDynamicEffect(event.target.value);
        localStorage.setItem("dynamicEffect", event.target.value);
        message.success("已更新显示效果");
    }

    // 图片质量
    imageQualityRadioOnChange(event: RadioChangeEvent) {
        this.props.getImageQuality(event.target.value);
        localStorage.setItem("imageQuality", event.target.value);
        message.success("已更新图片质量");
        window.location.reload();
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

    // 重置设置
    clearStorageBtnOnClick() {
        localStorage.clear();
        message.success("已重置所有内容");
        window.location.reload();
    }

    componentDidMount() {
        // 初始化偏好设置
        let tempSearchEngineRadio: string | null = localStorage.getItem("searchEngine");
        let tempDynamicEffectRadio: string | null = localStorage.getItem("dynamicEffect");
        let tempImageQualityRadio: string | null = localStorage.getItem("imageQuality");
        let tempImageTopicsCheckbox: string | string[] | null = localStorage.getItem("imageTopics");
        if (tempImageTopicsCheckbox !== null) {
            tempImageTopicsCheckbox = tempImageTopicsCheckbox.split(",");
        }

        this.setState({
            formInitialValues: {
                "searchEngineRadio": tempSearchEngineRadio === null ? "bing" : tempSearchEngineRadio,
                "dynamicEffectRadio": tempDynamicEffectRadio === null ? "all" : tempDynamicEffectRadio,
                "imageQualityRadio": tempImageQualityRadio === null ? "regular" : tempImageQualityRadio,
                "imageTopicsCheckbox": tempImageTopicsCheckbox === null ? ["Fzo3zuOHN6w"] : tempImageTopicsCheckbox,
            }
        })

        // 屏幕适配
        if(device === "iPhone" || device === "Android") {
            this.setState({
                drawerPosition: "bottom"
            })
        }
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
                <Tooltip title={"菜单栏"} placement="bottomRight" color={this.state.backgroundColor}>
                    <Button shape="circle" icon={<MoreOutlined />} size={"large"}
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
                    headerStyle={{color: this.state.fontColor, borderBottomColor: this.state.fontColor}}
                    drawerStyle={{backgroundColor: this.state.backgroundColor}}
                    // maskStyle={{backgroundColor: this.state.backgroundColor, opacity: 0.45}}
                    maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                    footer={
                        <Space>
                            <Button type="text" shape="round" icon={<GithubOutlined />} href="https://github.com/xyk953651094" target="_blank" style={{color: this.state.fontColor}}>
                                主页
                            </Button>
                            <Button type="text" shape="round" icon={<MessageOutlined />} href="https://xyk953651094.blogspot.com" target="_blank" style={{color: this.state.fontColor}}>
                                博客
                            </Button>
                            <Button type="text" shape="round" icon={<GiftOutlined />} href="https://afdian.net/a/xyk953651094" target="_blank" style={{color: this.state.fontColor}}>
                                捐赠
                            </Button>
                        </Space>
                    }
                    footerStyle={{backgroundColor: this.state.backgroundColor, borderTopColor: this.state.fontColor, textAlign: "center"}}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title={"偏好设置"} size={"small"} extra={<SettingOutlined style={{color: this.state.fontColor}}/>}
                                  style={{border: "1px solid " + this.state.fontColor}}
                                  headStyle={{backgroundColor: this.state.backgroundColor, color: this.state.fontColor, borderBottom: "2px solid " + this.state.fontColor}}
                                  bodyStyle={{backgroundColor: this.state.backgroundColor}}
                            >
                                <Form layout={"vertical"} colon={false} initialValues={this.state.formInitialValues}>
                                    <Form.Item name="searchEngineRadio" label="搜索引擎">
                                        <Radio.Group buttonStyle={"solid"} onChange={this.searchEngineRadioOnChange.bind(this)}>
                                            <Radio value={"bing"}>必应</Radio>
                                            <Radio value={"baidu"}>百度</Radio>
                                            <Radio value={"google"}>谷歌</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    {/*<Form.Item name="showImageSwitch" label="显示图片（推荐开启）">*/}
                                    {/*    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" onChange={this.showImageSwitch.bind(this)} defaultChecked={this.state.formInitialValues.showImageSwitch}/>*/}
                                    {/*</Form.Item>*/}
                                    <Form.Item name="dynamicEffectRadio" label="图片动效（推荐视差）">
                                        <Radio.Group buttonStyle={"solid"} onChange={this.dynamicEffectRadioOnChange.bind(this)}>
                                            <Radio value={"all"}>视差</Radio>
                                            <Radio value={"translate"}>平移</Radio>
                                            <Radio value={"rotate"}>旋转</Radio>
                                            <Radio value={"close"}>关闭</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="imageQualityRadio" label="图片质量（推荐标准）">
                                        <Radio.Group buttonStyle={"solid"} onChange={this.imageQualityRadioOnChange.bind(this)}>
                                            <Radio value={"full"}>高</Radio>
                                            <Radio value={"regular"}>标准</Radio>
                                            <Radio value={"small"}>低</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="imageTopicsCheckbox" label="图片主题（全不选与全选效果一致）">
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
                                    </Form.Item>
                                    <Form.Item name="clearStorageButton" label="其他设置">
                                        <Button type="text" shape="round" icon={<DeleteOutlined />} onClick={this.clearStorageBtnOnClick.bind(this)} style={{color: this.state.fontColor}}>
                                            清理缓存
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title={"网站推荐"} size={"small"} extra={<LinkOutlined style={{color: this.state.fontColor}}/>}
                                  style={{border: "1px solid " + this.state.fontColor}}
                                  headStyle={{backgroundColor: this.state.backgroundColor, color: this.state.fontColor, borderBottom: "2px solid " + this.state.fontColor}}
                                  bodyStyle={{backgroundColor: this.state.backgroundColor}}
                            >
                                <List size="small">
                                    <List.Item>
                                        <Space>
                                            <Avatar size={"small"} shape={"square"} src={"https://unsplash.com/favicon.ico"} />
                                            <Button type="text" shape="round" href="https://unsplash.com/" target="_blank"  style={{color: this.state.fontColor}}>Unsplash.com</Button>
                                        </Space>
                                    </List.Item>
                                    <List.Item>
                                        <Space>
                                            <Avatar size={"small"} shape={"square"} src={"https://www.pexels.com/favicon.ico"} />
                                            <Button type="text" shape="round" href="https://www.pexels.com/" target="_blank"  style={{color: this.state.fontColor}}>Pexels.com</Button>
                                        </Space>
                                    </List.Item>
                                    <List.Item>
                                        <Space>
                                            <Avatar size={"small"} shape={"square"} src={"https://pixabay.com/favicon.ico"} />
                                            <Button type="text" shape="round" href="https://pixabay.com/" target="_blank"  style={{color: this.state.fontColor}}>Pixabay.com</Button>
                                        </Space>
                                    </List.Item>
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