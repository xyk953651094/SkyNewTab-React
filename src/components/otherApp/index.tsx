import React from "react";
import {List, Avatar, Card, Typography} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import skyNewTabPoemIcon from "../../assets/otherApps/skyNewTabPoem.png";
import skyNewTabIcon from "../../assets/otherApps/skyNewTab.png";
import {ThemeColorInterface} from "../../typescripts/publicInterface";
const {Link} = Typography;

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {
    skyNewTabPoemLink: string
    skyNewTabLink: string,
}

interface OtherAppComponent {
    state: stateType,
    props: propType
}

class OtherAppComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            skyNewTabPoemLink: "",
            skyNewTabLink: "",
        };
    }

    componentDidMount() {
        // TODO: 生成插件商店链接
    }

    componentWillReceiveProps(nextProps: any, prevProps: any) {
        if (nextProps.themeColor !== prevProps.themeColor) {

        }
    }

    render() {
        return (
            <Card title="其它作品" size={"small"} extra={<AppstoreOutlined />}>
                <List size="small" itemLayout="horizontal">
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar size="large" shape="square" src={skyNewTabPoemIcon}/>}
                            title="Sky 诗词新标签页"
                            description={<Link href="https://ant.design" target="_blank">前往扩展商店</Link>}
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar size="large" shape="square" src={skyNewTabIcon} />}
                            title="Sky 新标签页"
                            description={<Link href="https://ant.design" target="_blank">前往扩展商店</Link>}
                        />
                    </List.Item>
                </List>
            </Card>
        );
    }
}

export default OtherAppComponent;