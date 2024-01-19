import React from "react";
import {Popover, Button, Space, Row, Col, Typography, Switch, Checkbox} from "antd";
import {changeThemeColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"

const {Text} = Typography;

type propType = {
    themeColor: ThemeColorInterface,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    display: "block" | "none",
    backgroundColor: string,
    fontColor: string,
    focusStatus: boolean,
}

interface FocusComponent {
    state: stateType,
    props: propType
}

class FocusComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            display: "block",
            backgroundColor: "",
            fontColor: "",
            focusStatus: false,
        };
    }

    focusModeSwitchOnChange(checked: boolean, e: any) {
        this.setState({
            focusStatus: checked,
        })
    }

    focusModeCheckboxOnChange() {
        
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, () => {
                changeThemeColor("#focusBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                display: nextProps.preferenceData.simpleMode ? "none" : "block",
            });
        }
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={10}>
                    <Text style={{color: this.state.fontColor}}>{"专注模式"}</Text>
                </Col>
                <Col span={14} style={{textAlign: "right"}}>
                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"focusModeSwitch"}
                            onChange={this.focusModeSwitchOnChange.bind(this)}/>
                </Col>
            </Row>
        );

        const popoverContent = (
            <Space direction={"vertical"}>
                <Text style={{color: this.state.fontColor}}>{"开启后将屏蔽以下网站："}</Text>
                <Checkbox.Group onChange={this.focusModeCheckboxOnChange.bind(this)}>
                    <Row gutter={[0, 8]}>
                        <Col span={12}>
                            <Checkbox name={"weibo"} value={"weibo"} id={"weibo"}>微博</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"zhihu"} value={"zhihu"} id={"zhihu"}>知乎</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"bilibili"} value={"bilibili"} id={"bilibili"}>豆瓣</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"zhihu"} value={"zhihu"} id={"zhihu"}>小红书</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"zhihu"} value={"zhihu"} id={"zhihu"}>抖音</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"zhihu"} value={"zhihu"} id={"zhihu"}>快手</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"bilibili"} value={"bilibili"} id={"bilibili"}>优酷</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"bilibili"} value={"bilibili"} id={"bilibili"}>爱奇艺</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"bilibili"} value={"bilibili"} id={"bilibili"}>腾讯视频</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"bilibili"} value={"bilibili"} id={"bilibili"}>西瓜视频</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"bilibili"} value={"bilibili"} id={"bilibili"}>哔哩哔哩</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"bilibili"} value={"bilibili"} id={"bilibili"}>AcFun</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox name={"twitter"} value={"twitter"} id={"twitter"}>推特</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Space>
        );
        
        return (
            <Popover title={popoverTitle} content={popoverContent} placement={"bottomRight"}
                     color={this.state.backgroundColor}
                     overlayStyle={{width: "300px"}}>
                <Button shape={this.props.preferenceData.buttonShape} size={"large"}
                        icon={<i className={this.state.focusStatus ? "bi bi-cup-hot-fill" : "bi bi-cup-hot"}></i>}
                        id={"focusBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{cursor: "default", display: this.state.display}}
                >
                    {this.state.focusStatus ? "专注中" : "未专注"}
                </Button>
            </Popover>
        );
    }
}

export default FocusComponent;