import React from "react";
import {Col, Row, Space, Typography} from "antd";
import "../stylesheets/clockComponent.scss"
import {changeBackgroundColor, changeFontColor, getTimeDetails} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import $ from "jquery";

const {Text} = Typography;

type propType = {
    themeColor: ThemeColorInterface,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    noImageMode: boolean,
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
            noImageMode: false,
            backgroundColor: "",
            fontColor: "",
            currentTime: getTimeDetails(new Date()).showTime,
            currentWeek: getTimeDetails(new Date()).showWeek,
            currentDate: getTimeDetails(new Date()).showDate,
        };
    }

    btnMouseOver(e: any) {
        if (!this.state.noImageMode) {
            let currentTarget = e.currentTarget;
            new Promise((resolve) => {
                $(".clockText, .dateText").removeClass("textShadow");
                changeBackgroundColor(e.currentTarget, this.state.backgroundColor, 150);
                changeFontColor(".clockText, .dateText", this.state.fontColor, 150);
                resolve("success");
            }).then(() => {
                currentTarget.classList.add("componentTheme");
            })
        }
    }

    btnMouseOut(e: any) {
        if (!this.state.noImageMode) {
            $(".clockText, .dateText").addClass("textShadow");
            e.currentTarget.classList.remove("componentTheme");
            changeBackgroundColor(e.currentTarget, "transparent", 150);
            changeFontColor(".clockText, .dateText", this.state.backgroundColor, 150);
        }
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

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                noImageMode: nextProps.preferenceData.noImageMode
            })
        }
    }

    render() {
        return (
            <Row justify={"center"}>
                <Col span={24} id={"clockDiv"} className={"zIndexHigh"}
                     style={{padding: "5px 10px", borderRadius: "8px"}}
                     onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                    <Space align={"center"} id={"clock"}>
                        <Text className={"textShadow clockText"} style={{color: this.state.backgroundColor}}>
                            {this.state.currentTime}
                        </Text>
                        <Space align={"center"} direction={"vertical"}>
                            <Text className={"textShadow dateText"} style={{color: this.state.backgroundColor}}>
                                {this.state.currentWeek}
                            </Text>
                            <Text className={"textShadow dateText"} style={{color: this.state.backgroundColor}}>
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