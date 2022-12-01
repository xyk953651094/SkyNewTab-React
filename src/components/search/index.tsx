import React from "react";
import "../../stylesheets/search.css"
import "../../stylesheets/publicStyles.css"
import { Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {changeThemeColor, fadeIn, fadeOut, getFontColor} from "../../typescripts/publicFunctions";

type propType = {
    searchEngine: "bing" | "baidu" | "google"
}

type stateType = {
    searchValue: string
    maskDisplay: "none" | "block"
    searchEngineUrl: string,
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
            searchEngineUrl: "https://www.bing.com/search?q="
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.searchEngine !== prevProps.searchEngine) {
            let tempSearchEngineUrl: string;
            switch (nextProps.searchEngine) {
                case "bing": tempSearchEngineUrl = "https://www.bing.com/search?q="; break;
                case "baidu": tempSearchEngineUrl = "https://www.baidu.com/s?wd="; break;
                case "google": tempSearchEngineUrl = "https://www.google.com/search?q="; break;
                default: tempSearchEngineUrl = "https://www.bing.com/search?q="; break;
            }
            this.setState({
                searchEngineUrl: tempSearchEngineUrl
            })
        }
    }

    onFocus() {
        fadeIn("#mask", 300);
        if(this.state.maskDisplay !=="block"){
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

    render(){
        return (
            <Row>
                <div
                    id={"mask"}
                    className={"mask zIndexMiddle"}
                    style={{display:this.state.maskDisplay}}
                />
                <Input
                    className={"searchInput zIndexHigh"}
                    prefix={<SearchOutlined />}
                    placeholder="按下 Enter 键搜索"
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onPressEnter={this.onPressEnter.bind(this)}
                    size="large" />
            </Row>
        );
    }
}

export default SearchComponent;