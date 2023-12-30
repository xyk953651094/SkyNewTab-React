import React from "react";
import "../stylesheets/searchComponent.scss"
import "../stylesheets/publicStyles.scss"
import {Button, Col, Divider, Input, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {changeThemeColor, fadeIn, fadeOut, getSearchEngineDetail} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";

type propType = {
    themeColor: ThemeColorInterface,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    display: "none" | "inline-flex",
    backgroundColor: string,
    fontColor: string,
    searchValue: string
    displayMask: "none" | "block",
    searchEngineName: string,
    searchEngineValue: string,
    searchEngineUrl: string,
    borderRadius: string,
}

interface SearchComponent {
    state: stateType,
    props: propType
}

class SearchComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            display: "inline-flex",
            backgroundColor: "",
            fontColor: "",
            searchValue: "",
            displayMask: "none",
            searchEngineName: "必应",
            searchEngineValue: "bing",
            searchEngineUrl: "https://www.bing.com/search?q=",
            borderRadius: "20px"
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, () => {
                changeThemeColor("#searchEngineIconBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            let searchEngineDetail = getSearchEngineDetail(nextProps.preferenceData.searchEngine);
            this.setState({
                display: nextProps.preferenceData.simpleMode ? "none" : "inline-flex",
                searchEngineName: searchEngineDetail.searchEngineName,
                searchEngineValue: searchEngineDetail.searchEngineValue,
                searchEngineUrl: searchEngineDetail.searchEngineUrl,
                borderRadius: nextProps.preferenceData.buttonShape === "round" ? "20px" : ""
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
        window.open(this.state.searchEngineUrl + e.target.value, "_blank");
    }

    changeSearchEngine() {
        const searchEngines = ["bing", "google"];
        let currentIndex = searchEngines.indexOf(this.state.searchEngineValue);
        let nextIndex = 0;
        if (currentIndex !== searchEngines.length - 1) {
            nextIndex = currentIndex + 1;
        }
        let searchEngineDetail = getSearchEngineDetail(searchEngines[nextIndex]);
        this.setState({
            searchEngineName: searchEngineDetail.searchEngineName,
            searchEngineValue: searchEngineDetail.searchEngineValue,
            searchEngineUrl: searchEngineDetail.searchEngineUrl,
        })
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
                    prefix={
                        <Row align={"middle"}>
                            <Button type={"text"} shape={this.props.preferenceData.buttonShape} size={"small"}
                                    icon={<i className={"bi bi-" + this.state.searchEngineValue}></i>}
                                    id={"searchEngineIconBtn"} onClick={this.changeSearchEngine.bind(this)}>
                                {this.state.searchEngineName}
                            </Button>
                            <Divider type="vertical"/>
                        </Row>
                    }
                    suffix={<SearchOutlined/>}
                    placeholder={"按下 Enter 键搜索"}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onPressEnter={this.onPressEnter.bind(this)}
                    size={"large"}
                    allowClear
                    style={{
                        borderRadius: this.state.borderRadius,
                        display: this.state.display
                    }}
                />
            </Col>
        );
    }
}

export default SearchComponent;