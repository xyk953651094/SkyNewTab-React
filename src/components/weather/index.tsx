import React from "react";
import "../../App.css";
import {Button, Tooltip} from "antd";
import {changeThemeColor} from "../../typescripts/publicFunctions";

type propType = {
    imageColor: string,
}

type stateType = {
    display: "none" | "block",
    backgroundColor: string,
    fontColor: string,
    weatherInfo: string,
    weatherDetail: string
}

interface WeatherComponent {
    state: stateType,
    props: propType
}

class WeatherComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            display: "none",
            backgroundColor: "",
            fontColor: "",
            weatherInfo: "暂无天气信息",
            weatherDetail: "暂无天气信息"
        };
    }

    componentWillMount() {
        let tempThis = this;
        let weatherXHR  =new XMLHttpRequest();
        weatherXHR.open("GET","https://v2.jinrishici.com/info");
        weatherXHR.onload = function(){
            if(weatherXHR.status === 200){
                let result = JSON.parse(weatherXHR.responseText);

                if (result.status === 'success') {
                    tempThis.setState({
                        display: "block",
                        weatherInfo: result.data.weatherData.weather  + " ｜ "
                            + result.data.weatherData.temperature + "°C",
                        weatherDetail:
                            result.data.region.split("|")[1] + " ｜ " +
                            result.data.weatherData.weather  + " ｜ " +
                            result.data.weatherData.windDirection  + " ｜ " +
                            result.data.weatherData.temperature + "°C",
                    });
                }
                else {}
            }
            else{}
        }
        weatherXHR.onerror=function(){}
        weatherXHR.send();
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#weatherBtn", nextProps.imageColor);
        }
    }

    render(){
        return (
            <Tooltip title={this.state.weatherDetail}>
                <Button shape="round" size={"large"}
                        id={"weatherBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            display: this.state.display,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.fontColor,
                            cursor: "default"
                        }}
                >
                    {this.state.weatherInfo}
                </Button>
            </Tooltip>
        );
    }
}

export default WeatherComponent;