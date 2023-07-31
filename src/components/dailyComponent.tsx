import React from "react";
import type {DatePickerProps} from 'antd';
import {
    Badge,
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    List,
    message,
    Modal,
    Popover,
    Row,
    Space,
    Typography
} from "antd";
import {CalendarOutlined, CloseOutlined, DeleteOutlined, PlusOutlined, ClockCircleOutlined} from "@ant-design/icons";
import {changeThemeColor, getFontColor, getTimeDetails} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

const {Text} = Typography;
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
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
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            displayModal: false,
            listItems: [],
            dailySize: 0,
            dailyMaxSize: 5,
            selectedTimeStamp: 0,
        };
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.state.hoverColor;
        e.currentTarget.style.color = getFontColor(this.state.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.state.fontColor;
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
            // $("#dailyInput").val("");
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
                let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();
                let description, status;
                if (todayTimeStamp - this.state.selectedTimeStamp > 0) {
                    description = "已过 " + ((todayTimeStamp - this.state.selectedTimeStamp) / 86400000) + " 天";
                    status = "expired";
                } else if (todayTimeStamp - this.state.selectedTimeStamp === 0) {
                    description = "就是今天";
                    status = "today";
                } else {
                    description = "还剩 " + ((this.state.selectedTimeStamp - todayTimeStamp) / 86400000) + " 天";
                    status = "not expired";
                }

                daily.push({"title": title, "description": description, "status": status, "selectedTimeStamp": this.state.selectedTimeStamp,   "timeStamp": Date.now()});
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
            message.error("倒数日内容不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.setState({
            displayModal: false
        })
    }

    datePickerOnChange: DatePickerProps['onChange'] = (date, dateString) => {
        this.setState({
            selectedTimeStamp: new Date(dateString).getTime()
        })
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
    }

    render() {
        const popoverTitle = (
            <Row>
                <Col span={12} style={{display: "flex", alignItems: "center"}}>
                    <Text
                        style={{color: this.state.fontColor}}>{"倒数日 " + this.state.dailySize + " / " + this.state.dailyMaxSize}</Text>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Space>
                        <Button type="text" shape="circle" size={"small"} icon={<PlusOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.state.fontColor}} onClick={this.showAddModalBtnOnClick.bind(this)}/>
                        <Button type="text" shape="circle" size={"small"} icon={<DeleteOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.state.fontColor}} onClick={this.removeAllBtnOnClick.bind(this)}/>
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
                            <Button type="text" shape="circle" size={"small"} icon={<CloseOutlined/>}
                                    onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                    onClick={this.removeBtnOnClick.bind(this, item)}
                                    style={{color: this.state.fontColor}}/>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={getTimeDetails(new Date(item.selectedTimeStamp)).showDate5 + " " + item.description}
                        />
                    </List.Item>
                )}
            />
        );

        return (
            <Row>
                <Popover title={popoverTitle} content={popoverContent} color={this.state.backgroundColor}
                         overlayStyle={{width: "300px"}}>
                    <Badge size="small" count={this.state.listItems.length}>
                        <Button shape="circle" icon={<CalendarOutlined/>} size={"large"}
                                id={"dailyBtn"}
                                className={"componentTheme zIndexHigh"}
                        />
                    </Badge>
                </Popover>
                <Modal title={"添加倒数日 " + this.state.dailySize + " / " + this.state.dailyMaxSize} closeIcon={false}
                       centered
                       open={this.state.displayModal} onOk={this.modalOkBtnOnClick.bind(this)}
                       onCancel={this.modalCancelBtnOnClick.bind(this)}
                       destroyOnClose={true}
                       maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                >
                    <Form>
                        <Form.Item label="标题" name="dailyInput" rules={[{required: true, message: "标题不能为空"}]}>
                            <Input placeholder="请输入标题" id="dailyInput" maxLength={10} allowClear showCount/>
                        </Form.Item>
                        <Form.Item label="日期" name="dailyDatePicker"
                                   rules={[{required: true, message: "日期不能为空"}]}>
                            <DatePicker onChange={this.datePickerOnChange} id={"dailyDatePicker"}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>
        );
    }
}

export default DailyComponent;