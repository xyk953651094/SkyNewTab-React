import React from "react";
import "../../App.css";
import {Button, Tooltip, Drawer, Typography, Divider, Form, Row, Col, Radio, Checkbox} from "antd";
import type { RadioChangeEvent } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import {SettingOutlined} from "@ant-design/icons";
import {getTimeDetails, changeThemeColor, getThemeColor, getFontColor} from "../../typescripts/publicFunctions";
const $ = require("jquery");
const {Title, Paragraph, Text} = Typography;

type propType = {
    display: "none" | "block",
    themeColor: string,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    componentBackgroundColor: string,
    componentFontColor: string,
    displayDrawer: boolean,
    timeDetails: String[],
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
            timeDetails: [""]
        };
    }

    componentDidMount() {
        let timeDetails = getTimeDetails(new Date());
        this.setState({
            timeDetails: [timeDetails.showDate2 + " " + timeDetails.showWeek, timeDetails.showLocaleDate]
        })
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#preferenceBtn", nextProps.themeColor);
            this.setState({
                backgroundColor: nextProps.themeColor,
                fontColor: getFontColor(nextProps.themeColor),
                componentBackgroundColor: getThemeColor(nextProps.themeColor),
                componentFontColor: getFontColor(getThemeColor(nextProps.themeColor))
            });
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        $(".ant-drawer-title").css("color", this.state.fontColor);             // 抽屉 header 样式
        $(".ant-form-item-label > label").css("color", this.state.fontColor);  // 抽屉 body 样式
        $(".ant-radio-wrapper").children(":last-child").css("color", this.state.fontColor);
        $(".ant-checkbox-wrapper").children(":last-child").css("color", this.state.fontColor);
        $(".ant-typography").css("color", this.state.fontColor);               // 抽屉 footer 样式
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
        console.log(event.target.value);
    }

    dynamicEffectRadioOnChange(event: RadioChangeEvent) {
        console.log(event.target.value);
    }

    // 图片主题
    imageTopicsCheckboxOnChange(checkedValues: CheckboxValueType[]) {
        console.log('checked = ', checkedValues);
    }

    render() {
        return (
            <>
                <Tooltip title={"偏好设置"}>
                    <Button shape="round" icon={<SettingOutlined/>} size={"large"}
                            onClick={this.drawerOnShow.bind(this)}
                            id={"preferenceBtn"}
                            className={"frostedGlass zIndexHigh"}
                            style={{
                                display: this.props.display,
                            }}
                    />
                </Tooltip>
                <Drawer
                    title="偏好设置"
                    size={"default"}
                    onClose={this.drawerOnClose.bind(this)}
                    open={this.state.displayDrawer}
                    drawerStyle={{
                        backgroundColor: this.state.backgroundColor,
                    }}
                    footer={
                        <Row align={"middle"}>
                            <Col span={12}>
                                <Text>版本号：V1.0.2</Text>
                            </Col>
                        </Row>
                    }
                >
                    <Form colon={false}>
                        <Form.Item name="time">
                            <Title level={3}>{this.state.timeDetails[0]}</Title>
                            <Text>{this.state.timeDetails[1]}</Text>
                        </Form.Item>
                        <Form.Item name="poem">
                            <Paragraph>
                                「 江畔何人初见月，江月何年初照人，江畔何人初见月，江月何年初照人，江畔何人初见月，江月何年初照人 」--【唐】·张若虚·《春江花月夜》
                            </Paragraph>
                        </Form.Item>
                        <Divider></Divider>
                        <Form.Item name="displayEffectRadio" label="图片质量">
                            <Radio.Group defaultValue={"regular"} buttonStyle={"solid"}
                                         onChange={this.displayEffectRadioOnChange.bind(this)}
                            >
                                <Radio value={"regular"}>标准</Radio>
                                <Radio value={"full"}>完整</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="dynamicEffectRadio" label="动效样式">
                            <Radio.Group defaultValue={1} buttonStyle={"solid"}
                                         onChange={this.dynamicEffectRadioOnChange.bind(this)}
                            >
                                <Radio value={1}>平移</Radio>
                                <Radio value={2}>旋转</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="imageTopicsCheckbox" label="图片主题">
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.imageTopicsCheckboxOnChange.bind(this)}>
                                <Row>
                                    <Col span={12}>
                                        <Checkbox value="travel">旅游</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="wallpapers">壁纸</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="textures-patterns">纹理 & 图案</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="nature">自然</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="Interiors">精神</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="street-photography">街头摄影</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="arts-culture">艺术 & 文化</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>

                    </Form>
                </Drawer>
            </>
        );
    }
}

export default PreferenceComponent;