import React, {MouseEventHandler} from "react";
import {Button} from "antd";
import {ThemeColorInterface} from "../typescripts/publicInterface";
import {btnMouseOut, btnMouseOver} from "../typescripts/publicFunctions";
import {ButtonShape} from "antd/es/button";

type propType = {
    themeColor: ThemeColorInterface,

    buttonIcon: any,
    buttonCursor: "default" | "pointer",
    buttonContent: string,
    buttonShape: ButtonShape,
    buttonOnClick: MouseEventHandler<HTMLElement>,
}

type stateType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
}

interface ButtonComponent {
    state: stateType,
    props: propType
}

class ButtonComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            });
        }
    }

    render() {
        return (
            <Button type={"text"}
                    shape={this.props.buttonShape}
                    icon={this.props.buttonIcon}
                    style={{color: this.state.fontColor, cursor: this.props.buttonCursor}}
                    onMouseOver={btnMouseOver.bind(this, this.state.hoverColor)}
                    onMouseOut={btnMouseOut.bind(this, this.state.fontColor)}
                    onClick={this.props.buttonOnClick}
            >
                {this.props.buttonContent}
            </Button>
        );
    }
}

export default ButtonComponent;