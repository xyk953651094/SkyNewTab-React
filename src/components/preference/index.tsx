import React from "react";
import "../../App.css";
import {Button, Tooltip, Drawer, Typography, Form, Row, Col, Switch, Radio} from "antd";
import {SettingOutlined, ShareAltOutlined} from "@ant-design/icons";
import {changeThemeColor, getThemeColor, getFontColor} from "../../typescripts/publicFunctions";
const $ = require("jquery");
const {Text} = Typography;

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
            displayDrawer: false
        };
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
        $(".ant-typography").css("color", this.state.fontColor);               // 抽屉 footer 样式
    }

    onShow() {
        this.setState({
            displayDrawer: true,
        })
    };
    
    onSubmit() {
        this.setState({
            displayDrawer: false,
        })
    }

    onClose() {
        this.setState({
            displayDrawer: false,
        })
    };

    switchDisplayImage(checked: boolean) {

    }

    switchDynamicImage() {

    }

    render() {
        return (
            <>
                <Tooltip title={"偏好设置"}>
                    <Button shape="round" icon={<SettingOutlined/>} size={"large"}
                            onClick={this.onShow.bind(this)}
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
                    onClose={this.onClose.bind(this)}
                    open={this.state.displayDrawer}
                    drawerStyle={{
                        backgroundColor: this.state.backgroundColor,
                        // color: this.state.fontColor
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
                        <Form.Item name="switchDisplayImage" label="背景图片">
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked
                                    onChange={this.switchDisplayImage.bind(this)}
                            />
                        </Form.Item>
                        <Form.Item name="switchDisplayEffect" label="图片质量">
                            <Radio.Group defaultValue={"regular"} buttonStyle={"solid"}>
                                <Radio value={"regular"}>标准</Radio>
                                <Radio value={"full"}>完整</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="switchDynamicImage" label="图片动效">
                            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked
                                    onChange={this.switchDynamicImage.bind(this)}
                            />
                        </Form.Item>
                        <Form.Item name="switchDynamicEffect" label="动效样式">
                            <Radio.Group defaultValue={1} buttonStyle={"solid"}>
                                <Radio value={1}>平移</Radio>
                                <Radio value={2}>旋转</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/*<Form.Item name="switchImageEffect" label="字体样式">*/}
                        {/*    <Radio.Group defaultValue={"regular"}>*/}
                        {/*        <Radio value={"regular"}>标准</Radio>*/}
                        {/*        <Radio value={"full"}>完整</Radio>*/}
                        {/*    </Radio.Group>*/}
                        {/*</Form.Item>*/}
                    </Form>
                </Drawer>
            </>
        );
    }
}

export default PreferenceComponent;