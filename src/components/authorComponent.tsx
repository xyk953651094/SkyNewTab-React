import React from "react";
import {Button, Tooltip, message} from "antd";
import {CameraOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../typescripts/publicConstants";
import {changeThemeColor, isEmptyString} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"
import "../stylesheets/authorComponent.scss"

type propType = {
    themeColor: ThemeColorInterface,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    authorName: string,
    userAvatar: string,
    userName: string,
    userLocation: string,
    authorLink: string,
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
            userAvatar: "",
            userName: "暂无信息",
            userLocation: "暂无信息",
            authorLink: "",
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
                userAvatar: nextProps.imageData.user.profile_image.large,
                userName: nextProps.imageData.user.username,
                userLocation: nextProps.imageData.user.location,
                authorLink: nextProps.imageData.user.links.html
            }, ()=>{
                changeThemeColor("#authorBtn", this.state.backgroundColor, this.state.fontColor);
            })
        }
    }

    handleClick() {
        if (!isEmptyString(this.state.authorLink)) {
            window.open(this.state.authorLink + unsplashUrl);
        } else {
            message.error("无跳转链接");
        }
    }

    render() {
        return (
            <Tooltip title={"前往摄影师主页"} color={this.state.backgroundColor}>
                <Button shape="round" icon={<CameraOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"authorBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{
                            display: this.props.display,
                        }}
                >
                    {"by " + this.state.authorName + " on Unsplash"}
                </Button>
            </Tooltip>
        );
    }
}

export default AuthorComponent;