import React from "react";
import "../../App.css";
import {Tooltip, Button} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import {getTimeDetails, getGreet, changeThemeColor, getThemeColor} from "../../typescripts/publicFunctions";

type propType = {
    themeColor: string
}

type stateType = {
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
                        greet: tempThis.state.greet + " ｜ " + holidayContent,
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
            changeThemeColor("#greetBtn", nextProps.themeColor);
        }
    }

    render() {
        return (
            <Tooltip title={this.state.greet}>
                <Button shape="round" icon={<SmileOutlined />} size={"large"}
                        id={"greetBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
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