import React from "react";
import {Button, Row} from "antd";
import {ToTopOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

type propType = {
    hoverColor: string,
    fontColor: string,
    preferenceData: PreferenceDataInterface,
}

type stateType = {}

interface PreferenceFooterComponent {
    state: stateType,
    props: propType
}

class PreferenceFooterComponent extends React.Component {
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
                        onMouseOver={this.btnMouseOver.bind(this)} onMouseOut={this.btnMouseOut.bind(this)}
                        onClick={this.toTopBtnOnClick.bind(this)}
                        style={{color: this.props.fontColor}}>
                    {"回到顶部"}
                </Button>
            </Row>
        );
    }
}

export default PreferenceFooterComponent;