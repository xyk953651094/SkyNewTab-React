import React from "react";
import {
    Popover,
    Button,
    Space,
    Row,
    Col,
    Typography,
    Switch,
    List,
    Input,
    message,
    Form,
    Modal
} from "antd";
import {btnMouseOut, btnMouseOver, changeThemeColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"
import {getBrowserType} from "../typescripts/publicFunctions";
import {LinkOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

const {Text} = Typography;
const focusMaxSize = 5;
const browserType = getBrowserType();

type propType = {
    themeColor: ThemeColorInterface,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    display: "block" | "none",
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    buttonShape: "circle" | "default" | "round" | undefined,
    displayModal: boolean,
    focusMode: boolean,
    inputValue: string,
    filterList: any[],
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
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            buttonShape: "circle",
            displayModal: false,
            focusMode: false,
            inputValue: "",
            filterList: []
        };
    }

    setExtensionStorage(key: string, value: any) {
        // if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
        //     chrome.storage.local.set({[key]: value});
        // }
        // else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
        //     browser.storage.local.set({[key]: value});
        // }
    }

    focusModeSwitchOnChange(checked: boolean) {
        this.setState({
            focusMode: checked,
        }, () => {
            localStorage.setItem("focusMode", JSON.stringify(checked));
            this.setExtensionStorage("focusMode", checked);
        })
    }

    removeAllBtnOnClick() {
        this.setState({
            filterList: []
        }, () => {
            localStorage.removeItem("filterList");
            this.setExtensionStorage("filterList", this.state.filterList);
        });
    }

    removeBtnOnClick(item: any) {
        let tempFilterList = this.state.filterList;
        let index = -1;
        for (let i = 0; i < tempFilterList.length; i++) {
            if (item.timeStamp === tempFilterList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempFilterList.splice(index, 1);
        }

        this.setState({
            filterList: tempFilterList,
        }, () => {
            localStorage.setItem("filterList", JSON.stringify(this.state.filterList));
            this.setExtensionStorage("filterList", this.state.filterList);
        })
    }

    showAddModalBtnOnClick() {
        if (this.state.filterList.length < focusMaxSize) {
            this.setState({
                displayModal: true,
                inputValue: ""
            })
        } else {
            message.error("域名数量最多为" + focusMaxSize + "个");
        }
    }

    inputOnChange(e: any) {
        this.setState({
            inputValue: e.target.value
        })
    }

    modalOkBtnOnClick() {
        if (this.state.filterList.length < focusMaxSize) {
            if (this.state.inputValue.length > 0) {
                let tempFilterList = this.state.filterList;
                tempFilterList.push({
                    "domain": this.state.inputValue,
                    "timeStamp": Date.now()
                });

                this.setState({
                    displayModal: false,
                    filterList: tempFilterList
                }, () => {
                    localStorage.setItem("filterList", JSON.stringify(this.state.filterList));
                    this.setExtensionStorage("filterList", this.state.filterList);
                    message.success("添加成功");
                });
            } else {
                message.error("域名不能为空");
            }
        } else {
            message.error("域名数量最多为" + focusMaxSize + "个");
        }
    }

    modalCancelBtnOnClick() {
        this.setState({
            displayModal: false
        })
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
            if (nextProps.preferenceData.simpleMode) {
                this.setState({
                    focusMode: false,
                }, () => {
                    localStorage.setItem("focusMode", JSON.stringify(false));
                    this.setExtensionStorage("focusMode", false);
                })
            }

            this.setState({
                display: nextProps.preferenceData.simpleMode ? "none" : "block",
                buttonShape: nextProps.preferenceData.buttonShape === "round" ? "circle" : "default"
            });
        }
    }

    componentDidMount() {
        // 初始化专注模式开启状态
        let tempFocusMode = false;
        let focusModeStorage = localStorage.getItem("focusMode");
        if (focusModeStorage) {
            tempFocusMode = JSON.parse(focusModeStorage);
        } else {
            localStorage.setItem("focusMode", JSON.stringify(false));
            this.setExtensionStorage("focusMode", false);
        }

        // 初始化名单
        let tempFilterList = [];
        let filterListStorage = localStorage.getItem("filterList");
        if (filterListStorage) {
            tempFilterList = JSON.parse(filterListStorage);
        } else {
            localStorage.setItem("filterList", JSON.stringify([]));
            this.setExtensionStorage("filterList", []);
        }

        this.setState({
            focusMode: tempFocusMode,
            filterList: tempFilterList,
        });
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={8}>
                    <Text style={{color: this.state.fontColor}}>
                        {"专注模式 " + this.state.filterList.length + " / " + focusMaxSize}
                    </Text>
                </Col>
                <Col span={16} style={{textAlign: "right"}}>
                    <Space>
                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"focusModeSwitch"}
                                checked={this.state.focusMode} onChange={this.focusModeSwitchOnChange.bind(this)}/>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                style={{color: this.state.fontColor}} onClick={this.showAddModalBtnOnClick.bind(this)}>
                            {"添加域名"}
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<DeleteOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                style={{color: this.state.fontColor}} onClick={this.removeAllBtnOnClick.bind(this)}>
                            {"全部删除"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List
                dataSource={this.state.filterList}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            <Button type={"text"} shape={this.state.buttonShape}
                                    icon={<DeleteOutlined/>}
                                    onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                    onClick={this.removeBtnOnClick.bind(this, item)}
                                    style={{color: this.state.fontColor}}/>
                        ]}
                    >
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<LinkOutlined />}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                style={{color: this.state.fontColor, cursor: "default"}}>
                            {item.domain}
                        </Button>
                    </List.Item>
                )}
                footer={
                    <Text style={{color: this.state.fontColor}}>
                        {"开启专注模式后，访问以上域名时将自动跳转至新标签页"}
                    </Text>
                }
            />
        );
        
        return (
            <>
                <Popover title={popoverTitle} content={popoverContent} placement={"bottomRight"}
                         color={this.state.backgroundColor}
                         overlayStyle={{width: "500px"}}>
                    <Button shape={this.props.preferenceData.buttonShape} size={"large"}
                            icon={<i className={this.state.focusMode ? "bi bi-cup-hot-fill" : "bi bi-cup-hot"}></i>}
                            id={"focusBtn"}
                            className={"componentTheme zIndexHigh"}
                            style={{cursor: "default", display: this.state.display}}
                    >
                        {this.state.focusMode ? "专注中" : "未专注"}
                    </Button>
                </Popover>
                <Modal title={
                    <Text style={{color: this.state.fontColor}}>
                        {"添加域名 " + this.state.filterList.length + " / " + focusMaxSize}
                    </Text>
                }
                       closeIcon={false}
                       centered
                       open={this.state.displayModal} onOk={this.modalOkBtnOnClick.bind(this)}
                       onCancel={this.modalCancelBtnOnClick.bind(this)}
                       destroyOnClose={true}
                       styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
                >
                    <Form>
                        <Form.Item label={"网站域名"} name={"focusInput"}>
                            <Input placeholder="example.com" value={this.state.inputValue} onChange={this.inputOnChange.bind(this)}
                                   maxLength={20} showCount allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default FocusComponent;