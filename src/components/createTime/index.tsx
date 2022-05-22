import React from 'react';
import '../../App.css';
import {Button, Tooltip } from 'antd';
import {CameraOutlined} from "@ant-design/icons";

type propType = {
    display: 'none' | 'block',
    createTime: string,
}

type stateType = {}

interface CreatTimeComponent {
    state: stateType,
    props: propType
}

class CreatTimeComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render(){
        return (
            <Tooltip title="拍摄时间">
                <Button shape="round" icon={<CameraOutlined />} size={'large'}
                        id={'createTimeBtn'}
                        className={'frostedGlass'}
                        style={{display: this.props.display}}
                >
                    {this.props.createTime}
                </Button>
            </Tooltip>
        );
    }
}

export default CreatTimeComponent;