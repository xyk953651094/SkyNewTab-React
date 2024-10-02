import React from "react";
import {Button, Col, Form, Input, List, message, Modal, Row, Space, Tooltip, Typography} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined, LinkOutlined} from "@ant-design/icons";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import {btnMouseOut, btnMouseOver, getExtensionStorage, setExtensionStorage, removeExtensionStorage} from "../typescripts/publicFunctions";
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
            displayAddModal: false,
            displayEditModal: false,
            collectionData: [],
            collectionSize: 0,
            collectionMaxSize: 5
        };
    }

    // 添加导航弹窗
    showAddModalBtnOnClick() {
        if (this.state.collectionData.length < this.state.collectionMaxSize) {
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
            let tempCollectionData = this.state.collectionData;
            if (tempCollectionData.length < this.state.collectionMaxSize) {
                let urlRegExp = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]", "g");
                if (urlRegExp.exec(webUrl) !== null) {
                    tempCollectionData.push({"webName": webName, "webUrl": webUrl, "timeStamp": Date.now()});
                    setExtensionStorage("collections", tempCollectionData);

                    this.setState({
                        displayAddModal: false,
                        collectionData: tempCollectionData,
                        collectionSize: tempCollectionData.length
                    });
                    message.success("添加成功");
                } else {
                    message.error("链接地址格式错误");
                }
            } else {
                message.error("链接数量最多为" + this.state.collectionMaxSize + "个");
            }
        } else {
            message.error("表单不能为空");
        }
    }

    addModalCancelBtnOnClick() {
        this.setState({
            displayAddModal: false
        })
    }

    // 编辑导航弹窗
    showEditModalBtnOnClick() {
        this.setState({
            displayEditModal: true
        })
    }

    editNameInputOnPressEnter(item: any, e: any) {
        if (e.target.value.length > 0) {
            let index = -1;
            let tempCollectionData = this.state.collectionData;
            for (let i = 0; i < tempCollectionData.length; i++) {
                if (item.timeStamp === tempCollectionData[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                tempCollectionData[index].webName = e.target.value;

                setExtensionStorage("collections", tempCollectionData);
                this.setState({
                    collectionData: tempCollectionData,
                    collectionSize: tempCollectionData.length
                })
                message.success("修改成功");
            } else {
                message.error("修改失败");
            }
        } else {
            message.warning("链接名称不能为空");
        }
    }

    editUrlInputOnPressEnter(item: any, e: any) {
        if (e.target.value.length > 0) {
            let index = -1;
            let tempCollectionData = this.state.collectionData;
            for (let i = 0; i < tempCollectionData.length; i++) {
                if (item.timeStamp === tempCollectionData[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                tempCollectionData[index].webUrl = e.target.value;

                setExtensionStorage("collections", tempCollectionData);
                this.setState({
                    collectionData: tempCollectionData,
                    collectionSize: tempCollectionData.length
                })
                message.success("修改成功");
            } else {
                message.error("修改失败");
            }
        } else {
            message.warning("链接地址不能为空");
        }
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
        let index = -1;
        let tempCollectionData = this.state.collectionData;
        for (let i = 0; i < tempCollectionData.length; i++) {
            if (item.timeStamp === tempCollectionData[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempCollectionData.splice(index, 1);
        }
        setExtensionStorage("collections", tempCollectionData);

        this.setState({
            collectionData: tempCollectionData,
            collectionSize: tempCollectionData.length
        }, () => {
            message.success("删除成功");
        })
    }

    removeAllBtnOnClick() {
        removeExtensionStorage("collections");
        this.setState({
            collectionData: [],
            collectionSize: 0,
        }, () => {
            message.success("删除成功");
        })
    }

    componentDidMount() {
        let tempThis = this;
        getExtensionStorage("collections", []).then((collections: any) => {
            tempThis.setState({
                collectionData: collections,
                collectionSize: collections.length
            })
        });
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
                                    <Tooltip title={"前往 " + item.webName} placement={"bottom"} color={this.state.backgroundColor} key={item.timeStamp}>
                                        <Button shape={this.props.preferenceData.buttonShape}
                                                className={"componentTheme"}
                                                onClick={() => {
                                                    window.open(item.webUrl, "_self")
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
                            <Button shape={this.state.buttonShape} className={"componentTheme"}
                                    style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                                    icon={<PlusOutlined/>} onClick={this.showAddModalBtnOnClick.bind(this)}/>
                        </Tooltip>
                        <Tooltip title={"编辑链接"} placement={"bottom"} color={this.state.backgroundColor}>
                            <Button shape={this.state.buttonShape} className={"componentTheme"}
                                    style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                                    icon={<EditOutlined/>} onClick={this.showEditModalBtnOnClick.bind(this)}/>
                        </Tooltip>
                        <Tooltip title={"全部删除"} placement={"bottom"} color={this.state.backgroundColor}>
                            <Button shape={this.state.buttonShape} className={"componentTheme"}
                                    style={{color: this.state.fontColor, backgroundColor: this.state.backgroundColor}}
                                    icon={<DeleteOutlined/>} onClick={this.removeAllBtnOnClick.bind(this)}/>
                        </Tooltip>
                        <Modal title={
                            <Row align={"middle"}>
                                <Col span={12}>
                                    <Text style={{color: this.state.fontColor}}>
                                        {"添加链接 " + this.state.collectionSize + " / " + this.state.collectionMaxSize}
                                    </Text>
                                </Col>
                                <Col span={12} style={{textAlign: "right"}}>
                                    <LinkOutlined />
                                </Col>
                            </Row>
                        }
                               closeIcon={false} centered
                               open={this.state.displayAddModal} onOk={this.addModalOkBtnOnClick.bind(this)}
                               onCancel={this.addModalCancelBtnOnClick.bind(this)}
                               destroyOnClose={true}
                               styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
                        >
                            <Form>
                                <Form.Item label={"链接名称"} name={"webName"}>
                                    <Input placeholder={"请输入链接名称"} id={"webNameInput"} maxLength={5} allowClear
                                           showCount/>
                                </Form.Item>
                                <Form.Item label={"链接地址"} name={"webNameUrl"}>
                                    <Input placeholder={"请输入链接地址"} id={"webUrlInput"} allowClear/>
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
                                    <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                            icon={<DeleteOutlined/>}
                                            onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                            onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
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
                               destroyOnClose={true}
                               styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
                        >
                            <List
                                dataSource={this.state.collectionData}
                                renderItem={(item: any) => (
                                    <List.Item actions={[
                                        <Space>
                                            <Button type={"text"} shape={this.state.buttonShape} icon={<DeleteOutlined/>}
                                                    onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                                    onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                                    onClick={this.removeBtnOnClick.bind(this, item)}
                                                    style={{color: this.state.fontColor}}>
                                            </Button>
                                        </Space>
                                    ]}>
                                        <Space>
                                            <Input style={{width: 150}} defaultValue={item.webName} onPressEnter={this.editNameInputOnPressEnter.bind(this, item)} maxLength={5} allowClear showCount/>
                                            <Input style={{width: 250}} defaultValue={item.webUrl} onPressEnter={this.editUrlInputOnPressEnter.bind(this, item)} allowClear/>
                                        </Space>
                                    </List.Item>
                                )}
                                footer={
                                    <Text style={{color: this.state.fontColor, display: this.state.collectionData.length > 0 ? "inline-block" : "none"}}>
                                        {"在输入框中修改内容后按回车生效"}
                                    </Text>
                                }
                            />
                        </Modal>
                    </Space>
                </Col>
            </Row>
        );
    }
}

export default CollectionComponent;