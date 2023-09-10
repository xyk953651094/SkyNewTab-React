import React from "react";
import "../stylesheets/wallpaperComponent.scss"
import "../stylesheets/publicStyles.scss"
import {Image, message} from "antd";
import {httpRequest, imageDynamicEffect, isEmptyString} from "../typescripts/publicFunctions";
import {clientId, defaultPreferenceData, device} from "../typescripts/publicConstants";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import {decode} from "blurhash";

const $ = require("jquery");

type propType = {
    getImageData: any,
}

type stateType = {
    imageData: any,
    preferenceData: PreferenceDataInterface,
    imageLink: string,
    display: "none" | "block",
    displayCanvas: "none" | "block",
}

interface WallpaperComponent {
    state: stateType,
    props: propType
}

class WallpaperComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageData: null,
            preferenceData: defaultPreferenceData,
            imageLink: "",
            display: "none",
            displayCanvas: "none",
        };
    }

    setWallpaper(imageData: any) {
        this.setState({
            imageData: imageData,
        }, () => {
            this.props.getImageData(imageData);
            switch (this.state.preferenceData.imageQuality) {
                case "full":
                    this.setState({
                        imageLink: this.state.imageData.urls.full,
                    });
                    break;
                case "regular":
                    this.setState({
                        imageLink: this.state.imageData.urls.regular,
                    });
                    break;
                case "small":
                    this.setState({
                        imageLink: this.state.imageData.urls.small,
                    });
                    break;
                case "small_s3":
                    this.setState({
                        imageLink: this.state.imageData.urls.small_s3,
                    });
                    break;
                default:
                    this.setState({
                        imageLink: this.state.imageData.urls.regular,
                    });
                    break;
            }

            // blurHash
            if (!isEmptyString(imageData.blur_hash)) {
                const backgroundCanvas = document.getElementById("backgroundCanvas") as HTMLCanvasElement | null;
                if (backgroundCanvas instanceof HTMLCanvasElement) {
                    let blurHashImage = decode(imageData.blur_hash, backgroundCanvas.width, backgroundCanvas.height);
                    let ctx = backgroundCanvas.getContext("2d");
                    if (ctx) {
                        const imageData = new ImageData(blurHashImage, backgroundCanvas.width, backgroundCanvas.height);
                        ctx.putImageData(imageData, 0, 0);
                    }

                    this.setState({
                        displayCanvas: "block",
                    }, () => {
                        backgroundCanvas.className = "backgroundCanvas wallpaperFadeIn";
                    })
                }
            }
        })
    }

    getWallpaper() {
        let tempImageTopics = "";
        for (let i = 0; i < this.state.preferenceData.imageTopics.length; i++) {
            tempImageTopics += this.state.preferenceData.imageTopics[i];
            if (i !== this.state.preferenceData.imageTopics.length - 1) {
                tempImageTopics += ",";
            }
        }
        let imageQuery = this.state.preferenceData.customTopic;

        let tempThis = this;
        let headers = {};
        let url = "https://api.unsplash.com/photos/random?";
        let data = {
            "client_id": clientId,
            "orientation": (device === "iPhone" || device === "Android") ? "portrait" : "landscape",
            "topics": isEmptyString(imageQuery) ? tempImageTopics : "",
            "query": imageQuery,
            "content_filter": "high",
        };

        message.loading("正在获取图片", 0);
        httpRequest(headers, url, data, "GET")
            .then(function (resultData: any) {
                message.destroy();
                message.loading("正在加载图片", 0);
                localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                localStorage.setItem("lastImage", JSON.stringify(resultData));                // 保存请求结果，防抖节流
                tempThis.setWallpaper(resultData);
            })
            .catch(function () {
                message.destroy();
                // 请求失败也更新请求时间，防止超时后无信息可显示
                localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                // 获取图片失败时显示上次图片
                let lastImage: any = localStorage.getItem("lastImage");
                if (lastImage) {
                    lastImage = JSON.parse(lastImage);
                    message.error("获取图片失败，加载历史图片", 0);
                    tempThis.setWallpaper(lastImage);
                } else {
                    message.error("获取图片失败");
                }
            })
            .finally(function () {
            });
    }

    componentDidMount() {
        let tempPreferenceData = localStorage.getItem("preferenceData");

        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }

        this.setState({
            preferenceData: tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData),
        }, () => {
            let noImageMode = this.state.preferenceData.noImageMode;

            if (!noImageMode) {
                // 防抖节流
                let lastRequestTime: any = localStorage.getItem("lastImageRequestTime");
                let nowTimeStamp = new Date().getTime();
                if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                    this.getWallpaper();
                } else if (nowTimeStamp - parseInt(lastRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
                    this.getWallpaper();
                } else {  // 一分钟之内使用上一次请求结果
                    let lastImage: any = localStorage.getItem("lastImage");
                    if (lastImage) {
                        lastImage = JSON.parse(lastImage);
                        this.setWallpaper(lastImage);
                    } else {
                        message.error("获取图片失败");
                    }
                }

                // 图片动画
                // @ts-ignore
                let backgroundImageDiv: HTMLElement = document.getElementById("backgroundImage");
                // @ts-ignore
                let backgroundImage: HTMLElement = backgroundImageDiv.children[0];
                if (backgroundImage instanceof HTMLElement) {
                    backgroundImage.onload = () => {
                        backgroundImage.style.width = "102%";
                        this.setState({
                            display: "block",
                        }, () => {
                            // $("#backgroundCanvas").remove();
                            $("#backgroundCanvas").removeClass("wallpaperFadeIn");
                            $("#backgroundCanvas").addClass("wallpaperFadeOut");
                            message.destroy();
                            message.success("图片加载成功");

                            // 设置动态效果
                            backgroundImage.classList.add("wallpaperFadeIn");
                            setTimeout(() => {
                                backgroundImage.style.transform = "scale(1.05, 1.05)";
                                backgroundImage.style.transition = "5s";

                                setTimeout(() => {
                                    backgroundImageDiv.style.perspective = "500px";
                                    imageDynamicEffect(backgroundImage, this.state.preferenceData.dynamicEffect);
                                }, 5000);
                            }, 2000);
                        })
                    }
                }
            }
        });
    }

    render() {
        return (
            <>
                <Image
                    id={"backgroundImage"}
                    // key={"1"}
                    width={"102%"}
                    height={"102%"}
                    className={"backgroundImage zIndexLow"}
                    preview={false}
                    src={this.state.imageLink}
                    style={{display: this.state.display}}
                />
                <canvas id="backgroundCanvas" style={{display: this.state.displayCanvas}}
                        className={"backgroundCanvas"}/>
            </>
        );
    }
}

export default WallpaperComponent;