import React from "react";
import {Button, Col, Form, Input, List, message, Modal, Popover, Row, Select, Space, Switch, Typography} from "antd";
import {
    btnMouseOut,
    btnMouseOver,
    changeThemeColor,
    getBrowserType,
    getTimeDetails
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"
import {DeleteOutlined, LinkOutlined, PlusOutlined} from "@ant-design/icons";
import focusSoundOne from "../assets/focusSounds/古镇雨滴.mp3";
import focusSoundTwo from "../assets/focusSounds/松树林小雪.mp3";
import focusSoundThree from "../assets/focusSounds/漓江水.mp3";
import focusSoundFour from "../assets/focusSounds/泉水水滴.mp3";

const focusAudio = new Audio();
const {Text} = Typography;
const focusMaxSize = 10;
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
    focusPeriod: string,
    focusEndTime: string,
    focusSound: string,
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
            filterList: [],
            focusPeriod: "manual",
            focusEndTime: "未开启专注模式",
            focusSound: "none",
        };
    }

    setExtensionStorage(key: string, value: any) {
        if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
            chrome.storage.local.set({[key]: value});
        }
        else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
            browser.storage.local.set({[key]: value});
        }
    }

    focusModeSwitchOnChange(checked: boolean) {
        let tempFocusEndTime: string;
        let tempFocusEndTimeStamp: number = -1;
        if (checked) {
            if (this.state.focusPeriod === "manual") {
                tempFocusEndTime = "手动结束";
                tempFocusEndTimeStamp = 0;
            } else {
                tempFocusEndTimeStamp = Date.now() + Number(this.state.focusPeriod);
                tempFocusEndTime = getTimeDetails(new Date(tempFocusEndTimeStamp)).showDetail;
            }
        } else {
            tempFocusEndTime = "未开启专注模式";
            tempFocusEndTimeStamp = -1;
        }

        this.setState({
            focusMode: checked,
            focusEndTime: tempFocusEndTime,
        }, () => {
            localStorage.setItem("focusMode", JSON.stringify(checked));
            localStorage.setItem("focusPeriod", JSON.stringify(this.state.focusPeriod));
            localStorage.setItem("focusEndTimeStamp", JSON.stringify(tempFocusEndTimeStamp));
            this.setExtensionStorage("focusMode", checked);
            this.setExtensionStorage("focusEndTimeStamp", tempFocusEndTimeStamp);

            this.autoStopFocus(tempFocusEndTimeStamp);
        });

        // 关闭时停止播放白噪音
        if (!checked && !focusAudio.paused) {
            focusAudio.pause();
        }
    }

    removeAllBtnOnClick() {
        this.setState({
            filterList: []
        }, () => {
            localStorage.removeItem("filterList");
            this.setExtensionStorage("filterList", this.state.filterList);
            message.success("删除成功");
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
            message.success("删除成功");
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
    }

    modalCancelBtnOnClick() {
        this.setState({
            displayModal: false
        })
    }

    focusTimeSelectOnChange(value: string) {
        this.setState({
            focusPeriod: value
        })
    }

    focusSoundSelectOnChange(value: string) {
        this.setState({
            focusSound: value,
        }, () => {
            if (value === "none" ) {
                focusAudio.pause();
            } else {
                this.playFocusSound(value);
            }
        });
    }

    playFocusSound(focusSound: string) {
        switch (focusSound) {
            case "古镇雨滴": {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240111/20240111145637_8657.mp3";
                focusAudio.src = focusSoundOne;
                break;
            }
            case "松树林小雪": {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240125/20240125190612_0979.mp3";
                focusAudio.src = focusSoundTwo;
                break;
            }
            case "漓江水": {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240406/20240406102328_8511.mp3";
                focusAudio.src = focusSoundThree;
                break;
            }
            case "泉水水滴": {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240406/20240406105745_9941.mp3";
                focusAudio.src = focusSoundFour;
                break;
            }
            default: {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240111/20240111145637_8657.mp3";
                focusAudio.src = focusSoundOne;
            }
        }
        focusAudio.loop = true;
        focusAudio.play();
    }

    // 倒计时自动关闭专注模式
    autoStopFocus(focusEndTimeStamp: number) {

        if (this.state.focusMode && focusEndTimeStamp > 0 && Date.now() < focusEndTimeStamp) {
            let interval = setInterval(() => {
                if (Date.now() >= focusEndTimeStamp) {
                    this.setState({
                        focusMode: false,
                        focusPeriod: "manual",
                        focusEndTime: "未开启专注模式",
                        focusSound: "none",
                    }, () => {
                        this.resetFocusModeStorage();
                        message.info("已结束专注模式");
                        focusAudio.pause();
                        clearInterval(interval);
                    });
                }
            }, 1000);
        }
    }

    resetFocusModeStorage() {
        localStorage.setItem("focusMode", JSON.stringify(false));
        localStorage.setItem("focusPeriod", JSON.stringify("manual"));
        localStorage.setItem("focusEndTimeStamp", JSON.stringify(-1));
        this.setExtensionStorage("focusMode", false);
        this.setExtensionStorage("focusEndTimeStamp", -1);
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
                    focusPeriod: "manual",
                    focusEndTime: "未开启专注模式",
                    focusSound: "none",
                }, () => {
                    this.resetFocusModeStorage();
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

        // 初始化专注时间
        let tempFocusPeriod = "manual";
        let focusPeriodStorage = localStorage.getItem("focusPeriod");
        if (focusPeriodStorage) {
            tempFocusPeriod = tempFocusMode ? JSON.parse(focusPeriodStorage) : "manual";
        } else {
            localStorage.setItem("focusPeriod", JSON.stringify("manual"));
        }

        // 初始化专注截止时间
        let tempFocusEndTime = "未开启专注模式";
        let tempFocusEndTimeStamp = -1;
        let focusEndTimeStampStorage = localStorage.getItem("focusEndTimeStamp");
        if (focusEndTimeStampStorage) {
            tempFocusEndTimeStamp = JSON.parse(focusEndTimeStampStorage);

            if (tempFocusEndTimeStamp === -1) {
                tempFocusEndTime = "未开启专注模式";
            } else if (tempFocusEndTimeStamp === 0) {
                tempFocusEndTime = "手动结束";
            } else {
                tempFocusEndTime = getTimeDetails(new Date(tempFocusEndTimeStamp)).showDetail;
            }
        } else {
            localStorage.setItem("focusEndTimeStamp", JSON.stringify(-1));
            this.setExtensionStorage("focusEndTimeStamp", -1);
        }

        // 极简模式下或者专注时段过去后关闭专注模式
        if (this.props.preferenceData.simpleMode || (tempFocusMode && tempFocusEndTimeStamp > 0 && Date.now() > tempFocusEndTimeStamp)) {
            tempFocusMode = false;
            tempFocusPeriod = "manual";
            tempFocusEndTime = "未开启专注模式";
            this.resetFocusModeStorage();
        }

        if (tempFocusMode) {
            message.info("已开启专注模式");
        }

        this.setState({
            focusMode: tempFocusMode,
            filterList: tempFilterList,
            focusPeriod: tempFocusPeriod,
            focusEndTime: tempFocusEndTime,
        }, () => {
            this.autoStopFocus(tempFocusEndTimeStamp);
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
                            {"添加黑名单"}
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
                header={
                    <Space>
                        <Select defaultValue={this.state.focusSound} style={{width: 160}}
                                onChange={this.focusSoundSelectOnChange.bind(this)}
                                options={[
                                    {value: "none", label: "不播放白噪音"},
                                    {value: "古镇雨滴", label: "声谷 - 古镇雨滴"},
                                    {value: "松树林小雪", label: "声谷 - 松树林小雪"},
                                    {value: "漓江水", label: "声谷 - 漓江水"},
                                    {value: "泉水水滴", label: "声谷 - 泉水水滴"}
                                ]}
                        />
                        <Select value={this.state.focusPeriod} style={{width: 120}} placement={"topLeft"}
                                disabled={this.state.focusMode}
                                onChange={this.focusTimeSelectOnChange.bind(this)}
                                options={[
                                    {value: "manual", label: "手动结束"},
                                    {value: "900000", label: "15 分钟后"},
                                    {value: "1800000", label: "30 分钟后"},
                                    {value: "2700000", label: "45 分钟后"},
                                    {value: "3600000", label: "60 分钟后"},
                                    {value: "5400000", label: "90 分钟后"},
                                    {value: "7200000", label: "120 分钟后"},
                                ]}
                        />
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                style={{color: this.state.fontColor, cursor: "default"}}>
                            {"结束时间：" + this.state.focusEndTime}
                        </Button>
                    </Space>
                }
            />
        );
        
        return (
            <>
                <Popover title={popoverTitle} content={popoverContent} placement={"bottomRight"}
                         color={this.state.backgroundColor}
                         overlayStyle={{width: "550px"}}>
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
                        {"添加黑名单 " + this.state.filterList.length + " / " + focusMaxSize}
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
                        <Form.Item label={"网站域名"} name={"focusInput"} extra={"开启专注模式后，访问黑名单中的域名时将自动跳转至本插件"}>
                            <Input placeholder="example.com" value={this.state.inputValue} onChange={this.inputOnChange.bind(this)}
                                   maxLength={30} showCount allowClear/>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default FocusComponent;