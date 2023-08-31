import React from "react";
import {Button, Space} from "antd";
import {DashboardOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

type propType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
}

type stateType = {}

interface PopupHeaderComponent {
    state: stateType,
    props: propType
}

class PopupHeaderComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.props.hoverColor;
        e.currentTarget.style.color = getFontColor(this.props.hoverColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.props.fontColor;
    }

    render() {
        return (
            <Space align={"center"}>
                <Button type={"text"} shape={"round"} icon={<DashboardOutlined/>}
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        style={{color: this.props.fontColor, cursor: "default"}}>
                    云开新标签页的仪表盘
                </Button>
            </Space>
        );
    }
}

export default PopupHeaderComponent;