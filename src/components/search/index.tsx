import React from "react";
import "../../stylesheets/search.css"
import "../../stylesheets/publicStyles.css"
import { Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {fadeIn, fadeOut} from "../../typescripts/publicFunctions";

type propType = {}

type stateType = {
    searchValue: string
    maskDisplay: "none" | "block"
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
            maskDisplay: "none"
        };
    }

    componentDidMount() {

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
        window.location.href = "https://www.bing.com/search?q=" + e.target.value;
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