import React from "react";
import "../../App.css";
import "../../stylesheets/wallpaper.css"
import "../../stylesheets/publicStyles.css"
import {Image} from "antd";
import {mouseMoveEffect} from "../../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageLink: string,
}

type stateType = {
    imageLink: string,
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
        };
    }

    componentWillMount() {
        this.setState({
            imageLink: this.props.imageLink
        })
        let backgroundImage = document.getElementById('backgroundImage');
        if (backgroundImage instanceof HTMLElement) {
            backgroundImage.onload = function () {
                // 设置动态效果
                if(backgroundImage !== null){
                    backgroundImage.style.transform = 'scale(1.05)';
                    backgroundImage.style.transition = '5s';
                    setTimeout(mouseMoveEffect, 5000);
                }
            }
        }
    }

    // componentDidMount() {
    //     let backgroundImage = document.getElementById('backgroundImage');
    //     if (backgroundImage instanceof HTMLElement) {
    //         backgroundImage.onload = function () {
    //             // 设置动态效果
    //             if(backgroundImage !== null){
    //                 backgroundImage.style.transform = 'scale(1.05)';
    //                 backgroundImage.style.transition = '5s';
    //                 setTimeout(mouseMoveEffect, 5000);
    //             }
    //         }
    //     }
    // }

    render() {
        return (
            <Image
                id="backgroundImage"
                width="102%"
                height="102%"
                className={"backgroundImage zIndexLow"}
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