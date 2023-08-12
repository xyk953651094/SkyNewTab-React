import React from "react";
import {Button, Space} from "antd";
import {CalendarOutlined, CheckSquareOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {getFontColor, getGreetContent, getGreetIcon, getWeatherIcon,} from "../typescripts/publicFunctions";

type propType = {
    imageData: string
    fontColor: any
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
            <Space>
                <Button type={"text"} shape={"round"} icon={<i className={this.state.greetIcon}> </i>}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.state.fontColor, cursor: "default"}}>
                    {this.state.greetContent}
                </Button>
                <Button type={"text"} shape={"round"} icon={<i className={this.state.weatherIcon}> </i>}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.state.fontColor, cursor: "default"}}>
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
        );
    }
}

export default PopupImageComponent;