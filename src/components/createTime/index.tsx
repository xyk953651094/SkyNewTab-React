import React from "react";
import {Button, Popover} from "antd";
import {CalendarOutlined, InfoCircleOutlined, SnippetsOutlined} from "@ant-design/icons";
import {ThemeColorInterface} from "../../typescripts/publicInterface";
import {changeThemeColor} from "../../typescripts/publicFunctions";

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
            }, ()=>{
                changeThemeColor("#createTimeBtn", this.state.backgroundColor, this.state.fontColor);
            })
            if(nextProps.imageData.description){
                this.setState({
                    description: nextProps.imageData.description,
                });
            }
            if(nextProps.imageData.altDescription){
                this.setState({
                    altDescription: nextProps.imageData.alt_description,
                });
            }
        }
    }

    render() {
        const popoverContent = (
            <div>
                <p><InfoCircleOutlined />{" 图片描述：" + this.state.description}</p>
                <p><SnippetsOutlined />{" 附加描述：" + this.state.altDescription}</p>
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
                            cursor: "default"
                        }}
                >
                    {this.state.createTime}
                </Button>
            </Popover>
        );
    }
}

export default CreatTimeComponent;