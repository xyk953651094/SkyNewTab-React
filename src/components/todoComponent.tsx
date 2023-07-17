import React from "react";
import {Popover, Col, Badge, Typography, Button, Checkbox, message, Row, Form, Input, Rate, Modal} from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import {CheckSquareOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {changeThemeColor} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

const {Text} = Typography;
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
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
            backgroundColor: "",
            fontColor: "",
            displayModal: false,
            checkboxOptions: [],
            todoSize: 0,
            todoMaxSize: 5,
            priority: 0
        };
    }

    removeAllBtnOnClick() {
        let tempTodos = localStorage.getItem("todos");
        if(tempTodos){
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
        if(tempTodos){
            todos = JSON.parse(tempTodos);
        }
        if(todos.length < this.state.todoMaxSize) {
            // $("#todoInput").val("");
            this.setState({
                displayModal: true,
                priority: 0,
            })
        }
        else {
            message.error("待办数量最多为" + this.state.todoMaxSize + "个");
        }
    }

    modalOkBtnOnClick() {
        let todoContent = $("#todoInput").val();
        if(todoContent && todoContent.length > 0) {
            let todos = [];
            let tempTodos = localStorage.getItem("todos");
            if(tempTodos){
                todos = JSON.parse(tempTodos);
            }
            if(todos.length < this.state.todoMaxSize) {
                todoContent = todoContent + " ";
                todos.push({"label": todoContent + "★".repeat(this.state.priority), "value": todoContent + "★".repeat(this.state.priority)});
                localStorage.setItem("todos", JSON.stringify(todos));

                this.setState({
                    displayModal: false,
                    checkboxOptions: todos,
                    todoSize: todos.length
                });
                message.success("添加成功");
            }
            else {
                message.error("待办数量最多为" + this.state.todoMaxSize + "个");
            }
        }
        else {
            message.error("待办内容不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.setState({
            displayModal: false
        })
    }

    checkboxOnChange(checkedValues: CheckboxValueType[]) {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if(tempTodos){
            todos = JSON.parse(tempTodos);
            let index = -1;
            for(let i = 0; i < todos.length; i++) {
                if (checkedValues[0] === todos[i].label) {
                    index = i;
                    break;
                }
            }
            if(index !== -1) {
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
        if(tempTodos){
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
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, ()=>{
                changeThemeColor("#todoBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }
    }

    render() {
        const popoverTitle = (
            <Row>
                <Col span={12} style={{display: "flex", alignItems: "center"}}>
                    <Text style={{color: this.state.fontColor}}>{"待办 " + this.state.todoSize + " / " + this.state.todoMaxSize}</Text>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Button type="text" shape="circle" icon={<PlusOutlined />}
                            style={{color: this.state.fontColor}} onClick={this.showAddModalBtnOnClick.bind(this)} />
                    <Button type="text" shape="circle" icon={<DeleteOutlined />}
                            style={{color: this.state.fontColor}} onClick={this.removeAllBtnOnClick.bind(this)} />
                </Col>
            </Row>
        );

        const popoverContent = (
            <Checkbox.Group
                options={this.state.checkboxOptions}
                onChange={this.checkboxOnChange.bind(this)}
            />
        );

        return (
            <Row>
                <Popover title={popoverTitle} content={popoverContent} color={this.state.backgroundColor} overlayStyle={{width: "300px"}}>
                    <Badge size="small" count={this.state.checkboxOptions.length}>
                        <Button shape="circle" icon={<CheckSquareOutlined />} size={"large"}
                                id={"todoBtn"}
                                className={"componentTheme zIndexHigh"}
                        />
                    </Badge>
                </Popover>
                <Modal title={"添加待办事项 " + this.state.todoSize + " / " + this.state.todoMaxSize} open={this.state.displayModal} onOk={this.modalOkBtnOnClick.bind(this)} onCancel={this.modalCancelBtnOnClick.bind(this)}
                       destroyOnClose={true}
                       maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                >
                    <Form>
                        <Form.Item label="待办内容" name="todoInput" rules={[{ required: true, message: "待办内容不能为空"}]}>
                            <Input placeholder="请输入待办内容" id="todoInput" maxLength={10} allowClear showCount/>
                        </Form.Item>
                        <Form.Item label="优先级别" name="todoRate" rules={[{ required: true, message: "优先级别不能为空"}]}>
                            <Rate onChange={this.rateOnChange.bind(this)} style={{color: this.state.fontColor, stroke: this.state.fontColor, strokeWidth: "25px"}}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>
        );
    }
}

export default TodoComponent;