import React from 'react';
import '../../App.css';
import {Button, Tooltip, message } from 'antd';
import {DownloadOutlined} from "@ant-design/icons";
import {isEmptyString} from "../../functions/functions";

type propType = {
    display: 'none' | 'block',
    downloadLink: string,
}

type stateType = {
    downloadLink: string,
}

interface DownloadComponent {
    state: stateType,
    props: propType
}

class DownloadComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            downloadLink: '',
        };
    }

    componentDidMount() {
        this.setState({
            downloadLink: this.props.downloadLink
        })
    }

    handleClick() {
        if( !isEmptyString(this.props.downloadLink) ) {
            window.open(this.props.downloadLink);
        }
        else {
            message.warning('无下载链接');
        }
    }

    render(){
        return (
            <Tooltip title="下载图片">
                <Button shape="round" icon={<DownloadOutlined />}  size={'large'}
                        onClick={this.handleClick.bind(this)}
                        id={'downloadBtn'}
                        className={'frostedGlass'}
                        style={{display: this.props.display}}
                />
            </Tooltip>
        );
    }
}

export default DownloadComponent;