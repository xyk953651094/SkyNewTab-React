import React from "react";
import {DatePickerProps, Select} from 'antd';
import dayjs from 'dayjs';
import {Button, Col, DatePicker, Form, Input, List, message, Modal, Popover, Row, Space, Typography, Switch} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, changeThemeColor, getTimeDetails, isEmpty} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";

const {Text} = Typography;
const dailyMaxSize = 10;


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
    notification: boolean,
    displayModal: boolean,
    inputValue: string,
    dailyList: any,
    selectedTimeStamp: number,
    dailySelectDisabled: boolean
    loop: string,
}

interface DailyComponent {
    state: stateType,
    props: propType
}

class DailyComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            display: "block",
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            buttonShape: "circle",
            notification: false,
            displayModal: false,
            inputValue: "",
            dailyList: [],
            selectedTimeStamp: 0,
            dailySelectDisabled: false,
            loop: "",
        };
    }

    removeAllBtnOnClick() {
        this.setState({
            dailyList: [],
        }, () => {
            localStorage.removeItem("daily");
        })
    }

    removeBtnOnClick(item: any) {
        let tempDailyList = this.state.dailyList;
        let index = -1;
        for (let i = 0; i < tempDailyList.length; i++) {
            if (item.timeStamp === tempDailyList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempDailyList.splice(index, 1);
        }

        tempDailyList.sort((a: any, b: any) => {
            return a.selectedTimeStamp - b.selectedTimeStamp;
        });

        this.setState({
            dailyList: tempDailyList,
        }, () => {
            localStorage.setItem("daily", JSON.stringify(this.state.dailyList));
        })

    }

    notificationSwitchOnChange(checked: boolean) {
        this.setState({
            notification: checked,
        }, () => {
            localStorage.setItem("dailyNotification", JSON.stringify(checked));
        })
    }

    showAddModalBtnOnClick() {
        if (this.state.dailyList.length < dailyMaxSize) {
            this.setState({
                displayModal: true,
                inputValue: "",
                selectedTimeStamp: 0,
                loop: ""
            })
        } else {
            message.error("倒数日数量最多为" + dailyMaxSize + "个");
        }
    }

    inputOnChange(e: any) {
        this.setState({
            inputValue: e.target.value
        })
    }

    modalOkBtnOnClick() {
        if (this.state.inputValue && this.state.inputValue.length > 0 && this.state.selectedTimeStamp !== 0) {
            let tempDailyList = this.state.dailyList;
            tempDailyList.push({
                "title": this.state.inputValue,
                "selectedTimeStamp": this.state.selectedTimeStamp,
                "loop": this.state.loop,
                "timeStamp": Date.now()
            });

            tempDailyList.sort((a: any, b: any) => {
                return a.selectedTimeStamp - b.selectedTimeStamp;
            });

            this.setState({
                displayModal: false,
                dailyList: tempDailyList,
            }, () => {
                localStorage.setItem("daily", JSON.stringify(this.state.dailyList));
                message.success("添加成功");
            });
        } else {
            message.error("表单不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.setState({
            displayModal: false
        })
    }

    getDailyDescription(selectedTimeStamp: number) {
        let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();
        let description;
        if (todayTimeStamp - selectedTimeStamp > 0) {
            description = "已过 " + ((todayTimeStamp - selectedTimeStamp) / 86400000) + " 天";
        } else if (todayTimeStamp - selectedTimeStamp === 0) {
            description = "就是今天";
        } else {
            description = "还剩 " + ((selectedTimeStamp - todayTimeStamp) / 86400000) + " 天";
        }
        return description;
    }

    datePickerOnChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString && typeof dateString === "string") {
            this.setState({
                selectedTimeStamp: new Date(dateString).getTime(),
                dailySelectDisabled: [29, 30, 31].indexOf(new Date(dateString).getDate()) !== -1
            }, () => {
                if ([29, 30, 31].indexOf(new Date(dateString).getDate()) !== -1) {
                    this.setState({
                        loop: ""
                    });
                }
            })
        } else {
            this.setState({
                selectedTimeStamp: 0
            })
        }
    };

    selectOnChange(value: string) {
        let tempLoop;
        switch (value) {
            case "noLoop":
                tempLoop = "";
                break;
            case "everyWeek":
                tempLoop = "每周";
                break;
            case "everyMonth":
                tempLoop = "每月";
                break;
            case "everyYear":
                tempLoop = "每年";
                break;
            default:
                tempLoop = "";
                break;
        }
        this.setState({
            loop: tempLoop
        })
    }

    componentDidMount() {
        let tempNotification = false;
        let notificationStorage = localStorage.getItem("dailyNotification");
        if (notificationStorage) {
            tempNotification = JSON.parse(notificationStorage);
        } else {
            localStorage.setItem("dailyNotification", JSON.stringify(false));
        }

        let tempDailyList = [];
        let dailyListStorage = localStorage.getItem("daily");
        if (dailyListStorage) {
            tempDailyList = JSON.parse(dailyListStorage);
            
            let tempDailyListModified = false;
            tempDailyList.map((value: any) => {
                let tempValue = value;
                let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();

                // 倒数日通知
                if (tempNotification && value.selectedTimeStamp === todayTimeStamp) {
                    message.info("今日" + value.title);
                }

                // 更新循环倒数日
                if (!isEmpty(value.loop) && value.selectedTimeStamp < todayTimeStamp) {
                    tempDailyListModified = true;
                    switch (value.loop) {
                        case "每周":
                            value.selectedTimeStamp += 604800000;
                            break;
                        case "每月": {
                            let loopYear: string | number = new Date(value.selectedTimeStamp).getFullYear();
                            let loopMonth: string | number = new Date(value.selectedTimeStamp).getMonth() + 1;
                            let loopDate: string | number = new Date(value.selectedTimeStamp).getDate();

                            let nextLoopYear: string | number = loopYear;
                            let nextLoopMonth: string | number = loopMonth + 1;
                            if (loopMonth === 12) {
                                nextLoopYear += 1;
                                nextLoopMonth = 1;
                            }

                            nextLoopYear = nextLoopYear.toString();
                            nextLoopMonth = nextLoopMonth < 10 ? ("0" + nextLoopMonth) : nextLoopMonth.toString();
                            loopDate = loopDate < 10 ? ("0" + loopDate) : loopDate.toString();

                            let nextLoopString = nextLoopYear.toString() + "-" + nextLoopMonth.toString() + "-" + loopDate.toString();
                            value.selectedTimeStamp = new Date(nextLoopString).getTime();
                            break;
                        }
                        case "每年": {
                            let nextLoopYear: string | number = new Date(value.selectedTimeStamp).getFullYear() + 1;
                            let loopMonth: string | number = new Date(value.selectedTimeStamp).getMonth() + 1;
                            let loopDate: string | number = new Date(value.selectedTimeStamp).getDate();

                            nextLoopYear = nextLoopYear.toString();
                            loopMonth = loopMonth < 10 ? ("0" + loopMonth) : loopMonth.toString();
                            loopDate = loopDate < 10 ? ("0" + loopDate) : loopDate.toString();

                            let nextLoopString = nextLoopYear.toString() + "-" + loopMonth.toString() + "-" + loopDate.toString();
                            value.selectedTimeStamp = new Date(nextLoopString).getTime();
                            break;
                        }
                    }
                }
                return tempValue;
            });

            if (tempDailyListModified) {
                tempDailyList.sort((a: any, b: any) => {
                    return a.selectedTimeStamp - b.selectedTimeStamp;
                });
                localStorage.setItem("daily", JSON.stringify(tempDailyList));
            }
        }

        this.setState({
            dailyList: tempDailyList,
            notification: tempNotification,
        })
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, () => {
                changeThemeColor("#dailyBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                display: nextProps.preferenceData.simpleMode ? "none" : "block",
                buttonShape: nextProps.preferenceData.buttonShape === "round" ? "circle" : "default"
            })
        }
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={8}>
                    <Text style={{color: this.state.fontColor}}>
                        {"倒数日 " + this.state.dailyList.length + " / " + dailyMaxSize}
                    </Text>
                </Col>
                <Col span={16} style={{textAlign: "right"}}>
                    <Space>
                        <Switch checkedChildren="已提醒" unCheckedChildren="不提醒" id={"dailyNotificationSwitch"}
                                checked={this.state.notification} onChange={this.notificationSwitchOnChange.bind(this)}/>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                style={{color: this.state.fontColor}} onClick={this.showAddModalBtnOnClick.bind(this)}>
                            {"添加倒数日"}
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
                dataSource={this.state.dailyList}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            <Button type={"text"} shape={this.state.buttonShape} icon={<DeleteOutlined/>}
                                    onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                    onClick={this.removeBtnOnClick.bind(this, item)}
                                    style={{color: this.state.fontColor}}/>
                        ]}
                    >
                        <Row style={{width: "100%"}}>
                            <Col span={10}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<CalendarOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                    {item.title}
                                </Button>
                            </Col>
                            <Col span={14}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<ClockCircleOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                    {
                                        getTimeDetails(new Date(item.selectedTimeStamp)).showDate4 + " ｜ " +
                                        this.getDailyDescription(item.selectedTimeStamp) +
                                        (isEmpty(item.loop) ? "" : " · " + item.loop)
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        );

        return (
            <Row>
                <Popover title={popoverTitle} content={popoverContent} placement={"bottomRight"}
                         color={this.state.backgroundColor}
                         overlayStyle={{width: "650px"}}>
                    <Button shape={this.props.preferenceData.buttonShape} icon={<CalendarOutlined/>} size={"large"}
                            id={"dailyBtn"}
                            className={"componentTheme zIndexHigh"}
                            style={{cursor: "default", display: this.state.display}}
                    >
                        {this.state.dailyList.length + " 个"}
                    </Button>
                </Popover>
                <Modal title={
                    <Text style={{color: this.state.fontColor}}>
                        {"添加倒数日 " + this.state.dailyList.length + " / " + dailyMaxSize}
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
                        <Form.Item label={"倒数标题"} name={"dailyInput"}>
                            <Input placeholder="请输入标题" value={this.state.inputValue} onChange={this.inputOnChange.bind(this)}
                                   maxLength={10} showCount allowClear/>
                        </Form.Item>
                        <Form.Item label={"倒数日期"} name={"dailyDatePicker"}>
                            <DatePicker disabledDate={(current) => dayjs(current).isBefore(dayjs())}
                                        onChange={this.datePickerOnChange} allowClear={false}
                                        id={"dailyDatePicker"} style={{width: "100%"}}/>
                        </Form.Item>
                        <Form.Item label={"循环周期"} name={"dailySelect"} initialValue={"noLoop"} extra={"倒数日期为29、30、31日时，循环周期不得选择每月、每年"}>
                            <Select onChange={this.selectOnChange.bind(this)}
                                    options={[
                                        {value: "noLoop", label: "不循环"},
                                        {value: "everyWeek", label: "每周"},
                                        {value: "everyMonth", label: "每月（29、30、31日不生效）", disabled: this.state.dailySelectDisabled},
                                        {value: "everyYear", label: "每年（29、30、31日不生效）", disabled: this.state.dailySelectDisabled},
                                    ]}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>
        );
    }
}

export default DailyComponent;