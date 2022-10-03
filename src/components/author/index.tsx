import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {CameraOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../../typescripts/publicConstents";
import {changeThemeColor, isEmptyString} from "../../typescripts/publicFunctions";
import {ThemeColorInterface} from "../../typescripts/publicInterface";

type propType = {
    themeColor: ThemeColorInterface,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    author: string
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
            author: "暂无作者信息",
            authorLink: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            },() => {
                changeThemeColor("#authorBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.imageData !== prevProps.imageData) {
            this.setState({
                author: "by " + nextProps.imageData.user.name + " on Unsplash",
                authorLink: nextProps.imageData.user.links.html
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
            <Tooltip title={"前往作者主页"} color={this.state.backgroundColor}>
                <Button shape="round" icon={<CameraOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"authorBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{display: this.props.display}}
                >
                    {this.state.author}
                </Button>
            </Tooltip>
        );
    }
}

export default AuthorComponent;