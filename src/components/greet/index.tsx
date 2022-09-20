import React from "react";
import "../../App.css";
import {Tooltip, Button, message} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import {getTimeDetails, getGreet, changeThemeColor, getThemeColor} from "../../typescripts/publicFunctions";
const $ = require("jquery");

type propType = {
    themeColor: string,
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
        let holidayParameters = {
            "app_id": "cicgheqakgmpjclo",
            "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
        };
        $.ajax({
            url: "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3,
            type: "GET",
            data: holidayParameters,
            timeout: 5000,
            success: (holidayData: any) => {
                if (holidayData.code === 1) {
                    let holidayContent = holidayData.data.solarTerms;
                    if (holidayData.data.solarTerms.indexOf("后") === -1) {
                        holidayContent = "今日" + holidayContent;
                    }
                    this.setState({
                        greet: this.state.greet + " ｜ " + holidayContent,
                    });
                }
            },
            error: function () {}
        });
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