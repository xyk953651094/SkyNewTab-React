import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../../typescripts/publicConstents";
import {changeThemeColor, getFontColor, getThemeColor, isEmptyString} from "../../typescripts/publicFunctions";
const $ = require("jquery");

type propType = {
    themeColor: string,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
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
            htmlLink: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            changeThemeColor("#htmlLinkBtn", nextProps.themeColor);
        }

        if (nextProps.imageData !== prevProps.imageData) {
            this.setState({
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
            <Tooltip title={"前往图片主页"}
                     color={this.props.themeColor}
                     onOpenChange={(open)=>{
                         if(open) {
                             $(".ant-tooltip-inner").css("color", getFontColor(this.props.themeColor));
                         }
                     }}
            >
                <Button shape="round" icon={<LinkOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"htmlLinkBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            display: this.props.display,
                        }}
                />
            </Tooltip>
        );
    }
}

export default HtmlLinkComponent;