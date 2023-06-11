import React from "react";
import {Col, Space, Button, Modal, Form, Input, List, message} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {changeThemeColor} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    displayAddModal: boolean,
    displayEditModal: boolean,
    listData: any,
    collectionMaxSize: number
}

interface CollectionComponent {
    state: stateType,
    props: propType
}

class CollectionComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            fontColor: "",
            displayAddModal: false,
            displayEditModal: false,
            listData: [],
            collectionMaxSize: 5
        };
    }

    // 添加导航弹窗
    showAddModal() {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if(tempCollections){
            collections = JSON.parse(tempCollections);
        }
        if(collections.length < this.state.collectionMaxSize) {
            $("#webNameInput").val("");
            $("#webUrlInput").val("");
            this.setState({
                displayAddModal: true
            })
        }
        else {
            message.error("链接数量最多为5个");
        }
    }

    handleAddModalOk() {
        let webName = $("#webNameInput").val();
        let webUrl = $("#webUrlInput").val();
        if(webName && webUrl && webName.length > 0 && webUrl.length > 0) {
            let collections = [];
            let tempCollections = localStorage.getItem("collections");
            if(tempCollections){
                collections = JSON.parse(tempCollections);
            }
            if(collections.length < this.state.collectionMaxSize) {
                collections.push({"webName": webName, "webUrl": webUrl, "timeStamp": Date.now ()});
                localStorage.setItem("collections", JSON.stringify(collections));

                this.setState({
                    displayAddModal: false
                });
                message.success("添加成功");
            }
            else {
                message.error("链接数量最多为5个");
            }
        }
        else {
            message.error("网页名称或网页地址不能为空");
        }
    }

    handleAddModalCancel() {
        this.setState({
            displayAddModal: false
        })
    }

    // 编辑导航弹窗
    showEditModal() {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if(tempCollections){
            collections = JSON.parse(tempCollections);
        }
        this.setState({
            displayEditModal: true,
            listData: collections
        })
    }

    handleEditModalOk() {
        this.setState({
            displayEditModal: false
        })
    }

    handleEditModalCancel() {
        this.setState({
            displayEditModal: false
        })
    }

    handleRemoveCollection(item: any) {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if(tempCollections){
            collections = JSON.parse(tempCollections);
            let index = -1;
            for(let i = 0; i < collections.length; i++) {
                if (item.timeStamp === collections[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if(index !== -1) {
                collections.splice(index, 1);
            }
            localStorage.setItem("collections", JSON.stringify(collections));

            this.setState({
                listData: collections
            })
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            });
        }
    }

    render() {
        // TODO：根据 localstorage 动态加载按钮

        return (
            <Col span={24} className={"center zIndexHigh"}>
                <Space>
                    <Button type="primary" shape="round" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}>百度</Button>
                    <Button type="primary" shape="round" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}>京东</Button>
                    <Button type="primary" shape="round" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}>淘宝</Button>
                    <Button type="primary" shape="round" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}>支付宝</Button>
                    <Button type="primary" shape="round" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}>谷歌</Button>
                    <Button type="primary" shape="circle" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                            icon={<PlusOutlined />} onClick={this.showAddModal.bind(this)}/>
                    <Button type="primary" shape="circle" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                            icon={<EditOutlined />} onClick={this.showEditModal.bind(this)}/>
                    <Modal title="添加链接" open={this.state.displayAddModal} onOk={this.handleAddModalOk.bind(this)} onCancel={this.handleAddModalCancel.bind(this)}>
                        <Form>
                            <Form.Item label="网页名称" name="webName" rules={[{ required: true, message: "网页名称不能为空"}]}>
                                <Input placeholder="请输入网页名称" id="webNameInput"/>
                            </Form.Item>
                            <Form.Item label="网页地址" name="webNameUrl" rules={[{ required: true, message: "网页地址不能为空"}]}>
                                <Input placeholder="请输入网页地址" id="webUrlInput"/>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal title="编辑链接" open={this.state.displayEditModal} onOk={this.handleEditModalOk.bind(this)} onCancel={this.handleEditModalCancel.bind(this)}>
                        <List
                            itemLayout="horizontal"
                            size="small"
                            dataSource={this.state.listData}
                            renderItem={(item: any) => (
                                <List.Item actions={[<Button type="text" danger icon={<DeleteOutlined />} onClick={this.handleRemoveCollection.bind(this, item)}>删除</Button>]}>
                                    <List.Item.Meta title={item.webName} description={item.webUrl}/>
                                </List.Item>
                            )}
                        />
                    </Modal>
                </Space>
            </Col>
        );
    }
}

export default CollectionComponent;