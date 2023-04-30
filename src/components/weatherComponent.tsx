import React from "react";
import {Popover, Button} from "antd";
import {device} from "../typescripts/publicConstants";
import {changeThemeColor, getWeatherIcon, httpRequest} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

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

    setWeather(data: any) {
        this.setState({
            weatherIcon: getWeatherIcon(data.weatherData.weather),
            weatherInfo: data.weatherData.weather  + "｜" + data.weatherData.temperature + "°C",
            region: data.region.replace("|", " · "),
            humidity: data.weatherData.humidity,
            pm25: data.weatherData.pm25,
            rainfall: data.weatherData.rainfall + "%",
            visibility: data.weatherData.visibility,
            windInfo: data.weatherData.windDirection + data.weatherData.windPower + "级",
        });
    }

    getWeather() {
        let tempThis = this;
        let headers = {};
        let url = "https://v2.jinrishici.com/info";
        let data = {};
        httpRequest(headers, url, data, "GET")
            .then(function(resultData: any){
                localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                if (resultData.status === "success" && resultData.data.weatherData !== null) {
                    localStorage.setItem("lastWeather", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                    tempThis.setWeather(resultData.data);
                }
            })
            .catch(function(){
                // 请求失败也更新请求时间，防止超时后无信息可显示
                localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            });
    }

    componentDidMount() {
        if (device === "iPhone" || device === "Android") {
            this.setState({
                display: "none",
            })
        }
        else {
            // 防抖节流
            let lastRequestTime: any = localStorage.getItem("lastWeatherRequestTime");
            let nowTimeStamp = new Date().getTime();
            if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                this.getWeather();
            }
            else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
                this.getWeather();
            }
            else {  // 一小时之内使用上一次请求结果
                let lastWeather: any = localStorage.getItem("lastWeather");
                if (lastWeather) {
                    lastWeather = JSON.parse(lastWeather);
                    this.setWeather(lastWeather);
                }
            }
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, ()=>{
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
                        }}
                >
                    {this.state.weatherInfo}
                </Button>
            </Popover>
        );
    }
}

export default WeatherComponent;