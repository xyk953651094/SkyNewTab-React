import React from "react";
import "../../App.css";
import {Button, Tooltip} from "antd";
import {CameraOutlined} from "@ant-design/icons";
import {changeThemeColor} from "../../typescripts/publicFunctions";

type propType = {
    display: "none" | "block",
    imageColor: string,
    createTime: string,
}

type stateType = {
    backgroundColor: string,
    fontColor: string,
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
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps !== prevProps) {
            changeThemeColor("#createTimeBtn", nextProps.imageColor);
        }
    }

    render() {
        return (
            <Tooltip title={"拍摄时间：" + this.props.createTime}>
                <Button shape="round" icon={<CameraOutlined/>} size={"large"}
                        id={"createTimeBtn"}
                        className={"frostedGlass zIndexHigh"}
                        style={{
                            display: this.props.display,
                            backgroundColor: this.state.backgroundColor,
                            color: this.state.fontColor,
                            cursor: "default"
                        }}
                >
                    {this.props.createTime}
                </Button>
            </Tooltip>
        );
    }
}

export default CreatTimeComponent;