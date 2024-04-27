import React from "react";
import {
    Button,
    Col,
    Form,
    Input,
    List,
    message,
    Modal,
    Popover,
    Rate,
    Row,
    Select,
    Space,
    Switch,
    Typography,
    TimePicker, TimePickerProps
} from "antd";
import {CheckOutlined, CheckSquareOutlined, PlusOutlined, TagOutlined, ClockCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, changeThemeColor, isEmpty} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import $ from "jquery";
import dayjs from "dayjs";

const {Text} = Typography;
const todoMaxSize = 10;

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
    todoList: any,
    selectedTodoTime: string,
    tag: string,
    priority: string,
}

interface TodoComponent {
    state: stateType,
    props: propType
}

class TodoComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            display: "block",
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            buttonShape: "round",
            notification: false,
            displayModal: false,
            inputValue: "",
            todoList: [],
            selectedTodoTime: "",
            tag: "工作",
            priority: "★",
        };
    }

    finishAllBtnOnClick() {
        this.setState({
            todoList: [],
        }, () => {
            localStorage.removeItem("todos");
            message.success("全部完成");
        })
    }

    finishBtnOnClick(item: any) {
        let tempTodoList = this.state.todoList;
        let index = -1;
        for (let i = 0; i < tempTodoList.length; i++) {
            if (item.timeStamp === tempTodoList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempTodoList.splice(index, 1);
        }

        tempTodoList.sort((a: any, b: any) => {
            return b.priority.length - a.priority.length;
        });

        this.setState({
            todoList: tempTodoList,
        }, () => {
            localStorage.setItem("todos", JSON.stringify(this.state.todoList));
            message.success("已完成");
        })
    }

    notificationSwitchOnChange(checked: boolean) {
        this.setState({
            notification: checked,
        }, () => {
            localStorage.setItem("todoNotification", JSON.stringify(checked));
            if (this.state.todoList.length === 0) {
                message.warning("请添加待办事项");
            }
        })
    }

    showAddModalBtnOnClick() {
        if (this.state.todoList.length < todoMaxSize) {
            this.setState({
                displayModal: true,
                inputValue: "",
                tag: "工作",
                priority: "★",
            })
        } else {
            message.error("待办数量最多为" + todoMaxSize + "个");
        }
    }

    inputOnChange(e: any) {
        this.setState({
            inputValue: e.target.value
        })
    }

    modalOkBtnOnClick() {
        if (this.state.inputValue && this.state.inputValue.length > 0) {
            let tempTodoList = this.state.todoList;
            tempTodoList.push({
                "title": this.state.inputValue,
                "tag": this.state.tag,
                "time": this.state.selectedTodoTime,
                "priority": this.state.priority,
                "timeStamp": Date.now()
            });

            tempTodoList.sort((a: any, b: any) => {
                return b.priority.length - a.priority.length;
            });

            this.setState({
                displayModal: false,
                todoList: tempTodoList,
            }, () => {
                localStorage.setItem("todos", JSON.stringify(this.state.todoList));
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

    selectOnChange(value: string) {
        let tempTag;
        switch (value) {
            case "work":
                tempTag = "工作";
                break;
            case "study":
                tempTag = "学习";
                break;
            case "life":
                tempTag = "生活";
                break;
            case "rest":
                tempTag = "休闲";
                break;
            case "other":
                tempTag = "其它";
                break;
            default:
                tempTag = "工作";
                break;
        }
        this.setState({
            tag: tempTag
        })
    }

    timePickerOnChange: TimePickerProps['onChange'] = (time, timeString) => {
        if (timeString && typeof timeString === "string") {
            this.setState({
                selectedTodoTime: timeString,
            })
        } else {
            this.setState({
                selectedTodoTime: "",
            })
        }
    }

    rateOnChange(value: number) {
        this.setState({
            priority: "★".repeat(value)
        })
    }

    componentDidMount() {
        let tempNotification = false;
        let notificationStorage = localStorage.getItem("todoNotification");
        if (notificationStorage) {
            tempNotification = JSON.parse(notificationStorage);
        } else {
            localStorage.setItem("todoNotification", JSON.stringify(false));
        }

        let tempTodoList = [];
        let todoListStorage = localStorage.getItem("todos");
        if (todoListStorage) {
            tempTodoList = JSON.parse(todoListStorage);

            if (tempNotification && tempTodoList.length > 0) {
                message.warning("剩余 " + tempTodoList.length + " 个待办事项未处理");
            }
        }

        this.setState({
            todoList: tempTodoList,
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
                changeThemeColor("#todoBtn", this.state.backgroundColor, this.state.fontColor);
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
                        {"待办事项 " + this.state.todoList.length + " / " + todoMaxSize}
                    </Text>
                </Col>
                <Col span={16} style={{textAlign: "right"}}>
                    <Space>
                        <Switch checkedChildren="已提醒" unCheckedChildren="不提醒" id={"todoNotificationSwitch"}
                                checked={this.state.notification} onChange={this.notificationSwitchOnChange.bind(this)}/>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                style={{color: this.state.fontColor}} onClick={this.showAddModalBtnOnClick.bind(this)}>
                            {"添加待办事项"}
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CheckOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                style={{color: this.state.fontColor}} onClick={this.finishAllBtnOnClick.bind(this)}>
                            {"全部完成"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List
                dataSource={this.state.todoList}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            <Button type={"text"} shape={this.state.buttonShape} icon={<CheckOutlined/>}
                                    onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                    onClick={this.finishBtnOnClick.bind(this, item)}
                                    style={{color: this.state.fontColor}}/>
                        ]}
                    >
                        <Row style={{width: "100%"}}>
                            <Col span={9}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<CheckSquareOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                    {item.title}
                                </Button>
                            </Col>
                            <Col span={5}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<ClockCircleOutlined />}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                    {isEmpty(item.time) ? "未设置" : item.time}
                                </Button>
                            </Col>
                            <Col span={10}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<TagOutlined/>}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                    {item.tag + " ｜ " + item.priority}
                                </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        );

        return (
            <Row>
                <Popover title={popoverTitle} content={popoverContent} placement="bottomRight"
                         color={this.state.backgroundColor}
                         overlayStyle={{width: "600px"}}>
                    <Button shape={this.props.preferenceData.buttonShape} icon={<CheckSquareOutlined/>} size={"large"}
                            id={"todoBtn"}
                            className={"componentTheme zIndexHigh"}
                            style={{cursor: "default", display: this.state.display}}
                    >
                        {this.state.todoList.length + " 个"}
                    </Button>
                </Popover>
                <Modal title={
                    <Text style={{color: this.state.fontColor}}>
                        {"添加待办事项 " + this.state.todoList.length + " / " + todoMaxSize}
                    </Text>
                }
                       closeIcon={false} centered
                       open={this.state.displayModal} onOk={this.modalOkBtnOnClick.bind(this)}
                       onCancel={this.modalCancelBtnOnClick.bind(this)}
                       destroyOnClose={true}
                       styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
                >
                    <Form>
                        <Form.Item label={"待办事项"} name={"todoInput"}>
                            <Input placeholder="请输入待办内容" value={this.state.inputValue} onChange={this.inputOnChange.bind(this)}
                                   maxLength={10} showCount allowClear/>
                        </Form.Item>
                        <Form.Item label={"标签分类"} name={"todoSelect"} initialValue={"work"}>
                            <Select
                                onChange={this.selectOnChange.bind(this)}
                                options={[
                                    {value: 'work', label: '工作'},
                                    {value: 'study', label: '学习'},
                                    {value: 'life', label: '生活'},
                                    {value: 'rest', label: '休闲'},
                                    {value: 'other', label: '其它'},
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label={"截止时间"} name={"todoTime"}>
                            <TimePicker format={"HH:mm"} minuteStep={5}
                                        defaultOpenValue={dayjs("09:00", "HH:mm")}
                                        onChange={this.timePickerOnChange}
                                        placeholder={"可选，注意插件并不会通知截止时间"} style={{width: "100%"}}/>
                        </Form.Item>
                        <Form.Item label={"优先级别"} name={"todoRate"} initialValue={1}>
                            <Rate onChange={this.rateOnChange.bind(this)} style={{
                                color: this.state.hoverColor,
                                stroke: this.state.fontColor,
                                strokeWidth: "25px"
                            }}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>
        );
    }
}

export default TodoComponent;