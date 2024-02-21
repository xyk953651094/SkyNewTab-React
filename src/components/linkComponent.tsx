import React from "react";
import {Button, message} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../typescripts/publicConstants";
import {changeThemeColor, getSearchEngineDetail, isEmpty} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"

type propType = {
    display: "none" | "block",
    themeColor: ThemeColorInterface,
    imageData: any,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    imageLink: string,
}

interface LinkComponent {
    state: stateType,
    props: propType
}

class LinkComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            fontColor: "",
            imageLink: "",
        };
    }

    authorLiteOnClick() {
        if (!isEmpty(this.state.imageLink)) {
            window.open(this.state.imageLink + unsplashUrl, "_self");
        } else {
            message.error("无跳转链接");
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            });
        }

        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                imageLink: nextProps.imageData.links.html,
            }, () => {
                changeThemeColor("#authorLiteBtn", this.state.backgroundColor, this.state.fontColor);
            })
        }
    }

    render() {
        return (
            <Button shape={this.props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                    icon={<LinkOutlined/>} size={"large"}
                    id={"authorLiteBtn"} onClick={this.authorLiteOnClick.bind(this)}
                    className={"componentTheme zIndexHigh"}
                    style={{
                        display: this.props.display,
                    }}
            />
        );
    }
}

export default LinkComponent;