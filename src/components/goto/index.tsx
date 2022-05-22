import React from 'react';
import '../../App.css';
import {Button, Tooltip, message } from 'antd';
import {LinkOutlined} from "@ant-design/icons";
import {isEmptyString} from "../../functions/functions";

type propType = {
    display: 'none' | 'block',
    gotoLink: string,
}

type stateType = {
    gotoLink: string,
}

interface GotoComponent {
    state: stateType,
    props: propType
}

class GotoComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            gotoLink: '',
        };
    }

    componentDidMount() {
        this.setState({
            gotoLink: this.props.gotoLink
        })
    }

    handleClick() {
        if( !isEmptyString(this.props.gotoLink) ) {
            window.open(this.props.gotoLink);
        }
        else {
            message.warning('无原网页链接');
        }
    }

    render(){
        return (
            <Tooltip title="前往图片原网页">
                <Button type="primary" shape="round" icon={<LinkOutlined />} size={'large'}
                        onClick={this.handleClick.bind(this)}
                        id={'gotoBtn'}
                        className={'frostedGlass'}
                        style={{display: this.props.display}}
                />
            </Tooltip>
        );
    }
}

export default GotoComponent;