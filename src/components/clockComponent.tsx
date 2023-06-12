import React from "react";
import {Row, Col, Button, Typography, Space} from "antd";
import {changeThemeColor, getTimeDetails, isEmptyString} from "../typescripts/publicFunctions";
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
            currentTime: "--:--",
            currentWeek: "暂无信息",
            currentDate: "--年--月--日",
        };
    }

    componentDidMount() {
        setInterval(() => {
            let timeDetails = getTimeDetails(new Date());
            this.setState({
                currentTime: timeDetails.showTime,
                currentWeek: timeDetails.showWeek,
                currentDate: timeDetails.showDate4,
            })
        }, 1000);

        // $("#clock").hover(function(){
        //     $("#clock").css("background-color","rgba(0, 0, 0, 0.06)");
        // },function(){
        //     $("#clock").css("background-color","transparent");
        // });
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
            <Row>
                <Row id={"clock"} className={"center zIndexHigh"}>
                    <Col span={12} className={"center"}>
                        <Text style={{fontSize: "50px", height: "70px", lineHeight: "70px", color: this.state.backgroundColor}}>
                            {this.state.currentTime}
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Text style={{fontSize: "20px", height: "25px", lineHeight: "25px", color: this.state.backgroundColor}}>
                                    {this.state.currentWeek}
                                </Text>
                            </Col>
                            <Col span={24}>
                                <Text style={{fontSize: "20px", height: "25px", lineHeight: "25px", color: this.state.backgroundColor}}>
                                    {this.state.currentDate}
                                </Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
        );
    }
}

export default ClockComponent;