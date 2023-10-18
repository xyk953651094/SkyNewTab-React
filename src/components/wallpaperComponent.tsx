import React from "react";
import "../stylesheets/wallpaperComponent.scss"
import "../stylesheets/publicStyles.scss"
import {Image, message} from "antd";
import {
    getPreferenceDataStorage,
    getTimeDetails,
    httpRequest,
    imageDynamicEffect,
    isEmptyString
} from "../typescripts/publicFunctions";
import {clientId, device, imageHistoryMaxSize} from "../typescripts/publicConstants";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import {decode} from "blurhash";

const $ = require("jquery");

type propType = {
    getImageData: any,
    getImageHistory: any
}

type stateType = {
    imageData: any,
    preferenceData: PreferenceDataInterface,
    imageLink: string,
    display: "none" | "block",
    displayCanvas: "none" | "block",
    displayMask: "none" | "block",
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
            preferenceData: getPreferenceDataStorage(),
            imageLink: "",
            display: "none",
            displayCanvas: "none",
            displayMask: "none",
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

                // 缓存历史图片
                let lastImageStorage = localStorage.getItem("lastImage"); // 上一张图片
                let imageHistoryStorage = localStorage.getItem("imageHistory");
                let imageHistoryJson = [];
                if(imageHistoryStorage !== null) {
                    imageHistoryJson = JSON.parse(imageHistoryStorage);
                }
                if(lastImageStorage !== null) {
                    let lastImageJson = JSON.parse(lastImageStorage);
                    let imageArrayJsonItem = {
                        index: new Date().getTime(),
                        imageUrl: lastImageJson.urls.regular,
                        imageLink: lastImageJson.links.html
                    };

                    if(imageHistoryJson.length === imageHistoryMaxSize) { // 满了就把第一个删掉
                        imageHistoryJson.shift();
                    }
                    imageHistoryJson.push(imageArrayJsonItem);
                }
                localStorage.setItem("imageHistory", JSON.stringify(imageHistoryJson));
                tempThis.props.getImageHistory(imageHistoryJson);  // 传递给历史图片组件

                // 保存请求时间，防抖节流
                localStorage.setItem("lastImageRequestTime", String(new Date().getTime()));
                localStorage.setItem("lastImage", JSON.stringify(resultData));
                tempThis.setWallpaper(resultData);
            })
            .catch(function () {
                message.destroy();

                // 请求失败时使用上一次请求结果
                let lastImage: any = localStorage.getItem("lastImage");
                if (lastImage) {
                    message.loading("获取图片失败，正在加载缓存图片", 0);
                    lastImage = JSON.parse(lastImage);
                    tempThis.setWallpaper(lastImage);
                } else {
                    message.error("获取图片失败，请检查网络连接");
                }
            })
            .finally(function () {
            });
    }

    componentDidMount() {
        let noImageMode = this.state.preferenceData.noImageMode;
        if (!noImageMode) {
            // 防抖节流
            let lastRequestTime: any = localStorage.getItem("lastImageRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                this.getWallpaper();
            } else if (nowTimeStamp - parseInt(lastRequestTime) > 0) {  // 必须多于切换间隔才能进行新的请求
            // } else if (nowTimeStamp - parseInt(lastRequestTime) > parseInt(this.state.preferenceData.changeImageTime)) {  // 必须多于切换间隔才能进行新的请求
                this.getWallpaper();
            } else {  // 切换间隔内使用上一次请求结果
                let lastImage: any = localStorage.getItem("lastImage");
                if (lastImage) {
                    message.loading("正在加载缓存图片", 0);
                    lastImage = JSON.parse(lastImage);
                    this.setWallpaper(lastImage);
                } else {
                    message.error("无缓存图片可加载，请前往设置手动刷新");
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

                    // 降低亮度与夜间模式
                    let nightMode = this.state.preferenceData.nightMode;
                    let autoDarkMode = this.state.preferenceData.autoDarkMode;
                    let tempDisplayMask = "none";
                    let currentTime = parseInt(getTimeDetails(new Date()).hour);
                    if(currentTime > 18 || currentTime < 6) {
                        if( !nightMode && !autoDarkMode ) {
                            tempDisplayMask = "none";
                        }
                        else {
                            tempDisplayMask = "block";
                        }
                    }
                    else {
                        tempDisplayMask = this.state.preferenceData.nightMode ? "block" : "none";
                    }

                    this.setState({
                        display: "block",
                        displayMask: tempDisplayMask,
                    }, () => {
                        $("#backgroundCanvas").removeClass("wallpaperFadeIn").addClass("wallpaperFadeOut");
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
                <div
                    id={"backgroundMask"}
                    className={"backgroundMask zIndexMiddle"}
                    style={{display: this.state.displayMask}}
                />
            </>
        );
    }
}

export default WallpaperComponent;