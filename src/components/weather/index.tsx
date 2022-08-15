import React from "react";
import "../../App.css";
import {Button, message, Tooltip} from "antd";
import {getFontColor} from "../../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageColor: string,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    weather: string,
    temperature: string,
    AQI: string,
    display: "none" | "block",
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
            weather: "",
            temperature: "",
            AQI: "",
            display: "none",
        };
    }

    componentDidMount() {
        let currentLanguage = window.navigator.language.split("-")[0]; // 获取当前浏览器使用的语言

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) =>{
                let key = "a95ea50455114671aa8d33a217f6a5a7";
                let location = position.coords.longitude.toString() + "," + position.coords.latitude.toString();
                let lang = currentLanguage;
                let tempThis = this;

                // 获取温度与天气状况
                let weatherXHR=new XMLHttpRequest();
                weatherXHR.open("GET","https://devapi.qweather.com/v7/weather/now?key=" + key + "&location=" + location + "&lang=" + lang);
                weatherXHR.onload=function(){
                    if(weatherXHR.status===200){
                        let weatherData=JSON.parse(weatherXHR.responseText);
                        tempThis.setState({
                            weather: weatherData.now.text,
                            temperature: weatherData.now.temp + "°C",
                            display: "block",
                        });
                    }else{
                        // message.error("无法获取天气状况");
                    }
                }
                weatherXHR.onerror=function(){
                    // message.error("无法获取天气状况");
                }
                weatherXHR.send();

                // 获取空气质量
                let airXHR=new XMLHttpRequest();
                airXHR.open("GET","https://devapi.qweather.com/v7/air/now?key=" + key + "&location=" + location + "&lang=" + lang);
                airXHR.onload=function(){
                    if(airXHR.status===200){
                        let airData=JSON.parse(airXHR.responseText);
                        tempThis.setState({
                            AQI: "AQI: " + airData.now.aqi,
                            display: "block",
                        });
                    }else{
                       // message.error("无法获取空气质量");
                    }
                }
                airXHR.onerror=function(){
                    // message.error("无法获取空气质量");
                }
                airXHR.send();
            });
        } else {
            // message.error("无法获取定位");
        }

        if (this.props.display === "none") {
            this.setState({
                display: "none",
            })
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            this.setState({
                backgroundColor: nextProps.imageColor,
            }, () => {
                this.setState({
                    fontColor: getFontColor(this.state.backgroundColor),
                })
            })
        }
    }

    handleClick() {
        window.open("https://www.qweather.com");
    }

    render(){
        return (
            <Tooltip title="前往和风天气">
                <Button shape="round" onClick={this.handleClick.bind(this)} size={"large"}
                        id={"weatherBtn"}
                        className={"frostedGlass"}
                        style={{
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.fontColor,
                        }}
                >
                    {this.state.weather + " " + this.state.temperature + " ｜ " + this.state.AQI}
                </Button>
            </Tooltip>
        );
    }
}

export default WeatherComponent;