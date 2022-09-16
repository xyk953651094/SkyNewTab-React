import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {CameraOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../../typescripts/publicConstents";
import {changeThemeColor, isEmptyString} from "../../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    themeColor: string,
    author: string,
    authorLink: string,
}

type stateType = {
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
            authorLink: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#authorBtn", nextProps.themeColor);
        }
    }

    handleClick() {
        if (!isEmptyString(this.props.authorLink)) {
            window.open(this.props.authorLink + unsplashUrl);
        } else {
            message.error("无跳转链接");
        }
    }

    render() {
        return (
            <Tooltip title={"前往作者主页"}>
                <Button shape="round" icon={<CameraOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"authorBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{display: this.props.display}}
                >
                    {this.props.author}
                </Button>
            </Tooltip>
        );
    }
}

export default AuthorComponent;