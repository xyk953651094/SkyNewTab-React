import React from "react";
import {Popover, Space, Col, Badge, Typography, Button, Checkbox, message, Row, Form, Input, Modal} from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import {CheckSquareOutlined, PlusOutlined} from "@ant-design/icons";
import {changeThemeColor, isEmptyString} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

const { Text, Link } = Typography;
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    displayAddModal: boolean,
    checkboxOptions: any
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
            displayAddModal: false,
            checkboxOptions: []
        };
    }

    showAddModal() {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if(tempTodos){
            todos = JSON.parse(tempTodos);
        }
        if(todos.length < 5) {
            $("#todoInput").val("");
            this.setState({
                displayAddModal: true
            })
        }
        else {
            message.error("待办数量最多为5个");
        }
    }

    handleAddModalOk() {
        let todoContent = $("#todoInput").val();
        if(todoContent && todoContent.length > 0) {
            let todos = [];
            let tempTodos = localStorage.getItem("todos");
            if(tempTodos){
                todos = JSON.parse(tempTodos);
            }
            todos.push({"label": todoContent, "value": todoContent});
            localStorage.setItem("todos", JSON.stringify(todos));

            this.setState({
                displayAddModal: false,
                checkboxOptions: todos
            });
            message.success("添加成功");
        }
        else {
            message.error("待办内容不能为空");
        }
    }

    handleAddModalCancel() {
        this.setState({
            displayAddModal: false
        })
    }

    CheckboxOnChange(checkedValues: CheckboxValueType[]) {
        // console.log('checked = ', checkedValues);

        let checkboxOptions = [];
        let tempCheckboxOptions = localStorage.getItem("todos");
        if(tempCheckboxOptions){
            checkboxOptions = JSON.parse(tempCheckboxOptions);
            let index = 0;
            for(let i = 0; i < checkboxOptions.length; i++) {
                if (checkedValues[0] === checkboxOptions[i].label) {
                    index = i;
                    break;
                }
            }
            checkboxOptions.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(checkboxOptions));

            this.setState({
                checkboxOptions: checkboxOptions
            })
        }
    }

    componentDidMount() {
        let checkboxOptions = [];
        let tempCheckboxOptions = localStorage.getItem("todos");
        if(tempCheckboxOptions){
            checkboxOptions = JSON.parse(tempCheckboxOptions);
        }

        this.setState({
            checkboxOptions: checkboxOptions
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
                    <Text style={{color: this.state.fontColor}}>待办事项</Text>
                </Col>
                <Col span={12} style={{textAlign: "right"}}>
                    <Button type="text" shape="circle" icon={<PlusOutlined />}
                            style={{color: this.state.fontColor, float: "right"}} onClick={this.showAddModal.bind(this)} />
                    <Modal title="添加待办事项" open={this.state.displayAddModal} onOk={this.handleAddModalOk.bind(this)} onCancel={this.handleAddModalCancel.bind(this)}>
                        <Form>
                            <Form.Item label="待办内容" name="todoInput" rules={[{ required: true, message: "待办内容不能为空"}]}>
                                <Input placeholder="请输入待办内容" id="todoInput"/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
            </Row>
        );

        const popoverContent = (
            <Checkbox.Group
                options={this.state.checkboxOptions}
                onChange={this.CheckboxOnChange.bind(this)}
            />
        );

        return (
            <Popover title={popoverTitle} content={popoverContent} color={this.state.backgroundColor}>
                <Badge size="small" count={this.state.checkboxOptions.length}>
                    <Button shape="circle" icon={<CheckSquareOutlined />} size={"large"}
                            // onClick={this.handleClick.bind(this)}
                            id={"todoBtn"}
                            className={"componentTheme zIndexHigh"}
                    />
                </Badge>
            </Popover>
        );
    }
}

export default TodoComponent;