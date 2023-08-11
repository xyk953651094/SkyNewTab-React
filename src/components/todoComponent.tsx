import React from "react";
import {Badge, Button, Col, Form, Input, List, message, Modal, Popover, Rate, Row, Space, Typography} from "antd";
import {CheckOutlined, CheckSquareOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {changeThemeColor, getFontColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";

const {Text} = Typography;
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    display: "block" | "none",
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    displayModal: boolean,
    checkboxOptions: any,
    todoSize: number,
    todoMaxSize: number,
    priority: number
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
            displayModal: false,
            checkboxOptions: [],
            todoSize: 0,
            todoMaxSize: 5,
            priority: 1
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
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            localStorage.removeItem("todos");
            this.setState({
                checkboxOptions: [],
                todoSize: 0
            })
        }
    }

    showAddModalBtnOnClick() {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
        }
        if (todos.length < this.state.todoMaxSize) {
            // $("#todoInput").val("");
            this.setState({
                displayModal: true,
                priority: 1,
            })
        } else {
            message.error("待办数量最多为" + this.state.todoMaxSize + "个");
        }
    }

    modalOkBtnOnClick() {
        let todoContent = $("#todoInput").val();
        if (todoContent && todoContent.length > 0) {
            let todos = [];
            let tempTodos = localStorage.getItem("todos");
            if (tempTodos) {
                todos = JSON.parse(tempTodos);
            }
            if (todos.length < this.state.todoMaxSize) {
                todos.push({
                    "title": todoContent,
                    "priority": "★".repeat(this.state.priority),
                    "timeStamp": Date.now()
                });
                localStorage.setItem("todos", JSON.stringify(todos));

                this.setState({
                    displayModal: false,
                    checkboxOptions: todos,
                    todoSize: todos.length
                });
                message.success("添加成功");
            } else {
                message.error("待办数量最多为" + this.state.todoMaxSize + "个");
            }
        } else {
            message.error("待办内容不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.setState({
            displayModal: false
        })
    }

    finishBtnOnClick(item: any) {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
            let index = -1;
            for (let i = 0; i < todos.length; i++) {
                if (item.timeStamp === todos[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                todos.splice(index, 1);
            }
            localStorage.setItem("todos", JSON.stringify(todos));

            this.setState({
                checkboxOptions: todos,
                todoSize: todos.length
            })
        }
    }

    rateOnChange(value: number) {
        this.setState({
            priority: value
        })
    }

    componentDidMount() {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
        }

        this.setState({
            checkboxOptions: todos,
            todoSize: todos.length
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
                display: nextProps.preferenceData.simpleMode ? "none" : "block"
            })
        }
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={10}>
                    <Text
                        style={{color: this.state.fontColor}}>{"待办事项 " + this.state.todoSize + " / " + this.state.todoMaxSize}</Text>
                </Col>
                <Col span={14} style={{textAlign: "right"}}>
                    <Space>
                        <Button type={"text"} shape={"round"} icon={<PlusOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.state.fontColor}} onClick={this.showAddModalBtnOnClick.bind(this)}>
                            {"添加待办事项"}
                        </Button>
                        <Button type={"text"} shape={"round"} icon={<DeleteOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                style={{color: this.state.fontColor}} onClick={this.removeAllBtnOnClick.bind(this)}>
                            {"全部删除"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List
                dataSource={this.state.checkboxOptions}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            <Button type={"text"} shape={"circle"} icon={<CheckOutlined/>}
                                    onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                                    onClick={this.finishBtnOnClick.bind(this, item)}
                                    style={{color: this.state.fontColor}}/>
                        ]}
                    >
                        <Row style={{width: "100%"}}>
                            <Col span={10}>
                                <Button type={"text"} shape={"round"} onMouseOver={this.btnMouseOver.bind(this)}
                                        onMouseOut={this.btnMouseOut.bind(this)}
                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                    {item.title}
                                </Button>
                            </Col>
                            <Col span={14}>
                                <Button type={"text"} shape={"round"} onMouseOver={this.btnMouseOver.bind(this)}
                                        onMouseOut={this.btnMouseOut.bind(this)}
                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                    {"优先级：" + item.priority}
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
                    <Badge size={"small"} count={this.state.checkboxOptions.length} style={{display: this.state.display}}>
                        <Button shape={"circle"} icon={<CheckSquareOutlined/>} size={"large"}
                                id={"todoBtn"}
                                className={"componentTheme zIndexHigh"} style={{cursor: "default", display: this.state.display}}
                        />
                    </Badge>
                </Popover>
                <Modal title={"添加待办事项 " + this.state.todoSize + " / " + this.state.todoMaxSize} closeIcon={false}
                       centered
                       open={this.state.displayModal} onOk={this.modalOkBtnOnClick.bind(this)}
                       onCancel={this.modalCancelBtnOnClick.bind(this)}
                       destroyOnClose={true}
                       maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                >
                    <Form>
                        <Form.Item label={"待办事项"} name={"todoInput"}>
                            <Input placeholder="请输入待办内容" id="todoInput" maxLength={10} allowClear showCount/>
                        </Form.Item>
                        <Form.Item label={"优先级别"} name={"todoRate"}>
                            <Rate defaultValue={1} onChange={this.rateOnChange.bind(this)} style={{
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