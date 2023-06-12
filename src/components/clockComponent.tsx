import React from "react";
import {Row, Typography, Space} from "antd";
import "../stylesheets/clockComponent.scss"
import {getTimeDetails} from "../typescripts/publicFunctions";
import {ThemeColorInterface} from "../typescripts/publicInterface";

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
            <Row>
                <Space  align="center" size="small" id={"clock"} className={"zIndexHigh"}>
                    <Text className={"clockText"} style={{color: this.state.backgroundColor}}>
                        {this.state.currentTime}
                    </Text>
                    <Space align="center" size="small" direction="vertical">
                        <Text className={"dateText"} style={{color: this.state.backgroundColor}}>
                            {this.state.currentWeek}
                        </Text>
                        <Text className={"dateText"} style={{color: this.state.backgroundColor}}>
                            {this.state.currentDate}
                        </Text>
                    </Space>
                </Space>
            </Row>
        );
    }
}

export default ClockComponent;