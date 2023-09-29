import React from "react";
import {Button, Col, Form, Input, List, message, Modal, Row, Space, Tooltip, Typography} from "antd";
import {DeleteOutlined, EditOutlined, LinkOutlined, PlusOutlined, PushpinOutlined} from "@ant-design/icons";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import {getFontColor} from "../typescripts/publicFunctions";

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
    buttonShape: "circle" | "default" | "round" | undefined,
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
            display: "block",
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            buttonShape: "circle",
            collections: [],
            displayAddModal: false,
            displayEditModal: false,
            collectionData: [],
            collectionSize: 0,
            collectionMaxSize: 5
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

    // 添加导航弹窗
    showAddModalBtnOnClick() {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if (tempCollections) {
            collections = JSON.parse(tempCollections);
        }
        if (collections.length < this.state.collectionMaxSize) {
            this.setState({
                displayAddModal: true
            })
        } else {
            message.error("链接数量最多为" + this.state.collectionMaxSize + "个");
        }
    }

    addModalOkBtnOnClick() {
        let webName = $("#webNameInput").val();
        let webUrl = $("#webUrlInput").val();
        if (webName && webUrl && webName.length > 0 && webUrl.length > 0) {
            let collections = [];
            let tempCollections = localStorage.getItem("collections");
            if (tempCollections) {
                collections = JSON.parse(tempCollections);
            }
            if (collections.length < this.state.collectionMaxSize) {
                collections.push({"webName": webName, "webUrl": webUrl, "timeStamp": Date.now()});
                localStorage.setItem("collections", JSON.stringify(collections));

                this.setState({
                    displayAddModal: false,
                    collectionData: collections,
                    collectionSize: collections.length
                });
                message.success("添加成功");
            } else {
                message.error("链接数量最多为" + this.state.collectionMaxSize + "个");
            }
        } else {
            message.error("网页名称或网页地址不能为空");
        }
    }

    addModalCancelBtnOnClick() {
        this.setState({
            displayAddModal: false
        })
    }

    // 编辑导航弹窗
    showEditModalBtnOnClick() {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if (tempCollections) {
            collections = JSON.parse(tempCollections);
        }
        this.setState({
            displayEditModal: true,
            collectionData: collections
        })
    }

    editModalOkBtnOnClick() {
        this.setState({
            displayEditModal: false
        })
    }

    editModalCancelBtnOnClick() {
        this.setState({
            displayEditModal: false
        })
    }

    removeBtnOnClick(item: any) {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if (tempCollections) {
            collections = JSON.parse(tempCollections);
            let index = -1;
            for (let i = 0; i < collections.length; i++) {
                if (item.timeStamp === collections[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                collections.splice(index, 1);
            }
            localStorage.setItem("collections", JSON.stringify(collections));

            this.setState({
                collectionData: collections,
                collectionSize: collections.length
            })
        }
    }

    removeAllBtnOnClick() {
        let tempCollections = localStorage.getItem("collections");
        if (tempCollections) {
            localStorage.removeItem("collections");

            this.setState({
                collectionData: [],
                collectionSize: 0,
            }, () => {
                message.success("删除成功");
            })
        }
    }

    componentDidMount() {
        let collections = [];
        let tempCollections = localStorage.getItem("collections");
        if (tempCollections) {
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
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
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
        return (
            <Row style={{display: this.state.display}}>
                <Col span={24} className={"alignCenter zIndexHigh"}>
                    <Space>
                        {
                            this.state.collectionData.map((item: any) => {
                                return (
                                    <Tooltip title={item.webUrl} key={item.timeStamp} placement={"bottom"}
                                             color={this.state.backgroundColor}>
                                        <Button type={"primary"} shape={this.props.preferenceData.buttonShape} className={"componentTheme"}
                                                key={item.timeStamp}
                                                onClick={() => {
                                                    window.open(item.webUrl)
                                                }}
                                                style={{
                                                    color: this.state.fontColor,
                                                    backgroundColor: this.state.backgroundColor
                                                }}>
                                            {item.webName}
                                        </Button>
                                    </Tooltip>
                                )
                            })
                        }
                        <Tooltip title={"添加链接"} placement={"bottom"} color={this.state.backgroundColor}>
                            <Button type={"primary"} shape={this.state.buttonShape} className={"componentTheme"}
                                    style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                                    icon={<PlusOutlined/>} onClick={this.showAddModalBtnOnClick.bind(this)}/>
                        </Tooltip>
                        <Tooltip title={"编辑链接"} placement={"bottom"} color={this.state.backgroundColor}>
                            <Button type={"primary"} shape={this.state.buttonShape} className={"componentTheme"}
                                    style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                                    icon={<EditOutlined/>} onClick={this.showEditModalBtnOnClick.bind(this)}/>
                        </Tooltip>
                        <Tooltip title={"全部删除"} placement={"bottom"} color={this.state.backgroundColor}>
                            <Button type={"primary"} shape={this.state.buttonShape} className={"componentTheme"}
                                    style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                                    icon={<DeleteOutlined/>} onClick={this.removeAllBtnOnClick.bind(this)}/>
                        </Tooltip>
                        <Modal title={"添加链接 " + this.state.collectionSize + " / " + this.state.collectionMaxSize}
                               closeIcon={false} centered
                               open={this.state.displayAddModal} onOk={this.addModalOkBtnOnClick.bind(this)}
                               onCancel={this.addModalCancelBtnOnClick.bind(this)}
                               destroyOnClose={true}
                               maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                        >
                            <Form>
                                <Form.Item label={"网页名称"} name={"webName"}>
                                    <Input placeholder={"请输入网页名称"} id={"webNameInput"} maxLength={5} allowClear
                                           showCount/>
                                </Form.Item>
                                <Form.Item label={"网页地址"} name={"webNameUrl"}>
                                    <Input placeholder={"请输入网页地址"} id={"webUrlInput"} allowClear/>
                                </Form.Item>
                            </Form>
                        </Modal>
                        <Modal title={
                            <Row align={"middle"}>
                                <Col span={12}>
                                    <Text style={{color: this.state.fontColor}}>
                                        {"编辑链接 " + this.state.collectionSize + " / " + this.state.collectionMaxSize}
                                    </Text>
                                </Col>
                                <Col span={12} style={{textAlign: "right"}}>
                                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<DeleteOutlined/>}
                                            onMouseOver={this.btnMouseOver.bind(this)}
                                            onMouseOut={this.btnMouseOut.bind(this)}
                                            onClick={this.removeAllBtnOnClick.bind(this)}
                                            style={{color: this.state.fontColor}}>
                                        全部删除
                                    </Button>
                                </Col>
                            </Row>
                        }
                               closeIcon={false} centered
                               open={this.state.displayEditModal} onOk={this.editModalOkBtnOnClick.bind(this)}
                               onCancel={this.editModalCancelBtnOnClick.bind(this)}
                               maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                        >
                            <List
                                dataSource={this.state.collectionData}
                                renderItem={(item: any) => (
                                    <List.Item actions={[
                                        <Button type={"text"} shape={this.state.buttonShape} icon={<DeleteOutlined/>}
                                                onMouseOver={this.btnMouseOver.bind(this)}
                                                onMouseOut={this.btnMouseOut.bind(this)}
                                                onClick={this.removeBtnOnClick.bind(this, item)}
                                                style={{color: this.state.fontColor}}>
                                        </Button>
                                    ]}>
                                        <Row style={{width: "100%"}}>
                                            <Col span={8}>
                                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<PushpinOutlined/>}
                                                        onMouseOver={this.btnMouseOver.bind(this)}
                                                        onMouseOut={this.btnMouseOut.bind(this)}
                                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                                    {item.webName}
                                                </Button>
                                            </Col>
                                            <Col span={16}>
                                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<LinkOutlined/>}
                                                        onMouseOver={this.btnMouseOver.bind(this)}
                                                        onMouseOut={this.btnMouseOut.bind(this)}
                                                        style={{color: this.state.fontColor, cursor: "default"}}>
                                                    {item.webUrl.length < 30 ? item.webUrl : item.webUrl.substring(0, 30) + "..."}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </Modal>
                    </Space>
                </Col>
            </Row>
        );
    }
}

export default CollectionComponent;