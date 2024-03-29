import React from "react";
import {Col, Row, Space, Typography} from "antd";
import "../stylesheets/clockComponent.scss"
import {getTimeDetails} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";
import $ from "jquery";

const {Text} = Typography;

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
        $(".clockText, .dateText").removeClass("textShadow").css("color", this.state.fontColor);
        e.currentTarget.style.backgroundColor = this.state.backgroundColor;
        e.currentTarget.classList.add("componentTheme");
    }

    btnMouseOut(e: any) {
        $(".clockText, .dateText").addClass("textShadow").css("color", this.state.backgroundColor);
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.classList.remove("componentTheme");
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
                <Col span={24} id={"clockDiv"} className={"zIndexHigh"}
                     style={{padding: "5px 10px", borderRadius: "8px"}}
                     onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                    <Space align={"center"} id={"clock"}>
                        <Text className={"textShadow clockText"} style={{color: this.state.backgroundColor, cursor: "default"}}>
                            {this.state.currentTime}
                        </Text>
                        <Space align={"center"} direction={"vertical"}>
                            <Text className={"textShadow dateText"} style={{color: this.state.backgroundColor, cursor: "default"}}>
                                {this.state.currentWeek}
                            </Text>
                            <Text className={"textShadow dateText"} style={{color: this.state.backgroundColor, cursor: "default"}}>
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