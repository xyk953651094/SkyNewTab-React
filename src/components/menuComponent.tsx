import React from "react";
import {Button, Drawer, Space, Tooltip} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {changeThemeColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface, ThemeColorInterface} from "../typescripts/publicInterface";
import {device} from "../typescripts/publicConstants";
import MenuFooterComponent from "../menuComponents/menuFooterComponent";
import MenuEmailComponent from "../menuComponents/menuEmailComponent";
import MenuInfoComponent from "../menuComponents/menuInfoComponent";
import MenuPreferenceComponent from "../menuComponents/menuPreferenceComponent";
import MenuHeaderComponent from "../menuComponents/menuHeaderComponent";
import MenuProductsComponent from "../menuComponents/menuProductsComponent";
import MenuToTopComponent from "../menuComponents/menuToTopComponent";
import MenuHelpComponent from "../menuComponents/menuHelpComponent";

type propType = {
    themeColor: ThemeColorInterface,
    preferenceData: PreferenceDataInterface,
    getPreferenceData: any,
}

type stateType = {
    hoverColor: string,
    backgroundColor: string,
    fontColor: string,
    buttonShape: "circle" | "default" | "round" | undefined,
    displayDrawer: boolean,
    drawerPosition: "right" | "bottom",
}

interface MenuComponent {
    state: stateType,
    props: propType
}

class MenuComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hoverColor: "",
            backgroundColor: "",
            fontColor: "",
            buttonShape: "round",
            displayDrawer: false,
            drawerPosition: "right",
        };
    }

    showDrawerBtnOnClick() {
        this.setState({
            displayDrawer: true,
        })
    };

    drawerOnClose() {
        this.setState({
            displayDrawer: false,
        })
    };

    componentDidMount() {
        // 屏幕适配
        if (device === "iPhone" || device === "Android") {
            this.setState({
                drawerPosition: "bottom"
            })
        }
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {
            this.setState({
                hoverColor: nextProps.themeColor.themeColor,
                backgroundColor: nextProps.themeColor.componentBackgroundColor,
                fontColor: nextProps.themeColor.componentFontColor,
            }, () => {
                changeThemeColor("#preferenceBtn", this.state.backgroundColor, this.state.fontColor);
            });
        }

        if (nextProps.preferenceData !== prevProps.preferenceData) {
            this.setState({
                buttonShape: nextProps.preferenceData.buttonShape === "round" ? "circle" : "default"
            })
        }
    }

    render() {
        return (
            <>
                <Tooltip title={"菜单栏"} placement={"bottomRight"} color={this.state.backgroundColor}>
                    <Button shape={this.state.buttonShape} icon={<MenuOutlined style={{fontSize: "16px"}}/>}
                            size={"large"}
                            onClick={this.showDrawerBtnOnClick.bind(this)}
                            id={"preferenceBtn"}
                            className={"componentTheme zIndexHigh"}
                            style={{
                                backgroundColor: this.state.backgroundColor
                            }}
                    />
                </Tooltip>
                <Drawer
                    size={"default"}
                    width={400}
                    height={500}
                    placement={this.state.drawerPosition}
                    onClose={this.drawerOnClose.bind(this)}
                    open={this.state.displayDrawer}
                    closeIcon={false}
                    styles={{
                        mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"},
                        header: {color: this.state.fontColor, borderBottomColor: this.state.fontColor},
                        content: {backgroundColor: this.state.backgroundColor},
                        footer: {
                            backgroundColor: this.state.backgroundColor,
                            borderTopColor: this.state.fontColor,
                            textAlign: "center"
                        }
                    }}
                    title={
                        <MenuHeaderComponent
                            hoverColor={this.state.hoverColor}
                            fontColor={this.state.fontColor}
                            preferenceData={this.props.preferenceData}/>
                    }
                    footer={
                        <MenuFooterComponent
                            hoverColor={this.state.hoverColor}
                            fontColor={this.state.fontColor}
                            preferenceData={this.props.preferenceData}/>
                    }
                >
                    <Space direction={"vertical"} size={"large"} id={"drawerContent"}>
                        <MenuPreferenceComponent
                            hoverColor={this.state.hoverColor}
                            backgroundColor={this.state.backgroundColor}
                            fontColor={this.state.fontColor}
                            getPreferenceData={this.props.getPreferenceData}/>
                        <MenuHelpComponent
                            hoverColor={this.state.hoverColor}
                            backgroundColor={this.state.backgroundColor}
                            fontColor={this.state.fontColor}
                            preferenceData={this.props.preferenceData}/>
                        <MenuEmailComponent
                            hoverColor={this.state.hoverColor}
                            backgroundColor={this.state.backgroundColor}
                            fontColor={this.state.fontColor}
                            preferenceData={this.props.preferenceData}/>
                        <MenuInfoComponent
                            hoverColor={this.state.hoverColor}
                            backgroundColor={this.state.backgroundColor}
                            fontColor={this.state.fontColor}
                            preferenceData={this.props.preferenceData}/>
                        <MenuProductsComponent
                            hoverColor={this.state.hoverColor}
                            backgroundColor={this.state.backgroundColor}
                            fontColor={this.state.fontColor}
                            preferenceData={this.props.preferenceData}/>
                        <MenuToTopComponent
                            hoverColor={this.state.hoverColor}
                            fontColor={this.state.fontColor}
                            preferenceData={this.props.preferenceData}/>
                    </Space>
                </Drawer>
            </>
        );
    }
}

export default MenuComponent;