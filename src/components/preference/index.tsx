import React from "react";
import "../../App.css";
import {Button, Tooltip, Drawer, Card, Typography, Form, Row, Col, Radio, Checkbox} from "antd";
import type { RadioChangeEvent } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import {MoreOutlined, ReadOutlined, SettingOutlined} from "@ant-design/icons";
import {getTimeDetails, changeThemeColor, getFontColor, deviceModel} from "../../typescripts/publicFunctions";
const $ = require("jquery");
const {Title, Paragraph, Text} = Typography;

type propType = {
    themeColor: string,
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
    timeDetails: String[],
    holidayData: any,
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
            timeDetails: [""],
            holidayData: "",
        };
    }

    componentDidMount() {
        let timeDetails = getTimeDetails(new Date());
        this.setState({
            timeDetails: [timeDetails.showDate2 + " " + timeDetails.showWeek, timeDetails.showLocaleDate]
        })

        let device = deviceModel();
        if(device === "iPhone" || device === "Android") {
            this.setState({
                drawerPosition: "bottom"
            })
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#preferenceBtn", nextProps.themeColor);

            this.setState({
                backgroundColor: nextProps.themeColor,
                fontColor: getFontColor(nextProps.themeColor),
                componentBackgroundColor: nextProps.imageData.color,
                componentFontColor: getFontColor(nextProps.imageData.color),
            });
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        $(".ant-drawer-title").css("color", this.state.fontColor);
        $(".ant-card").css("border", "1px solid " + this.state.fontColor);
        $(".ant-card-head").css({"backgroundColor": this.state.backgroundColor, "borderBottom": "2px solid " + this.state.fontColor});
        $(".ant-card-head-title").css("color", this.state.fontColor);
        $(".ant-card-extra").css("color", this.state.fontColor);
        $(".ant-card-body").css("backgroundColor", this.state.backgroundColor);
        $(".ant-typography").css("color", this.state.fontColor);
        $(".ant-form-item-label > label").css({"color": this.state.fontColor, "fontSize": "16px"});
        $(".ant-radio-wrapper").children(":last-child").css({"color": this.state.fontColor, "fontSize": "16px"});
        $(".ant-checkbox-wrapper").children(":last-child").css({"color": this.state.fontColor, "fontSize": "16px"});
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

    // 图片质量
    displayEffectRadioOnChange(event: RadioChangeEvent) {
        this.props.getDisplayEffect(event.target.value);
    }

    // 动效样式
    dynamicEffectRadioOnChange(event: RadioChangeEvent) {
        this.props.getDynamicEffect(event.target.value);
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
    }

    render() {


        return (
            <>
                <Tooltip title={"偏好设置"} placement="topRight">
                    <Button shape="round" icon={<MoreOutlined />} size={"large"}
                            onClick={this.drawerOnShow.bind(this)}
                            id={"preferenceBtn"}
                            className={"frostedGlass zIndexHigh"}
                            style={{
                                display: this.props.display,
                                backgroundColor: this.state.backgroundColor,
                                color: this.state.fontColor
                            }}
                    />
                </Tooltip>
                <Drawer
                    title={this.state.timeDetails[0]}
                    size={"default"}
                    height={500}
                    placement={this.state.drawerPosition}
                    onClose={this.drawerOnClose.bind(this)}
                    open={this.state.displayDrawer}
                    drawerStyle={{backgroundColor: this.state.backgroundColor}}
                    footer={
                        <Row align={"middle"}>
                            <Col span={12}>
                                <Text>版本号：V1.0.2</Text>
                            </Col>
                        </Row>
                    }
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card title={"偏好设置"} headStyle={{"fontSize": "16px"}} bodyStyle={{"fontSize": "16px"}} size={"small"} extra={<SettingOutlined />}>
                                <Form layout={"vertical"} colon={false}
                                    initialValues={{"displayEffectRadio": "regular", "dynamicEffectRadio": "translate", "imageTopicsCheckbox": "Fzo3zuOHN6w"}}
                                >
                                    <Form.Item name="displayEffectRadio" label="图片质量">
                                        <Radio.Group defaultValue={"regular"} buttonStyle={"solid"}
                                                     onChange={this.displayEffectRadioOnChange.bind(this)}
                                        >
                                            <Radio value={"regular"}>标准</Radio>
                                            <Radio value={"full"}>最高</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="dynamicEffectRadio" label="动效样式">
                                        <Radio.Group defaultValue={"translate"} buttonStyle={"solid"}
                                                     onChange={this.dynamicEffectRadioOnChange.bind(this)}
                                        >
                                            <Radio value={"close"}>关闭</Radio>
                                            <Radio value={"translate"}>平移</Radio>
                                            <Radio value={"rotate"}>旋转</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="imageTopicsCheckbox" label="图片主题">
                                        <Checkbox.Group defaultValue={["Fzo3zuOHN6w"]}
                                                        onChange={this.imageTopicsCheckboxOnChange.bind(this)}
                                        >
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
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Drawer>
            </>
        );
    }
}

export default PreferenceComponent;