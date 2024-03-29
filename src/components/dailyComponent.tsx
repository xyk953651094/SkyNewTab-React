import React from "react";
import type {DatePickerProps} from 'antd';
import {Button, Col, DatePicker, Form, Input, List, message, Modal, Popover, Row, Space, Typography} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, changeThemeColor, getTimeDetails} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import $ from "jquery";

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
    displayModal: boolean,
    inputValue: string,
    dailyList: any,
    selectedTimeStamp: number,
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
            displayModal: false,
            inputValue: "",
            dailyList: [],
            selectedTimeStamp: 0,
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

    showAddModalBtnOnClick() {
        if (this.state.dailyList.length < dailyMaxSize) {
            this.setState({
                displayModal: true,
                inputValue: "",
                selectedTimeStamp: 0
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
        if (dateString) {
            this.setState({
                selectedTimeStamp: new Date(dateString).getTime()
            })
        } else {
            this.setState({
                selectedTimeStamp: 0
            })
        }
    };

    componentDidMount() {
        let tempDailyList = [];
        let dailyListStorage = localStorage.getItem("daily");
        if (dailyListStorage) {
            tempDailyList = JSON.parse(dailyListStorage);
        }

        this.setState({
            dailyList: tempDailyList,
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
                <Col span={10}>
                    <Text style={{color: this.state.fontColor}}>
                        {"倒数日 " + this.state.dailyList.length + " / " + dailyMaxSize}
                    </Text>
                </Col>
                <Col span={14} style={{textAlign: "right"}}>
                    <Space>
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
                                    {getTimeDetails(new Date(item.selectedTimeStamp)).showDate4 + " ｜ " + this.getDailyDescription(item.selectedTimeStamp)}
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
                         overlayStyle={{width: "550px"}}>
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
                            <DatePicker onChange={this.datePickerOnChange} id={"dailyDatePicker"} allowClear={false}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>
        );
    }
}

export default DailyComponent;