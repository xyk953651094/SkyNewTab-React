import React from "react";
import "../../App.css";
import {Tooltip, Button} from "antd";
import {CalendarOutlined} from "@ant-design/icons";
import {getTimeDetails, getGreet, getFontColor} from "../../typescripts/publicFunctions";

type propType = {
    imageColor: string,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    greet: string,
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
        };
    }

    componentWillMount() {
        let tempThis = this;
        let tempDate = getTimeDetails(new Date());
        let date = tempDate.year + tempDate.month + tempDate.day;

        let appId = "cicgheqakgmpjclo"
        let appSecret = "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09"
        let holidayXHR = new XMLHttpRequest();
        holidayXHR.open("GET", "https://www.mxnzp.com/api/holiday/single/" + date + "?app_id=" + appId + "&app_secret=" + appSecret)
        holidayXHR.onload = function () {
            if (holidayXHR.status === 200) {
                let holidayData = JSON.parse(holidayXHR.responseText);
                if (holidayData.code === 1) {
                    let holidayContent = holidayData.data.solarTerms;
                    if (holidayData.data.solarTerms.indexOf("后") === -1) {
                        holidayContent = "今日" + holidayContent;
                    }
                    tempThis.setState({
                        greet: tempThis.state.greet + " | " + holidayContent,
                    });
                }
            }
        }
        holidayXHR.onerror = function () {

        }
        holidayXHR.send();
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

    render() {
        return (
            <Tooltip title={this.state.greet}>
                <Button shape="round" icon={<CalendarOutlined/>} size={"large"}
                        id={"greetBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.fontColor,
                            cursor: "default"
                        }}
                >
                    {this.state.greet}
                </Button>
            </Tooltip>
        );
    }
}

export default GreetComponent;