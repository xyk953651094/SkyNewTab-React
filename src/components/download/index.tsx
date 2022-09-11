import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {unsplashUrl, clientId} from "../../typescripts/publicConstents";
import {changeThemeColor, isEmptyString} from "../../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageColor: string,
    downloadLink: string,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    downloadLink: string,
}

interface DownloadComponent {
    state: stateType,
    props: propType
}

class DownloadComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            fontColor: "",
            downloadLink: "",
        };
    }

    componentDidMount() {
        this.setState({
            downloadLink: this.props.downloadLink
        })
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#downloadBtn", nextProps.imageColor);
        }
    }

    handleClick() {
        if (!isEmptyString(this.props.downloadLink)) {
            let downloadXHR = new XMLHttpRequest();
            downloadXHR.open("GET", this.props.downloadLink + "?client_id=" + clientId);
            downloadXHR.onload = function () {
                if (downloadXHR.status === 200) {
                    let downloadUrl = JSON.parse(downloadXHR.responseText).url + unsplashUrl;
                    window.open(downloadUrl);
                }
                else {
                    message.error("获取下载链接失败");
                }
            }
            downloadXHR.onerror = function () {
                message.error("获取下载链接失败");
            }
            downloadXHR.send();
        } else {
            message.error("无下载链接");
        }
    }

    render() {
        return (
            <Tooltip title={"下载图片"}>
                <Button shape="round" icon={<DownloadOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"downloadBtn"}
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

export default DownloadComponent;