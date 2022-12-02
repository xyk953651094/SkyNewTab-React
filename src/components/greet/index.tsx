import React from "react";
import {Popover, Button} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import {getTimeDetails, getGreet, changeThemeColor} from "../../typescripts/publicFunctions";
import {ThemeColorInterface} from "../../typescripts/publicInterface";
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
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
            backgroundColor: "",
            fontColor: "",
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
            timeout: 10000,
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
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            },() => {
                changeThemeColor("#greetBtn", this.state.backgroundColor, this.state.fontColor);
            });
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
            <Popover title={this.state.calendar} content={popoverContent} placement="topRight" color={this.state.backgroundColor}>
                <Button shape="round" icon={<SmileOutlined />} size={"large"}
                        id={"greetBtn"}
                        className={"componentTheme zIndexHigh"}
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