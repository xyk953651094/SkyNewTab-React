import React from "react";
import {Button, message} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {unsplashUrl} from "../typescripts/publicConstants";
import {changeThemeColor, getSearchEngineDetail, isEmptyString} from "../typescripts/publicFunctions";
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
    searchEngineUrl: string,
    buttonShape: "circle" | "default" | "round" | undefined,
    imageLink: string,
}

interface AuthorLiteComponent {
    state: stateType,
    props: propType
}

class AuthorLiteComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            fontColor: "",
            searchEngineUrl: "https://www.bing.com/search?q=",
            buttonShape: "round",
            imageLink: "",
        };
    }

    authorLiteOnClick() {
        if (!isEmptyString(this.state.imageLink)) {
            window.open(this.state.imageLink + unsplashUrl, "_blank");
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

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                searchEngineUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineUrl,
                buttonShape: nextProps.preferenceData.buttonShape === "round" ? "circle" : "default"
            });
        }
    }

    render() {
        return (
            <Button shape={this.state.buttonShape} icon={<LinkOutlined/>} size={"large"}
                    id={"authorLiteBtn"} onClick={this.authorLiteOnClick.bind(this)}
                    className={"componentTheme zIndexHigh"}
                    style={{
                        display: this.props.display,
                        cursor: "default"
                    }}
            />
        );
    }
}

export default AuthorLiteComponent;