import React from "react";
import {Button, Popover} from "antd";
import {ThemeColorInterface} from "../typescripts/publicInterface";
import {TooltipPlacement} from "antd/es/tooltip";

type propType = {
    themeColor: ThemeColorInterface,

    popoverTitle: any,
    popoverContent: any,
    popoverPlacement: TooltipPlacement | undefined,
    popoverMinWidth: string,
    buttonIcon: any,
    buttonId: string,
    buttonDisplay: string,
    buttonContent: string,
    buttonShape: "default" | "circle" | "round" | undefined,
}

type stateType = {
    backgroundColor: string,
}

interface PopoverComponent {
    state: stateType,
    props: propType
}

class PopoverComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
        };
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
            });
        }
    }

    render() {
        return (
            <Popover
                title={this.props.popoverTitle}
                content={this.props.popoverContent}
                placement={this.props.popoverPlacement}
                color={this.state.backgroundColor}
                overlayStyle={{minWidth: this.props.popoverMinWidth}}
            >
                <Button shape={this.props.buttonShape}
                        icon={this.props.buttonIcon}
                        size={"large"}
                        id={this.props.buttonId}
                        className={"componentTheme zIndexHigh"}
                        style={{
                            cursor: "default",
                            display: this.props.buttonDisplay,
                        }}
                >
                    {this.props.buttonContent}
                </Button>
            </Popover>
        );
    }
}

export default PopoverComponent;