import React from "react";
import {Button, message, Popover, Row, Typography, Carousel, Image, Empty, Col, Space, List} from "antd";
import {FileImageOutlined, HistoryOutlined} from "@ant-design/icons";
import {imageHistoryMaxSize, unsplashUrl} from "../typescripts/publicConstants";
import {changeThemeColor, getFontColor, isEmpty} from "../typescripts/publicFunctions";
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

interface ImageHistoryComponent {
    state: stateType,
    props: propType
}

class ImageHistoryComponent extends React.Component {
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

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.state.hoverColor;
        e.currentTarget.style.color = getFontColor(this.state.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.state.fontColor;
    }

    imageLinkBtnOnClick() {
        if (!isEmpty(this.state.imageLink)) {
            window.open(this.state.imageLink + unsplashUrl, "_blank");
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
            let tempImageHistoryJson = nextProps.imageHistory.reverse(); // 重新到旧排序
            console.log(tempImageHistoryJson);
            this.setState({
                imageHistoryJson: tempImageHistoryJson,
                imageLink: tempImageHistoryJson[0].imageLink,
            })
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                buttonShape: nextProps.preferenceData.buttonShape === "round" ? "circle" : "default"
            })
        }
    }

    componentDidMount() {
        // 获取缓存图片列表
        let imageHistoryStorage = localStorage.getItem("imageHistory");
        if(imageHistoryStorage !== null) {
            let tempImageHistoryJson = JSON.parse(imageHistoryStorage);
            if (!isEmpty(tempImageHistoryJson)) {
                tempImageHistoryJson = tempImageHistoryJson.reverse(); // 重新到旧排序
                this.setState({
                    imageHistoryJson: tempImageHistoryJson,
                    imageLink: tempImageHistoryJson[0].imageLink,
                })
            }
        }
    }

    render() {
        const popoverTitle = (
            <Row align={"middle"}>
                <Col span={10}>
                    <Text style={{color: this.state.fontColor}}>{"历史记录 " + this.state.imageHistoryJson.length + " / " + imageHistoryMaxSize}</Text>
                </Col>
                <Col span={14} style={{textAlign: "right"}}>
                    <Space>
                        <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<FileImageOutlined />}
                                onMouseOver={this.btnMouseOver.bind(this)}
                                onMouseOut={this.btnMouseOut.bind(this)}
                                onClick={this.imageLinkBtnOnClick.bind(this)}
                                style={{color: this.state.fontColor}}>
                            {"当前历史图片主页"}
                        </Button>
                    </Space>
                </Col>
            </Row>
        );

        const popoverContent = (
            <List>
                <List.Item>
                    <Row className="alignCenter">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                               style={{display: this.state.imageHistoryJson.length === 0? "block" : "none"}}/>
                        <Carousel effect="fade" afterChange={this.carouselOnChange.bind(this)}
                                  style={{display: this.state.imageHistoryJson.length === 0? "none" : "block", width: "350px", height: "210px"}}>
                            {
                                this.state.imageHistoryJson.map((item: any) => {
                                    return (
                                        <div key={item.index} style={{width: "350px", height: "210px", lineHeight: "210px"}}>
                                            <Image
                                                width={350}
                                                height={210}
                                                preview={false}
                                                alt={"暂无图片"}
                                                src={item.imageUrl}
                                                style={{borderRadius: "8px"}}
                                                placeholder={
                                                    <Image
                                                        width={350}
                                                        height={210}
                                                        preview={false}
                                                        alt={"暂无图片"}
                                                        src={item.placeholderUrl}
                                                        style={{borderRadius: "8px"}}
                                                    />
                                                }
                                            />
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </Row>
                </List.Item>
            </List>
        );

        return (
            <Popover title={popoverTitle} content={popoverContent} placement={"topRight"}
                     color={this.state.backgroundColor}
                     overlayStyle={{width: "370px"}}>
                <Button shape={this.state.buttonShape} icon={<HistoryOutlined />} size={"large"}
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

export default ImageHistoryComponent;