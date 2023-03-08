import React from "react";
import {Popover, Button} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {
    getTimeDetails,
    getGreetContent,
    getGreetIcon,
    changeThemeColor, httpRequest
} from "../../typescripts/publicFunctions";
import {ThemeColorInterface} from "../../typescripts/publicInterface";
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    greet: string,
    greetIcon: string,
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
            greet: getGreetContent(),
            greetIcon: getGreetIcon(),
            calendar: getTimeDetails(new Date()).showDate4 + " " + getTimeDetails(new Date()).showWeek,
            suit: "暂无信息",
            avoid: "暂无信息",
        };
    }

    componentDidMount() {
        let tempThis = this;
        let url = "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3;
        let data = {
            "app_id": "cicgheqakgmpjclo",
            "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
        };
        httpRequest(url, data, "GET")
            .then(function(resultData: any){
                if (resultData.code === 1) {
                    let holidayContent = resultData.data.solarTerms;
                    if (resultData.data.typeDes !== "休息日" && resultData.data.typeDes !== "工作日"){
                        holidayContent = holidayContent + " · " + resultData.data.typeDes;
                    }
                    if (resultData.data.solarTerms.indexOf("后") === -1) {
                        holidayContent = "今日" + holidayContent;
                    }
                    let timeDetails = getTimeDetails(new Date());
                    tempThis.setState({
                        greet: tempThis.state.greet + "｜" + holidayContent,
                        calendar: timeDetails.showDate4 + " " + timeDetails.showWeek + "｜" +
                            resultData.data.yearTips + resultData.data.chineseZodiac + "年｜" +
                            resultData.data.lunarCalendar,
                        suit: resultData.data.suit.replace(/\./g, " · "),
                        avoid: resultData.data.avoid.replace(/\./g, " · "),
                    });
                }
            })
            .catch(function(){});
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
                <p><CheckCircleOutlined />{" 宜：" + this.state.suit}</p>
                <p><CloseCircleOutlined />{" 忌：" + this.state.avoid}</p>
            </div>
        );
        
        return (
            <Popover
                title={this.state.calendar}
                content={popoverContent} placement="topLeft" color={this.state.backgroundColor}>
                <Button shape="round" icon={<i className={this.state.greetIcon}> </i>} size={"large"}
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