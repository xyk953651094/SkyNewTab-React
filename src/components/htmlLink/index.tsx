import React from "react";
import {Button, Tooltip, message} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../../typescripts/publicConstants";
import {isEmptyString} from "../../typescripts/publicFunctions";
import {ThemeColorInterface} from "../../typescripts/publicInterface";

type propType = {
    themeColor: ThemeColorInterface,
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
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            });
        }

        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData) {
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
            <Tooltip title={"前往图片主页"} color={this.state.backgroundColor}>
                <Button shape="round" icon={<LinkOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        // id={"htmlLinkBtn"}
                        className={"htmlLinkBtn componentTheme zIndexHigh"}
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