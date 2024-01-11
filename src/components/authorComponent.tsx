import React from "react";
import {Avatar, Button, Col, Divider, List, message, Popover, Row, Space, Typography} from "antd";
import {
    CameraOutlined,
    EnvironmentOutlined,
    DownloadOutlined,
    InfoCircleOutlined,
    UserOutlined
} from "@ant-design/icons";
import {unsplashUrl} from "../typescripts/publicConstants";
import {
    btnMouseOut,
    btnMouseOver,
    changeThemeColor,
    getSearchEngineDetail,
    isEmpty
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"

const {Text} = Typography;
const btnMaxSize = 50;

type propType = {
    display: "none" | "block",
    themeColor: ThemeColorInterface,
    imageData: any,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    searchEngineUrl: string,
    authorName: string,
    authorLink: string,
    authorIconUrl: string,
    authorCollections: number,
    authorLikes: number,
    authorPhotos: number,
    imageLink: string,
    imagePreviewUrl: string,
    imageLocation: string,
    imageDescription: string,
}

interface AuthorComponent {
    state: stateType,
    props: propType
}

class AuthorComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            searchEngineUrl: "https://www.bing.com/search?q=",
            authorName: "暂无信息",
            authorLink: "",
            authorIconUrl: "",
            authorCollections: 0,
            authorLikes: 0,
            authorPhotos: 0,
            imageLink: "",
            imagePreviewUrl: "",
            imageLocation: "暂无信息",
            imageDescription: "暂无信息",
        };
    }

    authorLinkBtnOnClick() {
        if (!isEmpty(this.state.authorLink)) {
            window.open(this.state.authorLink + unsplashUrl, "_blank");
        } else {
            message.error("无跳转链接");
        }
    }

    imageLinkBtnOnClick() {
        if (!isEmpty(this.state.imageLink)) {
            window.open(this.state.imageLink + unsplashUrl, "_blank");
        } else {
            message.error("无跳转链接");
        }
    }

    imageLocationBtnOnClick() {
        if (this.state.imageLocation !== "暂无信息") {
            window.open(this.state.searchEngineUrl + this.state.imageLocation, "_blank");
        } else {
            message.error("无跳转链接");
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

        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                authorName: nextProps.imageData.user.name,
                authorLink: nextProps.imageData.user.links.html,
                authorIconUrl: nextProps.imageData.user.profile_image.large,
                authorCollections: nextProps.imageData.user.total_collections,
                authorLikes: nextProps.imageData.user.total_likes,
                authorPhotos: nextProps.imageData.user.total_photos,
                imageLink: nextProps.imageData.links.html,
                imagePreviewUrl: nextProps.imageData.urls.regular,
                imageLocation: isEmpty(nextProps.imageData.location.name) ? "暂无信息" : nextProps.imageData.location.name,
                imageDescription: isEmpty(nextProps.imageData.alt_description) ? "暂无信息" : nextProps.imageData.alt_description,
            }, () => {
                changeThemeColor("#authorBtn", this.state.backgroundColor, this.state.fontColor);
            })
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                searchEngineUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineUrl,
            });
        }
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={10}>
                    <Text style={{color: this.state.fontColor}}>{"摄影师与图片信息"}</Text>
                </Col>
                <Col span={14} style={{textAlign: "right"}}>
                    <Space>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<DownloadOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                onClick={this.imageLinkBtnOnClick.bind(this)}
                                style={{color: this.state.fontColor}}>
                            {"下载图片"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List>
                <List.Item>
                    <Space align={"center"}>
                        <Avatar size={64} src={this.state.authorIconUrl} alt={"作者"}/>
                        <Space direction={"vertical"}>
                            <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<UserOutlined/>}
                                    style={{color: this.state.fontColor}}
                                    onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                    onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                    onClick={this.authorLinkBtnOnClick.bind(this)}>
                                {this.state.authorName.length < btnMaxSize ? this.state.authorName : this.state.authorName.substring(0, btnMaxSize) + "..."}
                            </Button>
                            <Space>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<i className="bi bi-collection"></i>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}>
                                    {" " + this.state.authorCollections + " 个合集"}
                                </Button>
                                <Divider type="vertical" style={{borderColor: this.state.fontColor}}/>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<i className="bi bi-heart"></i>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}>
                                    {" " + this.state.authorLikes + " 个点赞"}
                                </Button>
                                <Divider type="vertical" style={{borderColor: this.state.fontColor}}/>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<i className="bi bi-images"></i>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}>
                                    {" " + this.state.authorPhotos + " 张照片"}
                                </Button>
                            </Space>
                        </Space>
                    </Space>
                </List.Item>
                <List.Item>
                    <Space direction={"vertical"}>
                        <Space>
                            <Avatar size={64} shape={"square"} src={this.state.imagePreviewUrl} alt={"信息"}/>
                            <Space direction={"vertical"}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<EnvironmentOutlined/>}
                                        style={{color: this.state.fontColor}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                        onClick={this.imageLocationBtnOnClick.bind(this)}>
                                    {this.state.imageLocation.length < btnMaxSize ? this.state.imageLocation : this.state.imageLocation.substring(0, btnMaxSize) + "..."}
                                </Button>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                        icon={<InfoCircleOutlined/>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                        onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}>
                                    {this.state.imageDescription.length < btnMaxSize ? this.state.imageDescription : this.state.imageDescription.substring(0, btnMaxSize) + "..."}
                                </Button>
                            </Space>
                        </Space>
                    </Space>
                </List.Item>
            </List>
        );

        return (
            <Popover title={popoverTitle} content={popoverContent} placement={"topRight"}
                     color={this.state.backgroundColor}
                     overlayStyle={{minWidth: "550px"}}>
                <Button shape={this.props.preferenceData.buttonShape} icon={<CameraOutlined/>} size={"large"}
                        id={"authorBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{
                            display: this.props.display,
                            cursor: "default"
                        }}
                >
                    {"由 Unsplash 的 " + (this.state.authorName.length < btnMaxSize ? this.state.authorName : this.state.authorName.substring(0, btnMaxSize) + "...") + " 拍摄"}
                </Button>
            </Popover>
        );
    }
}

export default AuthorComponent;