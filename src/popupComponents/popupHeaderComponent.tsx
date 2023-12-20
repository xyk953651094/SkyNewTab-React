import React from "react";
import {Button, Space} from "antd";
import {DashboardOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
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

    render() {
        return (
            <Space align={"center"}>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<DashboardOutlined/>}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor, cursor: "default"}}>
                    云开新标签页的仪表盘
                </Button>
            </Space>
        );
    }
}

export default PopupHeaderComponent;