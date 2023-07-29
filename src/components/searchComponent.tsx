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
                case "bing":
                    tempSearchEngineUrl = "https://www.bing.com/search?q=";
                    tempSearchEngineIconUrl = "https://www.bing.com/favicon.ico";
                    break;
                case "baidu":
                    tempSearchEngineUrl = "https://www.baidu.com/s?wd=";
                    tempSearchEngineIconUrl = "https://www.baidu.com/favicon.ico";
                    break;
                case "google":
                    tempSearchEngineUrl = "https://www.google.com/search?q=";
                    tempSearchEngineIconUrl = "https://www.google.com/favicon.ico";
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
                    prefix={<Avatar size="small" src={this.state.searchEngineIconUrl}/>}
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