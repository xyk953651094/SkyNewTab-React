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
import {btnMouseOut, btnMouseOver, getSearchEngineDetail, isEmpty} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import $ from "jquery";

const btnMaxSize = 35;

type propType = {
    imageData: any,
    hoverColor: string,
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
    blurHashCode: string,
    searchEngineUrl: string,
    noImageMode: boolean,
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
            blurHashCode: "",
            searchEngineUrl: "https://www.bing.com/search?q=",
            noImageMode: false,
        }
    }

    authorLinkBtnOnClick() {
        if (!isEmpty(this.state.authorLink)) {
            window.open(this.state.authorLink, "_blank");
        } else {
            message.error("暂无链接")
        }
    }

    imageLinkBtnOnClick() {
        if (!isEmpty(this.state.imageLink)) {
            window.open(this.state.imageLink, "_blank");
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

    getCreateTime(createTime: string) {
        return createTime.substring(0, createTime.indexOf("T"));
    }

    componentDidMount() {
        // @ts-ignore
        let popupImageDiv: HTMLElement = document.getElementById("popupImage");
        // @ts-ignore
        let popupImage: HTMLElement = popupImageDiv.children[0];

        popupImageDiv.style.display = "none";
        if (popupImage instanceof HTMLElement) {
            popupImage.onload = () => {
                // $("#popupCanvas").remove();
                $("#popupCanvas").removeClass("imageFadeIn").addClass("imageFadeOut");
                popupImageDiv.style.display = "block";
                popupImageDiv.className = "imageFadeIn";
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
                    imageLocation: isEmpty(nextProps.imageData.location.name) ? "暂无信息" : nextProps.imageData.location.name,
                    imageDescription: isEmpty(nextProps.imageData.alt_description) ? "暂无信息" : nextProps.imageData.alt_description,
                    imageCreateTime: this.getCreateTime(nextProps.imageData.created_at),
                    imageCamera: isEmpty(nextProps.imageData.exif.name) ? "暂无信息" : nextProps.imageData.exif.name,
                    hoverColor: nextProps.imageData.color,
                    blurHashCode: nextProps.imageData.blur_hash
                }, () => {
                    if (!isEmpty(this.state.blurHashCode)) {
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
                                popupCanvas.className = "popupCanvas imageFadeIn";
                            })
                        }
                    }
                }
            )
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                searchEngineUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineUrl,
                noImageMode: nextProps.preferenceData.noImageMode
            });
        }
    }

    render() {
        return (
            <>
                <Space align={"center"} style={{display: this.state.noImageMode ? "none" : "inline-flex"}}>
                    <div className="popupImageDiv">
                        <Image
                            id={"popupImage"}
                            width={250}
                            height={150}
                            preview={false}
                            alt={"暂无图片"}
                            src={this.state.imagePreviewUrl}
                            style={{borderRadius: "8px"}}
                        />
                        <canvas id={"popupCanvas"} className={"popupCanvas"}
                                style={{display: this.state.displayCanvas}}></canvas>
                    </div>
                    <Space direction={"vertical"} align="start">
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<UserOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                onClick={this.authorLinkBtnOnClick.bind(this)}
                                style={{color: this.props.fontColor}}>
                            {this.state.authorName.length < btnMaxSize ? this.state.authorName : this.state.authorName.substring(0, btnMaxSize) + "..."}
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<EnvironmentOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                onClick={this.imageLocationBtnOnClick.bind(this)} style={{color: this.props.fontColor}}>
                            {this.state.imageLocation.length < btnMaxSize ? this.state.imageLocation : this.state.imageLocation.substring(0, btnMaxSize) + "..."}
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<InfoCircleOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                                onClick={this.imageLinkBtnOnClick.bind(this)} style={{color: this.props.fontColor}}>
                            {this.state.imageDescription.length < btnMaxSize ? this.state.imageDescription : this.state.imageDescription.substring(0, btnMaxSize) + "..."}
                        </Button>
                        {/*<Space>*/}
                        {/*    <Button type={"text"} shape={this.props.preferenceData.buttonShape}*/}
                        {/*            icon={<ClockCircleOutlined/>}*/}
                        {/*            style={{color: this.props.fontColor, cursor: "default"}}*/}
                        {/*            onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}*/}
                        {/*            onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}>*/}
                        {/*        {this.state.imageCreateTime}*/}
                        {/*    </Button>*/}
                        {/*    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CameraOutlined/>}*/}
                        {/*            onClick={this.imageCameraBtnOnClick.bind(this)}*/}
                        {/*            style={{color: this.props.fontColor}}*/}
                        {/*            onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}*/}
                        {/*            onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}>*/}
                        {/*        {this.state.imageCamera}*/}
                        {/*    </Button>*/}
                        {/*</Space>*/}
                    </Space>
                </Space>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<InfoCircleOutlined/>}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{
                            color: this.props.fontColor,
                            cursor: "default",
                            display: this.state.noImageMode ? "inline-block" : "none"
                        }}>
                    {"已开启纯色模式"}
                </Button>
            </>
        );
    }
}

export default PopupImageComponent;