import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {getFontColor, isEmptyString} from "../../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageColor: string,
    author: string,
    authorLink: string,
}

type stateType = {
    authorLink: string,
    backgroundColor: string,
    fontColor: string,
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
            backgroundColor: "",
            fontColor: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            this.setState({
                backgroundColor: nextProps.imageColor,
            }, () => {
                this.setState({
                    fontColor: getFontColor(this.state.backgroundColor),
                })
            })
        }
    }

    handleClick() {
        if (!isEmptyString(this.props.authorLink)) {
            window.open(this.props.authorLink);
        } else {
            message.error("无跳转链接");
        }
    }

    render() {
        return (
            <Tooltip title="前往图片作者主页">
                <Button shape="round" icon={<UserOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"authorBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            display: this.props.display,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.fontColor
                        }}
                >
                    {this.props.author}
                </Button>
            </Tooltip>
        );
    }
}

export default AuthorComponent;