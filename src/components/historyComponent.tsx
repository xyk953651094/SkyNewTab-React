import React from "react";
import {Button, Carousel, Col, Empty, Image, List, message, Popover, Row, Space, Spin, Typography} from "antd";
import {DownloadOutlined, HistoryOutlined} from "@ant-design/icons";
import {imageHistoryMaxSize, unsplashUrl} from "../typescripts/publicConstants";
import {btnMouseOut, btnMouseOver, changeThemeColor, isEmpty} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import "../stylesheets/publicStyles.scss"

const {Text} = Typography;

type propType = {
    display: "none" | "block",
    themeColor: ThemeColorInterface,
    imageHistory: any,
    preferenceData: PreferenceDataInterface,
}

type stateType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    buttonShape: "circle" | "default" | "round" | undefined,
    imageHistoryJson: any,
    imageLink: string
}

interface HistoryComponent {
    state: stateType,
    props: propType
}

class HistoryComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            buttonShape: "round",
            imageHistoryJson: [],
            imageLink: "",
        };
    }

    imageLinkBtnOnClick() {
        if (!isEmpty(this.state.imageLink)) {
            window.open(this.state.imageLink + unsplashUrl, "_self");
        } else {
            message.error("无跳转链接");
        }
    }

    carouselOnChange(currentIndex: number) {
        this.setState({
            imageLink: this.state.imageHistoryJson[currentIndex].imageLink
        })
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, () => {
                changeThemeColor("#imageHistoryBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.imageHistory.length > 0 && nextProps.imageHistory !== prevProps.imageHistory) {
            let tempImageHistoryJson = nextProps.imageHistory;
            this.setState({
                imageHistoryJson: tempImageHistoryJson,
                imageLink: tempImageHistoryJson[0].imageLink,
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                buttonShape: nextProps.preferenceData.buttonShape === "round" ? "circle" : "default"
            })
        }
    }

    componentDidMount() {
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={8}>
                    <Text
                        style={{color: this.state.fontColor}}>{"历史记录 " + this.state.imageHistoryJson.length + " / " + imageHistoryMaxSize}</Text>
                </Col>
                <Col span={16} style={{textAlign: "right"}}>
                    <Space>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<DownloadOutlined/>}
                                onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                                onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                                onClick={this.imageLinkBtnOnClick.bind(this)}
                                style={{color: this.state.fontColor}}>
                            {"下载图片"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List split={false}>
                <List.Item style={{display: this.state.imageHistoryJson.length === 0 ? "flex" : "none"}}>
                    <Row className="alignCenter" style={{width: "350px"}}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </Row>
                </List.Item>
                <List.Item style={{display: this.state.imageHistoryJson.length === 0 ? "none" : "flex"}}>
                    <Carousel effect="fade" afterChange={this.carouselOnChange.bind(this)}
                              style={{width: "350px", height: "210px"}}>
                        {
                            this.state.imageHistoryJson.map((item: any) => {
                                return (
                                    <div key={item.index}
                                         style={{width: "350px", height: "210px", lineHeight: "210px"}}>
                                        <Image
                                            width={"350px"}
                                            height={210}
                                            preview={false}
                                            alt={"暂无图片"}
                                            src={item.imageUrl}
                                            style={{borderRadius: "8px"}}
                                            placeholder={
                                                <div style={{width: '35px%', height: '210px', borderRadius: '8px'}}
                                                     className="alignCenter">
                                                    <Spin tip="加载中，请稍后..."/>
                                                </div>
                                            }
                                        />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </List.Item>
            </List>
        );

        return (
            <Popover title={popoverTitle} content={popoverContent} placement={"topRight"}
                     color={this.state.backgroundColor}
                     overlayStyle={{minWidth: "350px"}}>
                <Button shape={this.state.buttonShape} icon={<HistoryOutlined/>} size={"large"}
                        id={"imageHistoryBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{
                            display: this.props.display,
                            cursor: "default"
                        }}
                />
            </Popover>
        );
    }
}

export default HistoryComponent;