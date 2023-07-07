import React from "react";
import {Button, Popover, Typography, message, Space, Divider, List, Avatar} from "antd";
import {CameraOutlined, LinkOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../typescripts/publicConstants";
import {changeThemeColor, isEmptyString} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"

const { Text } = Typography;

type propType = {
    themeColor: ThemeColorInterface,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
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
            backgroundColor: "",
            fontColor: "",
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

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            });
        }

        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                authorName: nextProps.imageData.user.name,
                authorLink: nextProps.imageData.user.links.html,
                authorIconUrl: nextProps.imageData.user.profile_image.small,
                authorCollections: nextProps.imageData.user.total_collections,
                authorLikes: nextProps.imageData.user.total_likes,
                authorPhotos: nextProps.imageData.user.total_photos,
                imageLink: nextProps.imageData.links.html,
                imagePreviewUrl: nextProps.imageData.urls.thumb,
                imageLocation: isEmptyString(nextProps.imageData.location.name)? "暂无信息" : nextProps.imageData.location.name,
                imageDescription: isEmptyString(nextProps.imageData.alt_description)? "暂无信息" : nextProps.imageData.alt_description,
            }, ()=>{
                changeThemeColor("#authorBtn", this.state.backgroundColor, this.state.fontColor);
            })
        }
    }

    gotoUser() {
        if (!isEmptyString(this.state.authorLink)) {
            window.open(this.state.authorLink + unsplashUrl);
        } else {
            message.error("无跳转链接");
        }
    }

    gotoImage() {
        if (!isEmptyString(this.state.imageLink)) {
            window.open(this.state.imageLink + unsplashUrl);
        } else {
            message.error("无跳转链接");
        }
    }

    render() {
        const popoverContent = (
            <List>
                <List.Item actions={[<Button type="text" shape="circle" icon={<LinkOutlined />} onClick={this.gotoUser.bind(this)} style={{color: this.state.fontColor}}/>]}>
                    <List.Item.Meta
                        avatar={<Avatar size="large" src={this.state.authorIconUrl} />}
                        title={this.state.authorName}
                        description={
                            <Space>
                                <Space>
                                    <i className="bi bi-collection"></i>
                                    <Text style={{color: this.state.fontColor}}>{" " + this.state.authorCollections}</Text>
                                </Space>
                                <Divider type="vertical" />
                                <Space>
                                    <i className="bi bi-heart"></i>
                                    <Text style={{color: this.state.fontColor}}>{" " + this.state.authorLikes}</Text>
                                </Space>
                                <Divider type="vertical" />
                                <Space>
                                    <i className="bi bi-images"></i>
                                    <Text style={{color: this.state.fontColor}}>{" " + this.state.authorPhotos}</Text>
                                </Space>
                            </Space>
                        }
                    />
                </List.Item>
                <List.Item actions={[<Button type="text" shape="circle" icon={<LinkOutlined />} onClick={this.gotoImage.bind(this)} style={{color: this.state.fontColor}}/>]}>
                    <List.Item.Meta
                        avatar={<Avatar size="large" shape={"square"} src={this.state.imagePreviewUrl} />}
                        title={this.state.imageLocation}
                        description={this.state.imageDescription}
                    />
                </List.Item>
            </List>
        );

        return (
            <Popover title={"图片信息"} content={popoverContent} placement="topRight" color={this.state.backgroundColor} overlayStyle={{width: "500px"}}>
                <Button shape="round" icon={<CameraOutlined/>} size={"large"}
                        id={"authorBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{
                            display: this.props.display,
                        }}
                >
                    {"by " + this.state.authorName + " on Unsplash"}
                </Button>
            </Popover>
        );
    }
}

export default AuthorComponent;