import React from "react";
import {Button, Popover} from "antd";
import {CalendarOutlined, InfoCircleOutlined, MessageOutlined} from "@ant-design/icons";
import {ThemeColorInterface} from "../../typescripts/publicInterface";
import {changeThemeColor} from "../../typescripts/publicFunctions";
import "../../stylesheets/createTime.scss"

type propType = {
    themeColor: ThemeColorInterface,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
    createTime: string,
    description: string | null,
    altDescription: string | null
}

interface CreatTimeComponent {
    state: stateType,
    props: propType
}

class CreatTimeComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            fontColor: "",
            createTime: "暂无信息",
            description: "暂无信息",
            altDescription: "暂无信息"
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            });
        }

        if (nextProps.imageData && nextProps.imageData !== prevProps.imageData) {
            this.setState({
                createTime: nextProps.imageData.created_at.split("T")[0],
                description: nextProps.imageData.description,
                altDescription: nextProps.imageData.alt_description,
            }, ()=>{
                changeThemeColor("#createTimeBtn", this.state.backgroundColor, this.state.fontColor);
            })
        }
    }

    render() {
        const popoverContent = (
            <div>
                <p className={"createTimePopoverP"}><InfoCircleOutlined />{" 图片描述：" + (this.state.description == null ? "暂无信息" : this.state.description)}</p>
                <p className={"createTimePopoverP"}><MessageOutlined />{" 附加描述：" + (this.state.altDescription == null ? "暂无信息" : this.state.altDescription)}</p>
            </div>
        );

        return (
            <Popover title={"拍摄日期：" + this.state.createTime}
                     content={popoverContent} placement="bottomRight" color={this.state.backgroundColor}>
                <Button shape="round" icon={<CalendarOutlined />} size={"large"}
                        id={"createTimeBtn"}
                        className={"componentTheme zIndexHigh"}
                        style={{
                            display: this.props.display,
                        }}
                >
                    {this.state.createTime}
                </Button>
            </Popover>
        );
    }
}

export default CreatTimeComponent;