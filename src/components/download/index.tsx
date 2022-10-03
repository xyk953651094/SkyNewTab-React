import React from "react";
import "../../App.css";
import {Button, Tooltip, message} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {unsplashUrl, clientId} from "../../typescripts/publicConstents";
import {changeThemeColor, getFontColor, getThemeColor, isEmptyString} from "../../typescripts/publicFunctions";
const $ = require("jquery");

type propType = {
    themeColor: string,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
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
            downloadLink: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            changeThemeColor(".downloadBtn", nextProps.themeColor);
        }
        if (nextProps.imageData !== prevProps.imageData){
            this.setState({
                downloadLink: nextProps.imageData.links.download_location
            })
        }
    }

    handleClick() {
        if (!isEmptyString(this.state.downloadLink)) {
            let downloadXHR = new XMLHttpRequest();
            downloadXHR.open("GET", this.state.downloadLink + "?client_id=" + clientId);
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
            <Tooltip title={"下载图片"} color={this.props.themeColor}>
                <Button shape="round" icon={<DownloadOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        // id={"downloadBtn"}
                        className={"downloadBtn componentTheme zIndexHigh"}
                        style={{
                            display: this.props.display,
                        }}
                />
            </Tooltip>
        );
    }
}

export default DownloadComponent;