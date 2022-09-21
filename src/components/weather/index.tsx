import React from "react";
import "../../App.css";
import {Popover, Button} from "antd";
import {changeThemeColor, getThemeColor} from "../../typescripts/publicFunctions";
const $ = require("jquery");

type propType = {
    themeColor: string
}

type stateType = {
    display: "none" | "block",
    weatherInfo: string,
    region: string;
    pm25: string;
    rainfall: string;
    visibility: string;
    windInfo: string;
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
            weatherInfo: "暂无天气信息",
            region: "",
            pm25: "",
            rainfall: "",
            visibility: "",
            windInfo: "",
        };
    }

    componentWillMount() {
        $.ajax({
            url: "https://v2.jinrishici.com/info",
            type: "GET",
            timeout: 5000,
            success: (resultData: any) => {
                if (resultData.status === "success") {
                    this.setState({
                        display: "block",
                        weatherInfo: resultData.data.weatherData.weather  + " ｜ "
                            + resultData.data.weatherData.temperature + "°C",
                        region:  resultData.data.region.replace("|", "｜"),
                        pm25:  resultData.data.weatherData.pm25,
                        rainfall:  resultData.data.weatherData.rainfall + "%",
                        visibility:  resultData.data.weatherData.visibility,
                        windInfo:  resultData.data.weatherData.windDirection + resultData.data.weatherData.windPower + "级",
                    });
                }
                else {
                    this.setState({
                        display: "none",
                    });
                }
            },
            error: function () {}
        });
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#weatherBtn", nextProps.themeColor);
        }
    }

    render(){
        const popoverContent = (
            <div>
                <p>{"空气：" + this.state.pm25}</p>
                <p>{"降雨：" + this.state.rainfall}</p>
                <p>{"视距：" + this.state.visibility}</p>
                <p>{"风况：" + this.state.windInfo}</p>
            </div>
        );

        return (
            <Popover title={this.state.region} content={popoverContent}>
                <Button shape="round" size={"large"}
                        id={"weatherBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            display: this.state.display,
                            cursor: "default"
                        }}
                >
                    {this.state.weatherInfo}
                </Button>
            </Popover>
        );
    }
}

export default WeatherComponent;