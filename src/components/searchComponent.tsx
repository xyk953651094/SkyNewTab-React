import React from "react";
import "../stylesheets/searchComponent.scss"
import "../stylesheets/publicStyles.scss"
import {Avatar, Col, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {fadeIn, fadeOut} from "../typescripts/publicFunctions";

type propType = {
    searchEngine: "bing" | "baidu" | "google"
}

type stateType = {
    searchValue: string
    maskDisplay: "none" | "block"
    searchEngineUrl: string,
    searchEngineIconUrl: string,
}

interface SearchComponent {
    state: stateType,
    props: propType
}

class SearchComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: "",
            maskDisplay: "none",
            searchEngineUrl: "https://www.bing.com/search?q=",
            searchEngineIconUrl: "https://www.bing.com/favicon.ico"
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.searchEngine !== prevProps.searchEngine) {
            let tempSearchEngineUrl: string;
            let tempSearchEngineIconUrl: string;
            switch (nextProps.searchEngine) {
                case "baidu":
                    tempSearchEngineUrl = "https://www.baidu.com/s?wd=";
                    tempSearchEngineIconUrl = "https://www.baidu.com/favicon.ico";
                    break;
                case "bing":
                    tempSearchEngineUrl = "https://www.bing.com/search?q=";
                    tempSearchEngineIconUrl = "https://www.bing.com/favicon.ico";
                    break;
                case "brave":
                    tempSearchEngineUrl = "https://search.brave.com/search?q=";
                    tempSearchEngineIconUrl = "https://cdn.search.brave.com/serp/v2/_app/immutable/assets/favicon.c09fe1a1.ico";
                    break;
                case "duckduckgo":
                    tempSearchEngineUrl = "https://duckduckgo.com/?q=";
                    tempSearchEngineIconUrl = "https://duckduckgo.com/favicon.ico";
                    break;
                case "ghostery":
                    tempSearchEngineUrl = "https://ghosterysearch.com/search?q=";
                    tempSearchEngineIconUrl = "https://ghosterysearch.com/favicon.ico";
                    break;
                case "google":
                    tempSearchEngineUrl = "https://www.google.com/search?q=";
                    tempSearchEngineIconUrl = "https://www.google.com/favicon.ico";
                    break;
                case "sogou":
                    tempSearchEngineUrl = "https://www.sogou.com/web?query=";
                    tempSearchEngineIconUrl = "https://www.sogou.com/favicon.ico";
                    break;
                case "startpage":
                    tempSearchEngineUrl = "https://startpage.com/do/search?q=";
                    tempSearchEngineIconUrl = "https://www.startpage.com/sp/cdn/favicons/favicon-32x32--default.png";
                    break;
                case "wuzhuiso":
                    tempSearchEngineUrl = "https://www.wuzhuiso.com/s?ie=utf-8&fr=none&q=";
                    tempSearchEngineIconUrl = "https://www.wuzhuiso.com/favicon.ico";
                    break;
                case "yandex":
                    tempSearchEngineUrl = "https://yandex.com/search/?text=";
                    tempSearchEngineIconUrl = "https://yastatic.net/s3/home-static/_/92/929b10d17990e806734f68758ec917ec.png";
                    break;
                default:
                    tempSearchEngineUrl = "https://www.bing.com/search?q=";
                    tempSearchEngineIconUrl = "https://www.bing.com/favicon.ico";
                    break;
            }
            this.setState({
                searchEngineUrl: tempSearchEngineUrl,
                searchEngineIconUrl: tempSearchEngineIconUrl
            })
        }
    }

    onFocus() {
        fadeIn("#mask", 300);
        if (this.state.maskDisplay !== "block") {
            this.setState({
                maskDisplay: "block"
            })
        }
    }

    onBlur() {
        fadeOut("#mask", 300);
    }

    onPressEnter(e: any) {
        window.location.href = this.state.searchEngineUrl + e.target.value;
    }

    render() {
        return (
            <Col span={24} className={"center"}>
                <div
                    id={"mask"}
                    className={"mask zIndexMiddle"}
                    style={{display: this.state.maskDisplay}}
                />

                <Input
                    className={"searchInput componentTheme zIndexHigh"}
                    prefix={<Avatar size="small" src={this.state.searchEngineIconUrl} alt={"图标"}/>}
                    suffix={<SearchOutlined/>}
                    placeholder="按下 Enter 键搜索"
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onPressEnter={this.onPressEnter.bind(this)}
                    size="large"
                    allowClear
                />
                {/*<Search*/}
                {/*    className={"searchInput zIndexHigh"}*/}
                {/*    prefix={<SearchOutlined />}*/}
                {/*    placeholder="按下 Enter 键搜索"*/}
                {/*    onFocus={this.onFocus.bind(this)}*/}
                {/*    onBlur={this.onBlur.bind(this)}*/}
                {/*    onPressEnter={this.onPressEnter.bind(this)}*/}
                {/*    onSearch={this.onPressEnter.bind(this)}*/}
                {/*    size="large"*/}
                {/*    allowClear*/}
                {/*/>*/}
            </Col>
        );
    }
}

export default SearchComponent;