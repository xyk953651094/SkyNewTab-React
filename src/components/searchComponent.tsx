import React from "react";
import "../stylesheets/searchComponent.scss"
import "../stylesheets/publicStyles.scss"
import {Avatar, Col, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {fadeIn, fadeOut, getSearchEngineDetail} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    searchValue: string
    displayMask: "none" | "block"
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
            displayMask: "none",
            searchEngineUrl: "https://www.bing.com/search?q=",
            searchEngineIconUrl: "https://www.bing.com/favicon.ico"
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                searchEngineUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineUrl,
                searchEngineIconUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineIconUrl,
            });
        }
    }

    onFocus() {
        fadeIn("#searchMask", 300);
        if (this.state.displayMask !== "block") {
            this.setState({
                displayMask: "block"
            })
        }
    }

    onBlur() {
        fadeOut("#searchMask", 300);
    }

    onPressEnter(e: any) {
        window.open(this.state.searchEngineUrl + e.target.value);
    }

    render() {
        return (
            <Col span={24} className={"alignCenter"}>
                <div
                    id={"searchMask"}
                    className={"searchMask zIndexMiddle"}
                    style={{display: this.state.displayMask}}
                />

                <Input
                    className={"searchInput componentTheme zIndexHigh"}
                    prefix={<Avatar size={"small"} src={this.state.searchEngineIconUrl} alt={"图标"}/>}
                    suffix={<SearchOutlined/>}
                    placeholder={"按下 Enter 键搜索"}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onPressEnter={this.onPressEnter.bind(this)}
                    size={"large"}
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
                {/*    size={"large"}*/}
                {/*    allowClear*/}
                {/*/>*/}
            </Col>
        );
    }
}

export default SearchComponent;