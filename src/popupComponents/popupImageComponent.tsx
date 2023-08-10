import React from "react";
import {Button, Image, message, Space} from "antd";
import {
    CameraOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    InfoCircleOutlined,
    UserOutlined
} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss";
import {decode} from "blurhash"
import {getFontColor, getSearchEngineDetail, isEmptyString} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const $ = require("jquery");
const btnMaxSize = 40;

type propType = {
    imageData: any,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    displayCanvas: "none" | "block",
    authorName: string,
    authorLink: string,
    imageLink: string,
    imagePreviewUrl: string,
    imageLocation: string,
    imageDescription: string,
    imageCreateTime: string,
    imageCamera: string,
    hoverColor: string,
    fontColor: string,
    blurHashCode: string,
    searchEngineUrl: string,
}

interface PopupImageComponent {
    state: stateType,
    props: propType
}

class PopupImageComponent extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            displayCanvas: "none",
            authorName: "暂无信息",
            authorLink: "",
            imageLink: "",
            imagePreviewUrl: "",
            imageLocation: "暂无信息",
            imageDescription: "暂无信息",
            imageCreateTime: "暂无信息",
            imageCamera: "暂无信息",
            hoverColor: "#000000",
            fontColor: "#000000",
            blurHashCode: "",
            searchEngineUrl: "https://www.bing.com/search?q=",
        }
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.state.hoverColor;
        e.currentTarget.style.color = getFontColor(this.state.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.state.fontColor;
    }

    authorLinkBtnOnClick() {
        if (!isEmptyString(this.state.authorLink)) {
            window.open(this.state.authorLink);
        } else {
            message.error("暂无链接")
        }
    }

    imageLinkBtnOnClick() {
        if (!isEmptyString(this.state.imageLink)) {
            window.open(this.state.imageLink);
        } else {
            message.error("暂无链接")
        }
    }

    imageLocationBtnOnClick() {
        if (this.state.imageLocation !== "暂无信息") {
            window.open(this.state.searchEngineUrl + this.state.imageLocation, "_blank");
        } else {
            message.error("无跳转链接");
        }
    }

    imageCameraBtnOnClick() {
        if (this.state.imageCamera !== "暂无信息") {
            window.open(this.state.searchEngineUrl + this.state.imageCamera, "_blank");
        } else {
            message.error("无跳转链接");
        }
    }

    componentDidMount() {
        // @ts-ignore
        let popupImageDiv: HTMLElement = document.getElementById("popupImage");
        // @ts-ignore
        let popupImage: HTMLElement = popupImageDiv.children[0];

        popupImageDiv.style.display = "none";
        if (popupImage instanceof HTMLElement) {
            popupImage.onload = () => {
                $("#popupCanvas").remove();
                popupImageDiv.style.display = "block";
                popupImageDiv.className = "wallpaperFadeIn";
            }
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                    authorName: nextProps.imageData.user.name,
                    authorLink: nextProps.imageData.user.links.html,
                    imageLink: nextProps.imageData.links.html,
                    imagePreviewUrl: nextProps.imageData.urls.regular,
                    imageLocation: isEmptyString(nextProps.imageData.location.name) ? "暂无信息" : nextProps.imageData.location.name,
                    imageDescription: isEmptyString(nextProps.imageData.alt_description) ? "暂无信息" : nextProps.imageData.alt_description,
                    imageCreateTime: nextProps.imageData.created_at,
                    imageCamera: isEmptyString(nextProps.imageData.exif.name) ? "暂无信息" : nextProps.imageData.exif.name,
                    hoverColor: nextProps.imageData.color,
                    blurHashCode: nextProps.imageData.blur_hash
                }, () => {
                    if (!isEmptyString(this.state.blurHashCode)) {
                        const popupCanvas = document.getElementById("popupCanvas") as HTMLCanvasElement | null;
                        if (popupCanvas instanceof HTMLCanvasElement) {
                            let blurHashImage = decode(this.state.blurHashCode, popupCanvas.width, popupCanvas.height);
                            let ctx = popupCanvas.getContext("2d");
                            if (ctx) {
                                const imageData = new ImageData(blurHashImage, popupCanvas.width, popupCanvas.height);
                                ctx.putImageData(imageData, 0, 0);
                            }

                            this.setState({
                                displayCanvas: "block",
                            }, () => {
                                popupCanvas.className = "popupCanvas wallpaperFadeIn";
                            })
                        }
                    }
                }
            )
        }

        if (nextProps.fontColor !== prevProps.fontColor) {
            this.setState({
                fontColor: nextProps.fontColor,
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                searchEngineUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineUrl,
            });
        }
    }

    render() {
        return (
            <Space align={"center"}>
                <Image
                    id={"popupImage"}
                    width={300}
                    height={180}
                    preview={false}
                    alt={"暂无图片"}
                    src={this.state.imagePreviewUrl}
                    style={{borderRadius: "10px"}}
                />
                <canvas id={"popupCanvas"} className={"popupCanvas"}
                        style={{display: this.state.displayCanvas, borderRadius: "10px"}}></canvas>
                <Space direction={"vertical"}>
                    <Button type={"text"} shape={"round"} icon={<UserOutlined/>}
                            onMouseOver={this.btnMouseOver.bind(this)}
                            onMouseOut={this.btnMouseOut.bind(this)} onClick={this.authorLinkBtnOnClick.bind(this)}
                            style={{color: this.state.fontColor}}>
                        {this.state.authorName.length < btnMaxSize ? this.state.authorName : this.state.authorName.substring(0, btnMaxSize) + "..."}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<CameraOutlined/>}
                            onClick={this.imageCameraBtnOnClick.bind(this)} style={{color: this.state.fontColor}}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                        {this.state.imageCamera}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<ClockCircleOutlined/>}
                            style={{color: this.state.fontColor, cursor: "default"}}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                        {this.state.imageCreateTime}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<EnvironmentOutlined/>}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            onClick={this.imageLocationBtnOnClick.bind(this)} style={{color: this.state.fontColor}}>
                        {this.state.imageLocation.length < btnMaxSize ? this.state.imageLocation : this.state.imageLocation.substring(0, btnMaxSize) + "..."}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<InfoCircleOutlined/>}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            onClick={this.imageLinkBtnOnClick.bind(this)} style={{color: this.state.fontColor}}>
                        {this.state.imageDescription.length < btnMaxSize ? this.state.imageDescription : this.state.imageDescription.substring(0, btnMaxSize) + "..."}
                    </Button>
                </Space>
            </Space>
        );
    }
}

export default PopupImageComponent;