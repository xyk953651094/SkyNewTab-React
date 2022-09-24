import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../../typescripts/publicConstents";
import {changeThemeColor, getFontColor, getThemeColor, isEmptyString} from "../../typescripts/publicFunctions";

type propType = {
    themeColor: string,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    htmlLink: string,
}

interface HtmlLinkComponent {
    state: stateType,
    props: propType
}

class HtmlLinkComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            fontColor: "",
            htmlLink: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#htmlLinkBtn", nextProps.themeColor);

            this.setState({
                backgroundColor: nextProps.themeColor,
                fontColor: getFontColor(nextProps.themeColor),
                htmlLink: nextProps.imageData.links.html
            })
        }
    }

    handleClick() {
        if (!isEmptyString(this.state.htmlLink)) {
            window.open(this.state.htmlLink + unsplashUrl);
        } else {
            message.warning("无原网页链接");
        }
    }

    render() {
        return (
            <Tooltip title={"前往图片主页"}>
                <Button shape="round" icon={<LinkOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"htmlLinkBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            display: this.props.display,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.fontColor
                        }}
                />
            </Tooltip>
        );
    }
}

export default HtmlLinkComponent;