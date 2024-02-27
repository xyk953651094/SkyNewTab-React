import React from "react";
import {Button, Space} from "antd";
import {StarOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface MenuFooterComponent {
    state: stateType,
    props: propType
}

class MenuFooterComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Space>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<StarOutlined />}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        style={{color: this.props.fontColor, cursor: "default"}}>
                    {"如果喜欢这款插件，请考虑捐助或五星好评"}
                </Button>
            </Space>
        );
    }
}

export default MenuFooterComponent;