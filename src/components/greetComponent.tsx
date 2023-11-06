import React from "react";
import {Button, Col, List, Popover, Row, Space, Typography} from "antd";
import {
    CalendarOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    HistoryOutlined,
    MoreOutlined
} from "@ant-design/icons";
import {
    changeThemeColor,
    getFontColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getTimeDetails,
    httpRequest
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";

const {Text} = Typography;
const btnMaxSize = 80;

type propType = {
    themeColor: ThemeColorInterface,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    display: "none" | "block",
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    greetIcon: string,
    greetContent: string,
    holidayContent: string,
    searchEngineUrl: string,
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
            display: "block",
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            greetIcon: getGreetIcon(),
            greetContent: getGreetContent(),
            holidayContent: "暂无信息",
            searchEngineUrl: "https://www.bing.com/search?q=",
            calendar: getTimeDetails(new Date()).showDate4 + " " + getTimeDetails(new Date()).showWeek,
            suit: "暂无信息",
            avoid: "暂无信息",
        };
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.state.hoverColor;
        e.currentTarget.style.color = getFontColor(this.state.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.state.fontColor;
    }

    historyBtnOnClick() {
        window.open(this.state.searchEngineUrl + "历史上的今天", "_blank");
    }

    infoBtnOnClick() {
        window.open(this.state.searchEngineUrl + "万年历", "_blank");
    }

    // 请求完成后处理步骤
    setHoliday(data: any) {
        let holidayContent = data.solarTerms;
        if (data.solarTerms.indexOf("后") === -1) {
            holidayContent = "今日" + holidayContent;
        }
        if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
            holidayContent = holidayContent + " · " + data.typeDes;
        }

        let timeDetails = getTimeDetails(new Date());
        this.setState({
            holidayContent: holidayContent,
            calendar: timeDetails.showDate4 + " " + timeDetails.showWeek + "｜" +
                data.yearTips + data.chineseZodiac + "年｜" + data.lunarCalendar + "｜" + data.constellation,
            suit: data.suit.replace(/\./g, " · "),
            avoid: data.avoid.replace(/\./g, " · "),
        });
    }

    // 获取节假日信息
    getHoliday() {
        let tempThis = this;
        let headers = {};
        let url = "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3;
        let data = {
            "app_id": "cicgheqakgmpjclo",
            "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
        };
        httpRequest(headers, url, data, "GET")
            .then(function (resultData: any) {
                localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                if (resultData.code === 1) {
                    localStorage.setItem("lastHoliday", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                    tempThis.setHoliday(resultData.data);
                }
            })
            .catch(function () {
                // 请求失败也更新请求时间，防止超时后无信息可显示
                // localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流

                // 请求失败时使用上一次请求结果
                let lastHoliday: any = localStorage.getItem("lastHoliday");
                if (lastHoliday) {
                    lastHoliday = JSON.parse(lastHoliday);
                    tempThis.setHoliday(lastHoliday);
                }
            });
    }

    componentDidMount() {
        if (!this.props.preferenceData.simpleMode) {
            // 防抖节流
            let lastRequestTime: any = localStorage.getItem("lastHolidayRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                this.getHoliday();
            } else if (nowTimeStamp - parseInt(lastRequestTime) > 4 * 60 * 60 * 1000) {  // 必须多于四小时才能进行新的请求
                this.getHoliday();
            } else {  // 四小时之内使用上一次请求结果
                let lastHoliday: any = localStorage.getItem("lastHoliday");
                if (lastHoliday) {
                    lastHoliday = JSON.parse(lastHoliday);
                    this.setHoliday(lastHoliday);
                }
            }

            setInterval(() => {
                this.setState({
                    greetIcon: getGreetIcon(),
                    greetContent: getGreetContent(),
                })
            }, 60 * 60 * 1000);
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, () => {
                changeThemeColor("#greetBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                display: nextProps.preferenceData.simpleMode ? "none" : "block",
                searchEngineUrl: getSearchEngineDetail(nextProps.preferenceData.searchEngine).searchEngineUrl,
            });
        }
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={10}>
                    <Text style={{color: this.state.fontColor}}>{"万年历"}</Text>
                </Col>
                <Col span={14} style={{textAlign: "right"}}>
                    <Space>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<HistoryOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                onClick={this.historyBtnOnClick.bind(this)}
                                style={{color: this.state.fontColor}}>
                            {"历史上的今天"}
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<MoreOutlined/>}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                onClick={this.infoBtnOnClick.bind(this)}
                                style={{color: this.state.fontColor}}>
                            {"更多信息"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List>
                <List.Item>
                    <Space direction={"vertical"}>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<CalendarOutlined/>}
                                style={{color: this.state.fontColor, cursor: "default"}}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                            {this.state.calendar}
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<CheckCircleOutlined/>}
                                style={{color: this.state.fontColor, cursor: "default"}}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                            {"宜：" + (this.state.suit.length < btnMaxSize) ? this.state.suit : this.state.suit.substring(0, btnMaxSize) + "..."}
                        </Button>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape}
                                icon={<CloseCircleOutlined/>}
                                style={{color: this.state.fontColor, cursor: "default"}}
                                onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}>
                            {"忌：" + (this.state.avoid.length < btnMaxSize) ? this.state.avoid : this.state.avoid.substring(0, btnMaxSize) + "..."}
                        </Button>
                    </Space>
                </List.Item>
            </List>
        );

        return (
            <Popover
                title={popoverTitle}
                content={popoverContent} placement={"bottomLeft"} color={this.state.backgroundColor}
                overlayStyle={{minWidth: "550px"}}
            >
                <Button shape={this.props.preferenceData.buttonShape} icon={<i className={this.state.greetIcon}></i>}
                        size={"large"}
                        id={"greetBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{
                            cursor: "default",
                            display: this.state.display
                        }}
                >
                    {this.state.greetContent + "｜" + this.state.holidayContent}
                </Button>
            </Popover>
        );
    }
}

export default GreetComponent;