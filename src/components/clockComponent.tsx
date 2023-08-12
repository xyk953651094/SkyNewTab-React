import React from "react";
import {Col, Row, Space, Typography} from "antd";
import "../stylesheets/clockComponent.scss"
import {changeBackgroundColor, changeFontColor, getTimeDetails} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

const {Text} = Typography;
const $ = require("jquery");

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    currentTime: string,
    currentWeek: string,
    currentDate: string,
}

interface ClockComponent {
    state: stateType,
    props: propType
}

class ClockComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            fontColor: "",
            currentTime: getTimeDetails(new Date()).showTime,
            currentWeek: getTimeDetails(new Date()).showWeek,
            currentDate: getTimeDetails(new Date()).showDate,
        };
    }

    btnMouseOver(e: any) {
        setTimeout(() => {
            e.currentTarget.classList.add("componentTheme");
        }, 300);
        changeBackgroundColor(e.currentTarget, this.state.backgroundColor);
        changeFontColor(".clockText, .dateText", this.state.fontColor);

        // e.currentTarget.style.backgroundColor = this.state.backgroundColor;
        // e.currentTarget.classList.add("componentTheme");
        // $(".clockText").css("color", this.state.fontColor);
        // $(".dateText").css("color", this.state.fontColor);
    }

    btnMouseOut(e: any) {
        setTimeout(() => {
            e.currentTarget.classList.remove("componentTheme");
        }, 300);
        changeBackgroundColor(e.currentTarget, "transparent");
        changeFontColor(".clockText, .dateText", this.state.backgroundColor);

        // e.currentTarget.style.backgroundColor = "transparent";
        // $(".clockText").css("color", this.state.backgroundColor);
        // $(".dateText").css("color", this.state.backgroundColor);
    }

    componentDidMount() {
        setInterval(() => {
            let timeDetails = getTimeDetails(new Date());
            this.setState({
                currentTime: timeDetails.showTime,
                currentWeek: timeDetails.showWeek,
                currentDate: timeDetails.showDate,
            })
        }, 1000);
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            });
        }
    }

    render() {
        return (
            <Row justify={"center"}>
                <Col span={24} className={"zIndexHigh"} style={{padding: "5px", borderRadius: "10px"}}
                     onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                    <Space align={"center"} id={"clock"}>
                        <Text className={"clockText"} style={{color: this.state.backgroundColor}}>
                            {this.state.currentTime}
                        </Text>
                        <Space align={"center"} direction={"vertical"}>
                            <Text className={"dateText"} style={{color: this.state.backgroundColor}}>
                                {this.state.currentWeek}
                            </Text>
                            <Text className={"dateText"} style={{color: this.state.backgroundColor}}>
                                {this.state.currentDate}
                            </Text>
                        </Space>
                    </Space>
                </Col>
            </Row>
        );
    }
}

export default ClockComponent;