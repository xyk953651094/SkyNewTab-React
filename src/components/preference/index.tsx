import React from "react";
import "../../App.css";
import {Button, Tooltip, Drawer, Card, Typography, Form, Row, Col, Radio, Checkbox} from "antd";
import type { RadioChangeEvent } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import {MoreOutlined} from "@ant-design/icons";
import {getTimeDetails, changeThemeColor, getFontColor, deviceModel} from "../../typescripts/publicFunctions";
const $ = require("jquery");
const {Title, Paragraph, Text} = Typography;

type propType = {
    themeColor: string,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    componentBackgroundColor: string,
    componentFontColor: string,
    displayDrawer: boolean,
    drawerPosition: "right" | "bottom",
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
            drawerPosition: "right",
            timeDetails: [""]
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
                componentFontColor: getFontColor(nextProps.imageData.color)
            });
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        $(".ant-drawer-title").css("color", this.state.fontColor);               // 抽屉 header 样式
        $(".ant-card-head").css("backgroundColor", this.state.backgroundColor);  // 抽屉 body 样式
        $(".ant-card-head-title").css("color", this.state.fontColor);
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
        console.log(event.target.value);
    }

    // 动效样式
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
                    title="抽屉"
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
                            <Card title={this.state.timeDetails[0]} headStyle={{"fontSize": "16px"}} bodyStyle={{"fontSize": "16px"}} size={"small"} hoverable>
                                <Paragraph>
                                    <ul>
                                        <li>
                                            <Text>{this.state.timeDetails[1]}</Text>
                                        </li>
                                        <li>
                                            <Text>{this.state.timeDetails[1]}</Text>
                                        </li>
                                        <li>
                                            <Text>{this.state.timeDetails[1]}</Text>
                                        </li>
                                    </ul>
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title={"【唐】· 张若虚 ·《春江花月夜》"} headStyle={{"fontSize": "16px"}} bodyStyle={{"fontSize": "16px"}} size={"small"} hoverable>
                                <Paragraph>
                                    「 江畔何人初见月，江月何年初照人，江畔何人初见月，江月何年初照人，江畔何人初见月，江月何年初照人 」
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title={"偏好设置"} headStyle={{"fontSize": "16px"}} bodyStyle={{"fontSize": "16px"}} size={"small"} hoverable>
                                <Form colon={false}>
                                    <Form.Item name="displayEffectRadio" label="图片质量">
                                        <Radio.Group defaultValue={"regular"} buttonStyle={"solid"}
                                                     onChange={this.displayEffectRadioOnChange.bind(this)}
                                        >
                                            <Radio value={"regular"}>标准</Radio>
                                            <Radio value={"full"}>最高</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="dynamicEffectRadio" label="动效样式">
                                        <Radio.Group defaultValue={1} buttonStyle={"solid"}
                                                     onChange={this.dynamicEffectRadioOnChange.bind(this)}
                                        >
                                            <Radio value={"close"}>关闭</Radio>
                                            <Radio value={"translate"}>平移</Radio>
                                            <Radio value={"rotate"}>旋转</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="imageTopicsCheckbox" label="图片主题">
                                        <Checkbox.Group style={{ width: '100%' }} onChange={this.imageTopicsCheckboxOnChange.bind(this)}>
                                            <Row>
                                                <Col span={12}><Checkbox value="travel">旅游</Checkbox></Col>
                                                <Col span={12}><Checkbox value="wallpapers">壁纸</Checkbox></Col>
                                                <Col span={12}><Checkbox value="textures-patterns">纹理 & 图案</Checkbox></Col>
                                                <Col span={12}><Checkbox value="nature">自然</Checkbox></Col>
                                                <Col span={12}><Checkbox value="interiors">精神</Checkbox></Col>
                                                <Col span={12}><Checkbox value="street-photography">街头摄影</Checkbox></Col>
                                                <Col span={12}><Checkbox value="arts-culture">艺术 & 文化</Checkbox></Col>
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