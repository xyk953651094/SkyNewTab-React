import React from "react";
import {Button, Tooltip, message} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {unsplashUrl, clientId} from "../typescripts/publicConstants";
import {httpRequest, changeThemeColor, isEmptyString} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

type propType = {
    themeColor: ThemeColorInterface,
    display: "none" | "block",
    imageData: any,
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

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            });
        }

        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData){
            this.setState({
                downloadLink: nextProps.imageData.links.download_location
            }, ()=>{
                changeThemeColor("#downloadBtn", this.state.backgroundColor, this.state.fontColor);
            })
        }
    }

    handleClick() {
        if (!isEmptyString(this.state.downloadLink)) {
            let url = this.state.downloadLink;
            let data = {
                "client_id": clientId,
            }
            httpRequest(url, data, "GET")
                .then(function(resultData: any){
                    window.open(resultData.url + unsplashUrl);
                    // let a = document.createElement("a");
                    // a.href = resultData.url + unsplashUrl;
                    // a.download = "unsplashWallpaper.jpg";
                    // document.body.appendChild(a);
                    // a.click();
                    // document.body.removeChild(a);
                })
                .catch(function(){
                    message.error("下载 Unsplash 图片失败");
                })
                .finally(function(){});
        } else {
            message.error("无下载链接");
        }
    }

    render() {
        return (
            <Tooltip title={"下载图片"} color={this.state.backgroundColor}>
                <Button shape="round" icon={<DownloadOutlined/>} size={"large"}
                        onClick={this.handleClick.bind(this)}
                        id={"downloadBtn"}
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