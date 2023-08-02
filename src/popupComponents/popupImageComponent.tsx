import React from "react";
import {Button, Image, message, Space} from "antd";
import {EnvironmentOutlined, InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {getFontColor, isEmptyString} from "../typescripts/publicFunctions";

const btnMaxSize = 35;

type propType = {
    imageData: any,
    fontColor: string
}

type stateType = {
    authorName: string,
    authorLink: string,
    imageLink: string,
    imagePreviewUrl: string,
    imageLocation: string,
    imageDescription: string,
    hoverColor: string,
    fontColor: string,
}

interface PopupImageComponent {
    state: stateType,
    props: propType
}

class PopupImageComponent extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            authorName: "暂无信息",
            authorLink: "",
            imageLink: "",
            imagePreviewUrl: "",
            imageLocation: "暂无信息",
            imageDescription: "暂无信息",
            hoverColor: "#000000",
            fontColor: "#000000"
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

    authorBtnOnClick() {
        if (!isEmptyString(this.state.authorLink)) {
            window.open(this.state.authorLink);
        } else {
            message.error("暂无链接")
        }
    }

    imageBtnOnClick() {
        if (!isEmptyString(this.state.imageLink)) {
            window.open(this.state.imageLink);
        } else {
            message.error("暂无链接")
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                authorName: nextProps.imageData.user.name,
                authorLink: nextProps.imageData.user.links.html,
                imageLink: nextProps.imageData.links.html,
                imagePreviewUrl: nextProps.imageData.urls.thumb,
                imageLocation: isEmptyString(nextProps.imageData.location.name) ? "暂无信息" : nextProps.imageData.location.name,
                imageDescription: isEmptyString(nextProps.imageData.alt_description) ? "暂无信息" : nextProps.imageData.alt_description,
                hoverColor: nextProps.imageData.color
            })
        }

        if (nextProps.fontColor !== prevProps.fontColor) {
            this.setState({
                fontColor: nextProps.fontColor,
            });
        }
    }

    render() {
        return (
            <Space>
                <Image
                    width={200}
                    preview={false}
                    alt={"暂无图片"}
                    src={this.state.imagePreviewUrl}
                    style={{borderRadius: "10px"}}
                />
                <Space direction={"vertical"}>
                    <Button type="text" shape="round" icon={<UserOutlined/>} onMouseOver={this.btnMouseOver.bind(this)}
                            onMouseOut={this.btnMouseOut.bind(this)} onClick={this.authorBtnOnClick.bind(this)}
                            style={{color: this.state.fontColor}}>
                        {this.state.authorName.length < btnMaxSize? this.state.authorName : this.state.authorName.substring(0, btnMaxSize) + "..."}
                    </Button>
                    <Button type="text" shape="round" icon={<EnvironmentOutlined/>}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            onClick={this.imageBtnOnClick.bind(this)} style={{color: this.state.fontColor}}>
                        {this.state.imageLocation.length < btnMaxSize? this.state.imageLocation : this.state.imageLocation.substring(0, btnMaxSize) + "..."}
                    </Button>
                    <Button type="text" shape="round" icon={<InfoCircleOutlined/>}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            onClick={this.imageBtnOnClick.bind(this)} style={{color: this.state.fontColor}}>
                        {this.state.imageDescription.length < btnMaxSize? this.state.imageDescription : this.state.imageDescription.substring(0, btnMaxSize) + "..."}
                    </Button>
                </Space>
            </Space>
        );
    }
}

export default PopupImageComponent;