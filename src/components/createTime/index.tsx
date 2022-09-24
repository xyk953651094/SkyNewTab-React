import React from "react";
import "../../App.css";
import {Button, Tooltip} from "antd";
import {CalendarOutlined} from "@ant-design/icons";
import {changeThemeColor, getThemeColor} from "../../typescripts/publicFunctions";

type propType = {
    themeColor: string,
    display: "none" | "block",
    imageData: any,
}

type stateType = {
    createTime: string,
}

interface CreatTimeComponent {
    state: stateType,
    props: propType
}

class CreatTimeComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            createTime: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#createTimeBtn", nextProps.themeColor);

            this.setState({
                createTime: nextProps.imageData.created_at.split("T")[0]
            })
        }
    }

    render() {
        return (
            <Tooltip title={"拍摄时间：" + this.state.createTime}  placement="bottomRight">
                <Button shape="round" icon={<CalendarOutlined />} size={"large"}
                        id={"createTimeBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            display: this.props.display,
                            cursor: "default"
                        }}
                >
                    {this.state.createTime}
                </Button>
            </Tooltip>
        );
    }
}

export default CreatTimeComponent;