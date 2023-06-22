import React from "react";
import {Popover, Col, Space, Badge, Typography, Button, DatePicker, List, message, Row, Form, Input, Modal} from "antd";
import type { DatePickerProps } from 'antd';
import {CalendarOutlined, PlusOutlined, DeleteOutlined, CloseOutlined} from "@ant-design/icons";
import {changeThemeColor, getTimeDetails} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

const { Text } = Typography;
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    displayAddModal: boolean,
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
            backgroundColor: "",
            fontColor: "",
            displayAddModal: false,
            listItems: [],
            dailySize: 0,
            dailyMaxSize: 5,
            selectedTimeStamp: 0,
        };
    }

    removeAllDaily() {
        let tempDaily = localStorage.getItem("daily");
        if(tempDaily){
            localStorage.removeItem("daily");
            this.setState({
                listItems: [],
                dailySize: 0
            })
        }
    }

    removeDaily(item: any) {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if(tempDaily){
            daily = JSON.parse(tempDaily);
            let index = -1;
            for(let i = 0; i < daily.length; i++) {
                if (item.timeStamp === daily[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if(index !== -1) {
                daily.splice(index, 1);
            }
            localStorage.setItem("daily", JSON.stringify(daily));

            this.setState({
                listItems: daily,
                dailySize: daily.length
            })
        }
    }

    showAddModal() {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if(tempDaily){
            daily = JSON.parse(tempDaily);
        }
        if(daily.length < this.state.dailyMaxSize) {
            $("#dailyInput").val("");
            this.setState({
                displayAddModal: true,
                selectedTimeStamp: 0
            })
        }
        else {
            message.error("倒数日数量最多为" + this.state.dailyMaxSize + "个");
        }
    }

    handleAddModalOk() {
        let title = $("#dailyInput").val();

        if(title && title.length > 0 && this.state.selectedTimeStamp !== 0) {
            let daily = [];
            let tempDaily = localStorage.getItem("daily");
            if(tempDaily){
                daily = JSON.parse(tempDaily);
            }
            if(daily.length < this.state.dailyMaxSize) {
                let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();
                let description, status;
                if (todayTimeStamp - this.state.selectedTimeStamp > 0) {
                    description = "已过 " + ((todayTimeStamp - this.state.selectedTimeStamp) / 86400000) + " 天";
                    status = "expired";
                }
                else {
                    description = "还剩 " + ((this.state.selectedTimeStamp - todayTimeStamp) / 86400000) + " 天";
                    status = "not expired";
                }

                daily.push({"title": title, "description": description, "status": status, "timeStamp": Date.now()});
                localStorage.setItem("daily", JSON.stringify(daily));

                this.setState({
                    displayAddModal: false,
                    listItems: daily,
                    dailySize: daily.length
                });
                message.success("添加成功");
            }
            else {
                message.error("倒数日数量最多为" + this.state.dailyMaxSize + "个");
            }
        }
        else {
            message.error("倒数日内容不能为空");
        }
    }

    handleAddModalCancel() {
        this.setState({
            displayAddModal: false
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
        if(tempDaily){
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
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, ()=>{
                changeThemeColor("#dailyBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }
    }

    render() {
        const popoverTitle = (
            <Row>
                <Col span={12} style={{display: "flex", alignItems: "center"}}>
                    <Text style={{color: this.state.fontColor}}>{"倒数日 " + this.state.dailySize + " / " + this.state.dailyMaxSize}</Text>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Button type="text" shape="circle" icon={<PlusOutlined />}
                            style={{color: this.state.fontColor}} onClick={this.showAddModal.bind(this)} />
                    <Button type="text" shape="circle" icon={<DeleteOutlined />}
                            style={{color: this.state.fontColor}} onClick={this.removeAllDaily.bind(this)} />
                </Col>
            </Row>
        );

        const popoverContent = (
            <List
                dataSource={this.state.listItems}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            <Button type="text" shape="circle" icon={<CloseOutlined />} onClick={this.removeDaily.bind(this, item)} style={{color: this.state.fontColor}}/>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                            // description={<Text style={{color: (item.status === "expired"? "red":"blue")}}>{item.description}</Text>}
                        />
                    </List.Item>
                )}
            />
        );

        return (
            <Row>
                <Popover title={popoverTitle} content={popoverContent} color={this.state.backgroundColor} trigger={"click"} overlayStyle={{width: "300px"}}>
                    <Badge size="small" count={this.state.listItems.length}>
                        <Button shape="circle" icon={<CalendarOutlined />} size={"large"}
                                id={"dailyBtn"}
                                className={"componentTheme zIndexHigh"}
                        />
                    </Badge>
                </Popover>
                <Modal title="添加倒数日" open={this.state.displayAddModal} onOk={this.handleAddModalOk.bind(this)} onCancel={this.handleAddModalCancel.bind(this)}
                       maskStyle={{backgroundColor: this.state.backgroundColor, opacity: 0.45}}
                >
                    <Form>
                        <Form.Item label="标题" name="dailyInput" rules={[{ required: true, message: "标题不能为空"}]}>
                            <Input placeholder="请输入标题" id="dailyInput"/>
                        </Form.Item>
                        <Form.Item label="日期" name="dailyDatePicker" rules={[{ required: true, message: "日期不能为空"}]}>
                            <DatePicker onChange={this.datePickerOnChange} id={"dailyDatePicker"}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>
        );
    }
}

export default DailyComponent;