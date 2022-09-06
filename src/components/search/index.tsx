import React from "react";
import "../../App.css";
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
        // let mask: any = document.getElementById("mask");
        // mask.className = "mask zIndexMiddle maskFadeIn";
        fadeIn("#mask", 300);
        this.setState({
            maskDisplay: "block"
        })
    }

    onBlur() {
        // let mask: any = document.getElementById("mask");
        // mask.className = "mask zIndexMiddle maskFadeOut";
        fadeOut("#mask", 300);
        // this.setState({
        //     maskDisplay: "none"
        // })
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