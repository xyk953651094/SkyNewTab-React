import React from "react";
import type {DatePickerProps} from 'antd';
import {Button, Col, DatePicker, Form, Input, List, message, Modal, Popover, Row, Space, Typography} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, changeThemeColor, getTimeDetails} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import $ from "jquery";

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
    displayModal: boolean,
    listItems: any,
    dailySize: number,
    dailyMaxSize: number,
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
            buttonShape: "round",
            displayModal: false,
            listItems: [],
            dailySize: 0,
            dailyMaxSize: 5,
            selectedTimeStamp: 0,
        };
    }

    removeAllBtnOnClick() {
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            localStorage.removeItem("daily");
            this.setState({
                listItems: [],
                dailySize: 0
            })
        }
    }

    removeBtnOnClick(item: any) {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
            let index = -1;
            for (let i = 0; i < daily.length; i++) {
                if (item.timeStamp === daily[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                daily.splice(index, 1);
            }
            localStorage.setItem("daily", JSON.stringify(daily));

            this.setState({
                listItems: daily,
                dailySize: daily.length
            })
        }
    }

    showAddModalBtnOnClick() {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
        }
        if (daily.length < this.state.dailyMaxSize) {
            this.setState({
                displayModal: true,
                selectedTimeStamp: 0
            })
        } else {
            message.error("倒数日数量最多为" + this.state.dailyMaxSize + "个");
        }
    }

    modalOkBtnOnClick() {
        let title = $("#dailyInput").val();
        if (title && title.length > 0 && this.state.selectedTimeStamp !== 0) {
            let daily = [];
            let tempDaily = localStorage.getItem("daily");
            if (tempDaily) {
                daily = JSON.parse(tempDaily);
            }
            if (daily.length < this.state.dailyMaxSize) {
                daily.push({
                    "title": title,
                    "selectedTimeStamp": this.state.selectedTimeStamp,
                    "timeStamp": Date.now()
                });
                localStorage.setItem("daily", JSON.stringify(daily));

                this.setState({
                    displayModal: false,
                    listItems: daily,
                    dailySize: daily.length
                });
                message.success("添加成功");
            } else {
                message.error("倒数日数量最多为" + this.state.dailyMaxSize + "个");
            }
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
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
        }

        this.setState({
            listItems: daily,
            dailySize: daily.length
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
                        {"倒数日 " + this.state.dailySize + " / " + this.state.dailyMaxSize}
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
                dataSource={this.state.listItems}
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
                                    {getTimeDetails(new Date(item.selectedTimeStamp)).showDate4 + "｜" + this.getDailyDescription(item.selectedTimeStamp)}
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
                        {this.state.dailySize + " 个倒数日"}
                    </Button>
                </Popover>
                <Modal title={
                    <Text style={{color: this.state.fontColor}}>
                        {"添加倒数日 " + this.state.dailySize + " / " + this.state.dailyMaxSize}
                    </Text>
                }
                       closeIcon={false}
                       centered
                       open={this.state.displayModal} onOk={this.modalOkBtnOnClick.bind(this)}
                       onCancel={this.modalCancelBtnOnClick.bind(this)}
                       destroyOnClose={true}
                       maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                >
                    <Form>
                        <Form.Item label={"倒数标题"} name={"dailyInput"}>
                            <Input placeholder="请输入标题" id={"dailyInput"} maxLength={10} allowClear showCount/>
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