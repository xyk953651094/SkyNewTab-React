import React from "react";
import {Button, Space} from "antd";
import {CalendarOutlined, CheckSquareOutlined, InfoCircleOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {
    btnMouseOut,
    btnMouseOver,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getWeatherIcon,
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    imageData: string,
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    greetIcon: string,
    greetContent: string,
    weatherIcon: string,
    weatherContent: string,
    dailySize: number,
    todoSize: number,
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
            dailySize: 0,
            todoSize: 0,
            searchEngineUrl: "https://www.bing.com/search?q=",
            simpleMode: false,
        }
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
            greetContent: tempGreet ? getGreetContent() + " ｜ " + this.setHoliday(JSON.parse(tempGreet)) : "暂无信息",
            weatherIcon: tempWeather ? getWeatherIcon(JSON.parse(tempWeather).weatherData.weather) : "",
            weatherContent: tempWeather ? JSON.parse(tempWeather).weatherData.weather + " ｜ " + JSON.parse(tempWeather).weatherData.temperature + "°C" : "暂无信息",
            dailySize: tempDaily ? JSON.parse(tempDaily).length : 0,
            todoSize: tempTodos ? JSON.parse(tempTodos).length : 0,
        })
    }

    render() {
        return (
            <>
                <Space style={{display: this.state.simpleMode ? "none" : "inline-flex"}}>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                            icon={<i className={this.state.greetIcon}> </i>}
                            onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                            onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                            onClick={this.greetBtnOnClick.bind(this)}
                            style={{color: this.props.fontColor}}>
                        {this.state.greetContent}
                    </Button>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                            icon={<i className={this.state.weatherIcon}> </i>}
                            onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                            onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                            onClick={this.weatherBtnOnClick.bind(this)}
                            style={{color: this.props.fontColor}}>
                        {this.state.weatherContent}
                    </Button>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CalendarOutlined/>}
                            onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                            onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                            style={{color: this.props.fontColor, cursor: "default"}}>
                        {this.state.dailySize + " 个倒数日"}
                    </Button>
                    <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CheckSquareOutlined/>}
                            onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                            onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                            style={{color: this.props.fontColor, cursor: "default"}}>
                        {this.state.todoSize + " 个待办事项"}
                    </Button>
                </Space>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<InfoCircleOutlined/>}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{
                            color: this.props.fontColor,
                            cursor: "default",
                            display: this.state.simpleMode ? "inline-block" : "none"
                        }}>
                    {"已开启简洁模式"}
                </Button>
            </>
        );
    }
}

export default PopupImageComponent;