import React from "react";
import {Button, message, Popover, Row, Typography, Carousel, Image, Empty} from "antd";
import {HistoryOutlined,} from "@ant-design/icons";
import {imageHistoryMaxSize, unsplashUrl} from "../typescripts/publicConstants";
import {changeThemeColor} from "../typescripts/publicFunctions";
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
    imageHistoryJson: any
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
            imageHistoryJson: []
        };
    }

    imageOnClick(item: any) {
        if(item.imageLink) {
            window.open(item.imageLink + unsplashUrl, '_blank');
        } else {
            message.error("无跳转链接");
        }
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

        if (nextProps.imageHistory && nextProps.imageHistory !== prevProps.imageHistory) {
            this.setState({
                imageHistoryJson: nextProps.imageHistory,
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
            this.setState({
                imageHistoryJson: JSON.parse(imageHistoryStorage)
            })
        }
    }

    render() {
        const popoverTitle = (
            <Text style={{color: this.state.fontColor}}>{"历史记录 " + this.state.imageHistoryJson.length + " / " + imageHistoryMaxSize}</Text>
        );

        const popoverContent = (
            <Row className="alignCenter">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                       style={{display: this.state.imageHistoryJson.length === 0? "block" : "none"}}/>
                <Carousel effect="fade"
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
                                        style={{borderRadius: "8px", cursor: "pointer"}}
                                        onClick={this.imageOnClick.bind(this, item)}
                                    />
                                </div>
                            )
                        })
                    }
                </Carousel>
            </Row>
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