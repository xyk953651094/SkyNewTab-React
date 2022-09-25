import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {CameraOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../../typescripts/publicConstents";
import {changeThemeColor, getFontColor, getThemeColor, isEmptyString} from "../../typescripts/publicFunctions";
const $ = require("jquery");

type propType = {
    themeColor: string,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
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
            author: "",
            authorLink: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            changeThemeColor("#authorBtn", nextProps.themeColor);
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
            <Tooltip title={"前往作者主页"}
                     color={this.props.themeColor}
                     onOpenChange={(open)=>{
                         if(open) {
                             $(".ant-tooltip-inner").css("color", getFontColor(this.props.themeColor));
                         }
                     }}
            >
                <Button shape="round" icon={<CameraOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"authorBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{display: this.props.display}}
                >
                    {this.state.author}
                </Button>
            </Tooltip>
        );
    }
}

export default AuthorComponent;