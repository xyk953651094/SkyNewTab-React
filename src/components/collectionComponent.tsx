import React from "react";
import {Col, Space, Button, Modal, Form, Input, List, message} from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {ThemeColorInterface} from "../typescripts/publicInterface";

const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    collections: any,
    displayAddModal: boolean,
    displayEditModal: boolean,
    collectionData: any,
    collectionSize: number,
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
            collections: [],
            displayAddModal: false,
            displayEditModal: false,
            collectionData: [],
            collectionSize: 0,
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
            message.error("链接数量最多为" + this.state.collectionMaxSize + "个");
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
                    displayAddModal: false,
                    collectionData: collections,
                    collectionSize: collections.length
                });
                message.success("添加成功");

                // this.forceUpdate(); // 强制更新组件
            }
            else {
                message.error("链接数量最多为" + this.state.collectionMaxSize + "个");
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
            collectionData: collections
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
                collectionData: collections,
                collectionSize: collections.length
            })

            // this.forceUpdate(); // 强制更新组件
        }
    }

    componentDidMount() {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if(tempCollections){
            collections = JSON.parse(tempCollections);

            this.setState({
                collectionData: collections,
                collectionSize: collections.length
            })
        }
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
        return (
            <Col span={24} className={"center zIndexHigh"}>
                <Space id="buttonGroup">
                    {
                        this.state.collectionData.map((item: any) => {
                            return (
                                <Button type="primary" shape="round" className="componentTheme" key={item.timeStamp}
                                        onClick={() => {window.open(item.webUrl)}}
                                        style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}>
                                    {item.webName}
                                </Button>
                            )
                        })
                    }

                    <Button type="primary" shape="circle" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                            icon={<PlusOutlined />} onClick={this.showAddModal.bind(this)}/>
                    <Button type="primary" shape="circle" className="componentTheme" style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                            icon={<EditOutlined />} onClick={this.showEditModal.bind(this)}/>
                    <Modal title={"添加链接 " + this.state.collectionSize + " / " + this.state.collectionMaxSize}
                           open={this.state.displayAddModal} onOk={this.handleAddModalOk.bind(this)} onCancel={this.handleAddModalCancel.bind(this)}
                           maskStyle={{backgroundColor: this.state.backgroundColor, opacity: 0.45}}
                    >
                        <Form>
                            <Form.Item label="网页名称" name="webName" rules={[{ required: true, message: "网页名称不能为空"}]}>
                                <Input placeholder="请输入网页名称" id="webNameInput"/>
                            </Form.Item>
                            <Form.Item label="网页地址" name="webNameUrl" rules={[{ required: true, message: "网页地址不能为空"}]}>
                                <Input placeholder="请输入网页地址" id="webUrlInput"/>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal title={"编辑链接 " + this.state.collectionSize + " / " + this.state.collectionMaxSize}
                           open={this.state.displayEditModal} onOk={this.handleEditModalOk.bind(this)} onCancel={this.handleEditModalCancel.bind(this)}
                           maskStyle={{backgroundColor: this.state.backgroundColor, opacity: 0.45}}
                    >
                        <List
                            itemLayout="horizontal"
                            size="small"
                            dataSource={this.state.collectionData}
                            renderItem={(item: any) => (
                                <List.Item actions={[
                                    <Button type="text" icon={<DeleteOutlined />} onClick={this.handleRemoveCollection.bind(this, item)} style={{color: this.state.fontColor}}>
                                        删除
                                    </Button>
                                ]}>
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