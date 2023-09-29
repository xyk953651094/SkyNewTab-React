import React from "react";
import {Button, Col, List, message, Popover, Row, Space, Typography} from "antd";
import {
    changeThemeColor,
    getFontColor,
    getSearchEngineDetail,
    getWeatherIcon,
    httpRequest
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import {EnvironmentOutlined, InfoCircleOutlined} from "@ant-design/icons";

const {Text} = Typography;

type propType = {
    themeColor: ThemeColorInterface,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    display: "none" | "block",
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    weatherIcon: string,
    weatherInfo: string,
    searchEngineUrl: string,
    location: string,
    humidity: string,
    pm25: string,
    rainfall: string,
    visibility: string,
    windInfo: string,
}

interface WeatherComponent {
    state: stateType,
    props: propType
}

class WeatherComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            display: "block",
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            weatherIcon: "",
            weatherInfo: "暂无信息",
            searchEngineUrl: "https://www.bing.com/search?q=",
            location: "暂无信息",
            humidity: "暂无信息",
            pm25: "暂无信息",
            rainfall: "暂无信息",
            visibility: "暂无信息",
            windInfo: "暂无信息",
        };
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.state.hoverColor;
        e.currentTarget.style.color = getFontColor(this.state.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.state.fontColor;
    }

    locationBtnOnClick() {
        if (this.state.location !== "暂无信息") {
            window.open(this.state.searchEngineUrl + this.state.location, "_blank");
        } else {
            message.error("无跳转链接");
        }
    }

    infoBtnOnClick() {
        window.open(this.state.searchEngineUrl + "天气", "_blank");
    }

    setWeather(data: any) {
        this.setState({
            weatherIcon: getWeatherIcon(data.weatherData.weather),
            weatherInfo: data.weatherData.weather + "｜" + data.weatherData.temperature + "°C",
            location: data.region.replace("|", " · "),
            humidity: data.weatherData.humidity,
            pm25: data.weatherData.pm25,
            rainfall: data.weatherData.rainfall + "%",
            visibility: data.weatherData.visibility,
            windInfo: data.weatherData.windDirection + " " + data.weatherData.windPower + " 级",
        });
    }

    getWeather() {
        let tempThis = this;
        let headers = {};
        let url = "https://v2.jinrishici.com/info";
        let data = {};
        httpRequest(headers, url, data, "GET")
            .then(function (resultData: any) {
                localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                if (resultData.status === "success" && resultData.data.weatherData !== null) {
                    localStorage.setItem("lastWeather", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                    tempThis.setWeather(resultData.data);
                }
            })
            .catch(function () {
                // 请求失败也更新请求时间，防止超时后无信息可显示
                localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            });
    }

    componentDidMount() {
        if (!this.props.preferenceData.simpleMode) {
            // 防抖节流
            let lastRequestTime: any = localStorage.getItem("lastWeatherRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                this.getWeather();
            } else if (nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
                this.getWeather();
            } else {  // 一小时之内使用上一次请求结果
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
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, () => {
                changeThemeColor("#weatherBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                display: nextProps.preferenceData.simpleMode ? "none" : "block",
                searchEngineUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineUrl,
            });
        }
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={10}>
                    <Text style={{color: this.state.fontColor}}>{"天气信息"}</Text>
                </Col>
                <Col span={14} style={{textAlign: "right"}}>
                    <Space>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<InfoCircleOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                onClick={this.infoBtnOnClick.bind(this)}
                                style={{color: this.state.fontColor}}>
                            {"更多信息"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List>
                <List.Item>
                    <Space direction={"vertical"}>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<EnvironmentOutlined/>}
                                        onMouseOver={this.btnMouseOver.bind(this)}
                                        onMouseOut={this.btnMouseOut.bind(this)}
                                        onClick={this.locationBtnOnClick.bind(this)}
                                        style={{color: this.state.fontColor}}>
                                    {" 地理位置：" + this.state.location}
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<i className="bi bi-wind"></i>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                                    {" 风速情况：" + this.state.windInfo}
                                </Button>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<i className="bi bi-moisture"></i>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                                    {" 空气湿度：" + this.state.humidity + "%"}
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<i className="bi bi-water"></i>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                                    {" 空气质量：" + this.state.pm25}
                                </Button>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<i className="bi bi-cloud-rain"></i>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                                    {" 降雨概率：" + this.state.rainfall}
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<i className="bi bi-eye"></i>}
                                        style={{color: this.state.fontColor, cursor: "default"}}
                                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                                    {" 视线距离：" + this.state.visibility}
                                </Button>
                            </Col>
                        </Row>
                    </Space>
                </List.Item>
            </List>
        );

        return (
            <Popover title={popoverTitle} content={popoverContent} color={this.state.backgroundColor}
                     placement="bottomLeft" overlayStyle={{minWidth: "400px"}}
            >
                <Button shape={this.props.preferenceData.buttonShape} icon={<i className={this.state.weatherIcon}></i>} size={"large"}
                        id={"weatherBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{
                            cursor: "default",
                            display: this.state.display
                        }}
                >
                    {this.state.weatherInfo}
                </Button>
            </Popover>
        );
    }
}

export default WeatherComponent;