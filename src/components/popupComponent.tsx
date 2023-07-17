import React from "react";
import {Layout, Space, Image, Button, message, Typography} from "antd";
import {UserOutlined, EnvironmentOutlined, InfoCircleOutlined, GithubOutlined, MessageOutlined, GiftOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {
    changeThemeColor,
    getComponentBackgroundColor,
    getFontColor,
    isEmptyString
} from "../typescripts/publicFunctions";

const {Header, Content, Footer} = Layout;
const {Text} = Typography;

type propType = {}

type stateType = {
    imageData: any
    authorName: string,
    authorLink: string,
    // authorIconUrl: string,
    // authorCollections: number,
    // authorLikes: number,
    // authorPhotos: number,
    imageLink: string,
    imagePreviewUrl: string,
    imageLocation: string,
    imageDescription: string,
    imageColor: string,
    fontColor: string,
}

interface PopupComponent {
    state: stateType,
    props: propType
}

class PopupComponent extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            imageData: null,
            authorName: "暂无信息",
            authorLink: "",
            // authorIconUrl: "",
            // authorCollections: 0,
            // authorLikes: 0,
            // authorPhotos: 0,
            imageLink: "",
            imagePreviewUrl: "",
            imageLocation: "暂无信息",
            imageDescription: "暂无信息",
            imageColor: "#ffffff",
            fontColor: "#000000"
        }
    }

    componentDidMount() {
        let imageData = localStorage.getItem("lastImage");
        if (imageData) {
            let tempImageData = JSON.parse(imageData);

            this.setState({
                imageData: tempImageData,
                authorName: tempImageData.user.name,
                authorLink: tempImageData.user.links.html,
                // authorIconUrl: tempImageData.user.profile_image.small,
                // authorCollections: tempImageData.user.total_collections,
                // authorLikes: tempImageData.user.total_likes,
                // authorPhotos: tempImageData.user.total_photos,
                imageLink: tempImageData.links.html,
                imagePreviewUrl: tempImageData.urls.small,
                imageLocation: isEmptyString(tempImageData.location.name)? "暂无信息" : tempImageData.location.name,
                imageDescription: isEmptyString(tempImageData.alt_description)? "暂无信息" : tempImageData.alt_description,
                imageColor: getComponentBackgroundColor(tempImageData.color),
                fontColor: getFontColor(getComponentBackgroundColor(tempImageData.color))
            },()=> {
                changeThemeColor("body", this.state.imageColor, this.state.fontColor);
            })
        }
        else {
            message.error("暂无图片信息");
        }
    }

    render() {
        return (
            <Layout className={"popupLayout"} style={{backgroundColor: this.state.imageColor}}>
                <Content className={"popupContent"}>
                    <Space>
                        <Image
                            width={200}
                            preview={false}
                            alt={"图片加载失败"}
                            src={this.state.imagePreviewUrl}
                            style={{borderRadius: "10px"}}
                        />
                        <Space direction={"vertical"}>
                            <Button type="text" shape="round" icon={<UserOutlined />} href={this.state.authorLink} target="_blank" style={{color: this.state.fontColor}}>
                                {this.state.authorName}
                            </Button>
                            <Button type="text" shape="round" icon={<EnvironmentOutlined />} href={this.state.imageLink} target="_blank" style={{color: this.state.fontColor}}>
                                {this.state.imageLocation}
                            </Button>
                            <Button type="text" shape="round" icon={<InfoCircleOutlined />} href={this.state.imageLink} target="_blank" style={{color: this.state.fontColor}}>
                                {this.state.imageDescription}
                            </Button>
                            <Space align={"center"}>
                                <Button type="text" shape="round" icon={<GithubOutlined />} href="https://github.com/xyk953651094" target="_blank" style={{color: this.state.fontColor}}>
                                    主页
                                </Button>
                                <Button type="text" shape="round" icon={<MessageOutlined />} href="https://xyk953651094.blogspot.com" target="_blank" style={{color: this.state.fontColor}}>
                                    博客
                                </Button>
                                <Button type="text" shape="round" icon={<GiftOutlined />} href="https://afdian.net/a/xyk953651094" target="_blank" style={{color: this.state.fontColor}}>
                                    捐赠
                                </Button>
                            </Space>
                        </Space>
                    </Space>
                </Content>
            </Layout>
        );
    }
}

export default PopupComponent;