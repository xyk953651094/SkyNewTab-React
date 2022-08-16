import React from "react";
import "../../App.css";
import {Button, message, Tooltip} from "antd";
import {getFontColor, getThemeColor} from "../../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageColor: string,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    weatherInfo: string,
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
            weatherInfo: "暂无天气信息",
        };
    }

    componentWillMount() {
        let tempThis = this;

        let imageXHR=new XMLHttpRequest();
        imageXHR.open("GET","https://v2.jinrishici.com/info");
        imageXHR.onload=function(){
            if(imageXHR.status===200){
                let imageData=JSON.parse(imageXHR.responseText);

                if (imageData.status === 'success') {
                    let weatherData: any = imageData.data.weatherData;
                    tempThis.setState({
                        weatherInfo: weatherData.weather  + " ｜ " + weatherData.temperature + "°C",
                    });
                }
                else {}
            }
            else{}
        }
        imageXHR.onerror=function(){}
        imageXHR.send();
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

    render(){
        return (
            <Tooltip title={this.state.weatherInfo}>
                <Button shape="round" size={"large"}
                        id={"weatherBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            display: this.props.display,
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