import React from "react";
import "../stylesheets/wallpaperComponent.scss"
import "../stylesheets/publicStyles.scss"
import {Image} from "antd";
import {imageDynamicEffect} from "../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageData: any,
    dynamicEffect: "close" | "translate" | "rotate" | "all",
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

        // 图片质量
        if (nextProps.imageData !== prevProps.imageData && nextProps.imageData) {
            this.setState({
                imageLink: nextProps.imageData.displayUrl,
                loadImageLink: nextProps.imageData.previewUrl,
            });
        }

        // 鼠标移动效果
        if(nextProps.dynamicEffect !== prevProps.dynamicEffect) {
            imageDynamicEffect(backgroundImage, nextProps.dynamicEffect);
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