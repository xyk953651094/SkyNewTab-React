import React from "react";
import "../../App.css";
import {Popover, Button} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import {getTimeDetails, getGreet, changeThemeColor, getFontColor} from "../../typescripts/publicFunctions";
const $ = require("jquery");

type propType = {
    themeColor: string,
}

type stateType = {
    greet: string,
    calendar: string,
    suit: string,
    avoid: string,
}

interface GreetComponent {
    state: stateType,
    props: propType
}

class GreetComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            greet: getGreet(new Date()),
            calendar: getTimeDetails(new Date()).showDate4 + " " + getTimeDetails(new Date()).showWeek,
            suit: "暂无信息",
            avoid: "暂无信息",
        };
    }

    componentDidMount() {
        let holidayParameters = {
            "app_id": "cicgheqakgmpjclo",
            "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
        };
        $.ajax({
            url: "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3,
            type: "GET",
            data: holidayParameters,
            timeout: 5000,
            success: (resultData: any) => {
                if (resultData.code === 1) {
                    let holidayContent = resultData.data.solarTerms;
                    if (resultData.data.solarTerms.indexOf("后") === -1) {
                        holidayContent = "今日" + holidayContent;
                    }
                    let timeDetails = getTimeDetails(new Date());
                    this.setState({
                        greet: this.state.greet + " ｜ " + holidayContent,
                        calendar: timeDetails.showDate4 + " " + timeDetails.showWeek + "｜" +
                            resultData.data.yearTips + resultData.data.chineseZodiac + "年｜" +
                            resultData.data.lunarCalendar,
                        suit: resultData.data.suit.replace(/\./g, "·"),
                        avoid: resultData.data.avoid.replace(/\./g, "·"),
                    });
                }
            },
            error: function () {}
        });
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            changeThemeColor("#greetBtn", nextProps.themeColor);
        }
    }

    render() {
        const popoverContent = (
            <div>
                <p>{"宜：" + this.state.suit}</p>
                <p>{"忌：" + this.state.avoid}</p>
            </div>
        );
        
        return (
            <Popover title={this.state.calendar} content={popoverContent} placement="topRight" color={this.props.themeColor}>
                <Button shape="round" icon={<SmileOutlined />} size={"large"}
                        id={"greetBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            cursor: "default"
                        }}
                >
                    {this.state.greet}
                </Button>
            </Popover>
        );
    }
}

export default GreetComponent;