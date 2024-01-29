import React from "react";
import {Popover, Button, Space, Row, Col, Typography, Switch, List, Input, message} from "antd";
import {btnMouseOut, btnMouseOver, changeThemeColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"
import {getBrowserType} from "../typescripts/publicFunctions";
import {LinkOutlined, DeleteOutlined, PlusOutlined, SyncOutlined} from "@ant-design/icons";

const {Text} = Typography;

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
    focusMode: boolean,
    focusFilter: "whiteListFilter" | "blackListFilter"
    inputValue: string,
    filterList: any[],
    focusMaxSize: number,
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
            focusMode: false,
            focusFilter: "whiteListFilter",
            inputValue: "",
            filterList: [],
            focusMaxSize: 5,
        };
    }

    setExtensionStorage(key: string, value: any) {
        const browserType = getBrowserType();
        if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
            chrome.storage.local.set({[key]: value});
        }
        else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
            browser.storage.local.set({[key]: value});
        }
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
        let tempFilterList = localStorage.getItem("filterList");
        if (tempFilterList) {
            this.setState({
                filterList: []
            }, () => {
                localStorage.removeItem("filterList");
                this.setExtensionStorage("filterList", []);
            })
        }
    }

    switchFilterBtnOnClick() {
        let tempFocusFilter = this.state.focusFilter;
        this.setState({
            focusFilter: (tempFocusFilter === "whiteListFilter" ? "blackListFilter" : "whiteListFilter")
        }, () => {
            localStorage.setItem("focusFilter", this.state.focusFilter);
            this.setExtensionStorage("focusFilter", this.state.focusFilter);
        })
    }

    inputOnChange(e: any) {
        this.setState({
            inputValue: e.target.value
        })
    }

    addFilterListBtnOnClick() {
        if (this.state.filterList.length < this.state.focusMaxSize) {
            if (this.state.inputValue.length > 0) {
                let tempFilterList = this.state.filterList;
                tempFilterList.push({
                    "domain": this.state.inputValue,
                    "timeStamp": Date.now()
                });

                this.setState({
                    inputValue: "",
                    filterList: tempFilterList
                }, () => {
                    localStorage.setItem("filterList", JSON.stringify(this.state.filterList));
                    this.setExtensionStorage("filterList", this.state.filterList);
                })
            }
            else {
                message.error("域名不能为空");
            }
        }
        else {
            message.error("名单数量最多为" + this.state.focusMaxSize + "个");
        }
    }

    removeBtnOnClick(item: any) {
        let filterList = [];
        let tempFilterList = localStorage.getItem("filterList");
        if (tempFilterList) {
            filterList = JSON.parse(tempFilterList);
            let index = -1;
            for (let i = 0; i < filterList.length; i++) {
                if (item.timeStamp === filterList[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                filterList.splice(index, 1);
            }
            localStorage.setItem("filterList", JSON.stringify(filterList));
            this.setExtensionStorage("filterList", filterList);

            this.setState({
                filterList: filterList,
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

        // 初始化过滤模式
        let tempFocusFilter = "whiteListFilter";
        let focusFilterStorage = localStorage.getItem("focusFilter");
        if (focusFilterStorage) {
            tempFocusFilter = focusFilterStorage;
        } else {
            localStorage.setItem("focusFilter", "whiteListFilter");
            this.setExtensionStorage("focusFilter", "whiteListFilter");
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
            focusFilter: tempFocusFilter,
            filterList: tempFilterList,
        });
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={8}>
                    <Text style={{color: this.state.fontColor}}>{"专注模式"}</Text>
                </Col>
                <Col span={16} style={{textAlign: "right"}}>
                    <Space>
                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"focusModeSwitch"}
                                checked={this.state.focusMode} onChange={this.focusModeSwitchOnChange.bind(this)}/>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<DeleteOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                style={{color: this.state.fontColor}} onClick={this.removeAllBtnOnClick.bind(this)}>
                            {"全部清空"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List
                header={
                    <Row align={"middle"}>
                        <Col span={8}>
                            <Space>
                                <Text style={{color: this.state.fontColor}}>
                                    {(this.state.focusFilter === "whiteListFilter" ? "白名单 " : "黑名单 ") + this.state.filterList.length + " / " + this.state.focusMaxSize}
                                </Text>
                                <Button type={"text"} shape={this.state.buttonShape} icon={<SyncOutlined />}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                        onClick={this.switchFilterBtnOnClick.bind(this)}
                                        style={{color: this.state.fontColor}}>
                                </Button>
                            </Space>
                        </Col>
                        <Col span={16} style={{textAlign: "right"}}>
                            <Space>
                                <Input placeholder="example.com" value={this.state.inputValue} onChange={this.inputOnChange.bind(this)}
                                       maxLength={20} showCount allowClear/>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                        onClick={this.addFilterListBtnOnClick.bind(this)}
                                        style={{color: this.state.fontColor}}>
                                    {"添加"}
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                }
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
                        {
                            this.state.focusFilter === "whiteListFilter" ?
                                "白名单模式下，访问白名单外的网站将自动跳转至新标签页或空白页" :
                                "黑名单模式下，访问黑名单中的网站将自动跳转至新标签页或空白页"
                        }
                    </Text>
                }
            />
        );
        
        return (
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
        );
    }
}

export default FocusComponent;