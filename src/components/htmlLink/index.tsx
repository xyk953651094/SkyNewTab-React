import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {getFontColor, isEmptyString} from "../../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageColor: string,
    htmlLink: string,
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

    componentDidMount() {
        this.setState({
            htmlLink: this.props.htmlLink
        })
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
        if (!isEmptyString(this.props.htmlLink)) {
            window.open(this.props.htmlLink);
        } else {
            message.warning("无原网页链接");
        }
    }

    render() {
        return (
            <Tooltip title="前往图片原网页">
                <Button shape="round" icon={<LinkOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"gotoBtn"}
                        className={"frostedGlass"}
                        style={{
                            display: this.props.display,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.fontColor,
                        }}
                />
            </Tooltip>
        );
    }
}

export default HtmlLinkComponent;