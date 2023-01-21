import React from "react";
import {Popover, Button} from "antd";
import {EnvironmentOutlined, EyeOutlined} from "@ant-design/icons";
import {changeThemeColor} from "../../typescripts/publicFunctions";
import {ThemeColorInterface} from "../../typescripts/publicInterface";
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
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
            backgroundColor: "",
            fontColor: "",
            display: "none",
            weatherInfo: "暂无天气信息",
            region: "暂无地区信息",
            pm25: "暂无PM2.5信息",
            rainfall: "暂无降雨信息",
            visibility: "暂无视距信息",
            windInfo: "暂无风况信息",
        };
    }

    componentDidMount() {
        $.ajax({
            url: "https://v2.jinrishici.com/info",
            type: "GET",
            timeout: 10000,
            success: (resultData: any) => {
                if (resultData.status === "success" && resultData.data.weatherData !== null) {
                    this.setState({
                        display: "block",
                        weatherInfo: resultData.data.weatherData.weather  + "｜"
                            + resultData.data.weatherData.temperature + "°C",
                        region:  resultData.data.region.replace("|", " · "),
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
                <p><i className="bi bi-water"></i>{" 空气质量：" + this.state.pm25}</p>
                <p><i className="bi bi-cloud-rain"></i>{" 降雨概率：" + this.state.rainfall}</p>
                <p><i className="bi bi-eye"></i>{" 视线距离：" + this.state.visibility}</p>
                <p><i className="bi bi-wind"></i>{" 风速情况：" + this.state.windInfo}</p>
            </div>
        );

        return (
            <Popover title={<p><EnvironmentOutlined />{" " + this.state.region}</p>} content={popoverContent} color={this.state.backgroundColor}>
                <Button shape="round" size={"large"}
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