import React from "react";
import "../../App.css";
import "../../stylesheets/wallpaper.css"
import "../../stylesheets/publicStyles.css"
import {Image} from "antd";
import {fadeIn, mouseMoveEffect} from "../../typescripts/publicFunctions";
import {isBlurhashValid, decode} from "blurhash";

type propType = {
    display: "none" | "block",
    imageLink: string,
    // imageData: any
}

type stateType = {
    // imageLink: string,
    // blurHash: string,
    // width: number,
    // height: number,
}

interface WallpaperComponent {
    state: stateType,
    props: propType
}

class WallpaperComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            // imageLink: "",
            // blurHash: "",
            // width: 0,
            // height: 0,
        };
    }

    componentWillMount() {}

    componentDidMount() {
        // @ts-ignore
        let backgroundImage: HTMLElement = document.getElementById("backgroundImage").children[0];

        if (backgroundImage instanceof HTMLElement) {
            backgroundImage.onload = function () {
                // 设置动态效果
                // backgroundImage.className = "backgroundImage zIndexLow wallpaplerFadeIn";
                fadeIn("#backgroundImage", 3000);
                backgroundImage.style.transform = "scale(1.05)";
                backgroundImage.style.transition = "5s";
                setTimeout(mouseMoveEffect, 5000);
            }
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            // this.setState({
            //     imageLink: this.props.imageData.urls.regular,
            //     blurHash: this.props.imageData.blur_hash,
            //     width: this.props.imageData.width,
            //     height: this.props.imageData.height,
            // }, () => {
            //     // if(isBlurhashValid(this.state.blurHash)) {
            //     //     const pixels = decode(this.state.blurHash, this.state.width, this.state.height);
            //     //     const canvas = document.createElement("canvas");
            //     //     const ctx = canvas.getContext("2d");
            //     //     // @ts-ignore
            //     //     const imageData = ctx.createImageData(this.state.width, this.state.height);
            //     //     imageData.data.set(pixels);
            //     //     // @ts-ignore
            //     //     ctx.putImageData(imageData, 0, 0);
            //     //     document.body.append(canvas);
            //     // }
            // });
        }
    }

    render() {
        return (
            <Image
                id="backgroundImage"
                key="1"
                width="102%"
                height="102%"
                className={"backgroundImage zIndexLow fadeIn"}
                preview={false}
                src={this.props.imageLink}
                style={{display: this.props.display}}
                placeholder={
                    <Image
                        width="102%"
                        height="102%"
                        preview={false}
                        src=""
                    />
                }
            />
        );
    }
}

export default WallpaperComponent;