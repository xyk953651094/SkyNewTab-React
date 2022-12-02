import React from "react";
import {Card, Space, Alert, Collapse} from "antd";
import {AlipayCircleOutlined, HeartOutlined, WechatOutlined} from "@ant-design/icons";
import {ThemeColorInterface} from "../../typescripts/publicInterface";
const { Panel } = Collapse;

type propType = {
    themeColor: ThemeColorInterface,
}

type stateType = {}

interface DonationComponent {
    state: stateType,
    props: propType
}

class DonationComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card title="捐款鼓励" size={"small"} extra={<HeartOutlined />}>
                <Space direction="vertical" size="small" style={{display: "flex"}}>
                    <Alert message="捐款不会为您带来额外体验" type="warning" showIcon/>
                    <Collapse accordion={true} bordered={false}>
                        <Panel header="支付宝" key="AliPay" extra={<AlipayCircleOutlined />}>

                        </Panel>
                        <Panel header="微信支付" key="WeChatPay" extra={<WechatOutlined />}>

                        </Panel>
                        <Panel header="PayPal" key="PayPal">
                        </Panel>
                    </Collapse>
                </Space>
            </Card>
        );
    }
}

export default DonationComponent;