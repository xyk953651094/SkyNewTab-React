import React from "react";
import {Popover, Button} from "antd";
import {device} from "../../typescripts/publicConstants";
import {getWeatherIcon, changeThemeColor, httpRequest, getTimeDetails} from "../../typescripts/publicFunctions";
import {ThemeColorInterface} from "../../typescripts/publicInterface";
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    display: "none" | "block",
    weatherIcon: string,
    weatherInfo: string,
    region: string;
    humidity: string;
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
            backgroundColor: "",
            fontColor: "",
            display: "block",
            weatherIcon: "",
            weatherInfo: "暂无信息",
            region: "暂无信息",
            humidity: "暂无信息",
            pm25: "暂无信息",
            rainfall: "暂无信息",
            visibility: "暂无信息",
            windInfo: "暂无信息",
        };
    }

    componentDidMount() {
        if (device === "iPhone" || device === "Android") {
            this.setState({
                display: "none",
            })
        }
        else {
            let tempThis = this;
            let url = "https://v2.jinrishici.com/info";
            let data = {};
            httpRequest(url, data, "GET")
                .then(function(resultData: any){
                    if (resultData.status === "success" && resultData.data.weatherData !== null) {
                        tempThis.setState({
                            weatherIcon: getWeatherIcon(resultData.data.weatherData.weather),
                            weatherInfo: resultData.data.weatherData.weather  + "｜"
                                + resultData.data.weatherData.temperature + "°C",
                            region: resultData.data.region.replace("|", " · "),
                            humidity: resultData.data.weatherData.humidity,
                            pm25: resultData.data.weatherData.pm25,
                            rainfall: resultData.data.weatherData.rainfall + "%",
                            visibility: resultData.data.weatherData.visibility,
                            windInfo: resultData.data.weatherData.windDirection + resultData.data.weatherData.windPower + "级",
                        });
                    }
                })
                .catch(function(){});
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            },() => {
                changeThemeColor("#weatherBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }
    }

    render(){
        const popoverContent = (
            <div>
                <p><i className="bi bi-moisture"></i>{" 空气湿度：" + this.state.humidity}</p>
                <p><i className="bi bi-water"></i>{" 空气质量：" + this.state.pm25}</p>
                <p><i className="bi bi-cloud-rain"></i>{" 降雨概率：" + this.state.rainfall}</p>
                <p><i className="bi bi-eye"></i>{" 视线距离：" + this.state.visibility}</p>
                <p><i className="bi bi-wind"></i>{" 风速情况：" + this.state.windInfo}</p>
            </div>
        );

        return (
            <Popover title={this.state.region} content={popoverContent} color={this.state.backgroundColor}>
                <Button shape="round" icon={<i className={this.state.weatherIcon}> </i>} size={"large"}
                        id={"weatherBtn"}
                        className={"componentTheme zIndexHigh"}
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