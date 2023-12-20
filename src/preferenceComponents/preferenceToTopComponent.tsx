import React from "react";
import {Button, Row} from "antd";
import {ToTopOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceToTopComponent {
    state: stateType,
    props: propType
}

class PreferenceToTopComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    toTopBtnOnClick() {
        let drawerContent: HTMLElement | null = document.getElementById("drawerContent");
        if (drawerContent) {
            drawerContent.scrollIntoView({behavior: "smooth"});
        }
    }

    render() {
        return (
            <Row justify={"center"}>
                <Button type={"text"} shape={this.props.preferenceData.buttonShape} icon={<ToTopOutlined/>}
                        onMouseOver={btnMouseOver.bind(this, this.props.hoverColor)}
                        onMouseOut={btnMouseOut.bind(this, this.props.fontColor)}
                        onClick={this.toTopBtnOnClick.bind(this)}
                        style={{color: this.props.fontColor}}>
                    {"回到顶部"}
                </Button>
            </Row>
        );
    }
}

export default PreferenceToTopComponent;