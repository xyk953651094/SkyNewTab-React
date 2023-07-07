import React from "react";
import {Button, Tooltip, Drawer, Card, List, Form, Row, Col, Radio, message, Typography} from "antd";
import type {RadioChangeEvent} from "antd";
import {
    MoreOutlined,
    RedoOutlined,
    SettingOutlined,
    GithubOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import {changeThemeColor} from "../typescripts/publicFunctions";
import {PreferenceInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import {defaultFormInitialValues, device} from "../typescripts/publicConstants";

const {Link} = Typography;

type propType = {
    themeColor: ThemeColorInterface,
    getSearchEngine: any,
    getDynamicEffect: any,
    getImageQuality: any,
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
        message.success("已更新显示效果");
    }

    imageQualityRadioOnChange(event: RadioChangeEvent) {
        this.props.getImageQuality(event.target.value);
        localStorage.setItem("imageQuality", event.target.value);
        message.success("已更新图片质量");
        window.location.reload();
    }

    // 重置设置
    handleClearStorageButtonClick() {
        localStorage.setItem("searchEngine", "bing");
        localStorage.setItem("dynamicEffect", "all");
        localStorage.setItem("imageQuality", "regular");
        message.success("已重置设置");
        window.location.reload();
    }

    componentDidMount() {
        // 初始化偏好设置
        let tempSearchEngineRadio: string | null = localStorage.getItem("searchEngine");
        let tempDynamicEffectRadio: string | null = localStorage.getItem("dynamicEffect");
        let tempImageQualityRadio: string | null = localStorage.getItem("imageQuality");

        this.setState({
            formInitialValues: {
                "searchEngineRadio": tempSearchEngineRadio === null ? "bing" : tempSearchEngineRadio,
                "dynamicEffectRadio": tempDynamicEffectRadio === null ? "all" : tempDynamicEffectRadio,
                "imageQualityRadio": tempImageQualityRadio === null ? "regular" : tempImageQualityRadio,
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
                    headerStyle={{color: this.state.fontColor, borderBottomColor: this.state.fontColor}}
                    drawerStyle={{backgroundColor: this.state.backgroundColor}}
                    // maskStyle={{backgroundColor: this.state.backgroundColor, opacity: 0.45}}
                    maskStyle={{backdropFilter: "blur(10px)"}}
                    footer={
                        <Button type="link" href="https://github.com/xyk953651094" target="_blank" icon={<GithubOutlined />}>
                            作者主页
                        </Button>
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
                                    <Form.Item name="clearStorageButton" label="其他设置">
                                        <Button type="primary" shape="round" danger icon={<RedoOutlined />} onClick={this.handleClearStorageButtonClick.bind(this)} style={{color: this.state.fontColor}}>
                                            重置设置
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