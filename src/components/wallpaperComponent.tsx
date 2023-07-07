import React from "react";
import "../stylesheets/wallpaperComponent.scss"
import "../stylesheets/publicStyles.scss"
import {Image} from "antd";
import {imageDynamicEffect} from "../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageData: any,
    dynamicEffect: "all" | "rotate" | "translate" | "close",
    imageQuality: "full" | "regular" | "small",
}

type stateType = {
    imageLink: string,
    loadImageLink: string,
    display: "none" | "block",
}

interface WallpaperComponent {
    state: stateType,
    props: propType
}

class WallpaperComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imageLink: "",
            loadImageLink: "",
            display: "none",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        // @ts-ignore
        let backgroundImageDiv: HTMLElement = document.getElementById("backgroundImage");
        // @ts-ignore
        let backgroundImage: HTMLElement = backgroundImageDiv.children[0];

        if (nextProps.display !== prevProps.display) {
            if(nextProps.display === "block") {
                if (backgroundImage instanceof HTMLElement) {
                    backgroundImage.onload = () => {
                        this.setState({
                            display: "block",
                        }, () => {
                            // 设置动态效果
                            backgroundImage.className = "backgroundImage zIndexLow wallpaperFadeIn";
                            setTimeout(() => {
                                backgroundImage.style.transform = "scale(1.05, 1.05)";
                                backgroundImage.style.transition = "5s";
                            }, 2000);
                            setTimeout(() => {
                                backgroundImageDiv.style.perspective = "500px";
                                imageDynamicEffect(backgroundImage, this.props.dynamicEffect);
                            }, 7000);
                        })
                    }
                }
            }
        }

        // 鼠标移动效果
        if(nextProps.dynamicEffect !== this.props.dynamicEffect) {
            imageDynamicEffect(backgroundImage, nextProps.dynamicEffect);
        }

        // 图片质量
        if (nextProps.imageData !== prevProps.imageData && nextProps.imageData) {
            switch (this.props.imageQuality){
                case "full":
                    this.setState({
                        imageLink: nextProps.imageData.urls.full,
                        loadImageLink: nextProps.imageData.urls.small,
                    });
                    break;
                case "regular":
                    this.setState({
                        imageLink: nextProps.imageData.urls.regular,
                        loadImageLink: nextProps.imageData.urls.small,
                    });
                    break;
                case "small":
                    this.setState({
                        imageLink: nextProps.imageData.urls.regular,
                        loadImageLink: nextProps.imageData.urls.small,
                    });
                    break;
                default:
                    this.setState({
                        imageLink: this.props.imageData.urls.regular,
                        loadImageLink: this.props.imageData.urls.small,
                    });
                    break;
            }
        }
    }

    render() {
        return (
            <Image
                id="backgroundImage"
                key="1"
                width="102%"
                height="102%"
                className={"backgroundImage zIndexLow"}
                preview={false}
                src={this.state.imageLink}
                style={{display: this.state.display}}
                placeholder={
                    <Image
                        width="102%"
                        height="102%"
                        className={"backgroundImage zIndexLow"}
                        preview={false}
                        // src={this.state.loadImageLink}
                        style={{filter: "blur(5px)"}}
                    />
                }
            />
        );
    }
}

export default WallpaperComponent;