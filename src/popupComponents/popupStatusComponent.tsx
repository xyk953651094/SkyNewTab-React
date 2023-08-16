import React from "react";
import {Button, Space} from "antd";
import {CalendarOutlined, CameraOutlined, CheckSquareOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {
    getFontColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getWeatherIcon,
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    imageData: string,
    fontColor: any,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    greetIcon: string,
    greetContent: string,
    weatherIcon: string,
    weatherContent: string,
    dailyAmount: number,
    todoAmount: number,
    hoverColor: string,
    fontColor: string,
    searchEngineUrl: string,
    simpleMode: boolean,
}

interface PopupImageComponent {
    state: stateType,
    props: propType
}

class PopupImageComponent extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            greetIcon: getGreetIcon(),
            greetContent: getGreetContent(),
            weatherIcon: "",
            weatherContent: "暂无信息",
            dailyAmount: 0,
            todoAmount: 0,
            hoverColor: "#000000",
            fontColor: "#000000",
            searchEngineUrl: "https://www.bing.com/search?q=",
            simpleMode: false,
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

    greetBtnOnClick() {
        window.open(this.state.searchEngineUrl + "万年历", "_blank");
    }

    weatherBtnOnClick() {
        window.open(this.state.searchEngineUrl + "天气", "_blank",);
    }

    setHoliday(data: any) {
        let holidayContent = data.solarTerms;
        if (data.solarTerms.indexOf("后") === -1) {
            holidayContent = "今日" + holidayContent;
        }
        if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
            holidayContent = holidayContent + " · " + data.typeDes;
        }
        return holidayContent;
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                hoverColor: nextProps.imageData.color,
            });
        }

        if (nextProps.fontColor !== prevProps.fontColor) {
            this.setState({
                fontColor: nextProps.fontColor,
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                searchEngineUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineUrl,
                simpleMode: nextProps.preferenceData.simpleMode
            });
        }
    }

    componentDidMount() {
        let tempGreet = localStorage.getItem("lastHoliday");
        let tempWeather = localStorage.getItem("lastWeather");
        let tempDaily = localStorage.getItem("daily");
        let tempTodos = localStorage.getItem("todos");

        this.setState({
            greetContent: tempGreet ? getGreetContent() + "｜" + this.setHoliday(JSON.parse(tempGreet)) : "暂无信息",
            weatherIcon: tempWeather ? getWeatherIcon(JSON.parse(tempWeather).weatherData.weather) : "",
            weatherContent: tempWeather ? JSON.parse(tempWeather).weatherData.weather + "｜" + JSON.parse(tempWeather).weatherData.temperature + "°C" : "暂无信息",
            dailyAmount: tempDaily ? JSON.parse(tempDaily).length : 0,
            todoAmount: tempTodos ? JSON.parse(tempTodos).length : 0,
        })
    }

    render() {
        return (
            <>
                <Space style={{display: this.state.simpleMode ? "none" : "inline-flex"}}>
                    <Button type={"text"} shape={"round"} icon={<i className={this.state.greetIcon}> </i>}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            onClick={this.greetBtnOnClick.bind(this)}
                            style={{color: this.state.fontColor}}>
                        {this.state.greetContent}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<i className={this.state.weatherIcon}> </i>}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            onClick={this.weatherBtnOnClick.bind(this)}
                            style={{color: this.state.fontColor}}>
                        {this.state.weatherContent}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<CalendarOutlined/>}
                            onMouseOver={this.btnMouseOver.bind(this)}
                            onMouseOut={this.btnMouseOut.bind(this)}
                            style={{color: this.state.fontColor, cursor: "default"}}>
                        {"倒数日：" + this.state.dailyAmount + " 个"}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<CheckSquareOutlined/>}
                            onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                            style={{color: this.state.fontColor, cursor: "default"}}>
                        {"待办事项：" + this.state.todoAmount + " 个"}
                    </Button>
                </Space>
                <Button type={"text"} shape={"round"} icon={<CameraOutlined/>}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.state.fontColor, cursor: "default", display: this.state.simpleMode ? "inline-block" : "none"}}>
                    {"已开启简洁模式"}
                </Button>
            </>
        );
    }
}

export default PopupImageComponent;