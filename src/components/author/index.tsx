import React from 'react';
import '../../App.css';
import {Button, Tooltip, message } from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {isEmptyString} from "../../functions/functions";

type propType = {
    display: 'none' | 'block',
    author: string,
    authorLink: string,
}

type stateType = {
    authorLink: string,
}

interface AuthorComponent {
    state: stateType,
    props: propType
}

class AuthorComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            authorLink: '',
        };
    }

    componentDidMount() {

    }

    handleClick() {
        if( !isEmptyString(this.props.authorLink) ) {
            window.open(this.props.authorLink);
        }
        else {
            message.warning('无图片作者网页链接');
        }
    }

    render(){
        return (
            <Tooltip title="前往图片作者网页">
                <Button type="primary" shape="round" icon={<UserOutlined />} size={'large'}
                        onClick={this.handleClick.bind(this)}
                        id={'authorBtn'}
                        className={'frostedGlass'}
                        style={{display: this.props.display}}
                >
                    {this.props.author}
                </Button>
            </Tooltip>
        );
    }
}

export default AuthorComponent;