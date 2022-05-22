import React from 'react';
import logo from './logo.svg';
import './App.css';

import GreetComponent from './components/greet'
import WeatherComponent from './components/weather'
import DownloadComponent from './components/download'
import GotoComponent from "./components/goto";
import SearchComponent from "./components/search";
import AuthorComponent from "./components/author";
import CreatTimeComponent from "./components/createTime";

import {Layout, Row, Col, Space, Button, message} from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import {setColorTheme, setBackgroundImage} from "./functions/functions";
const {Header, Content, Footer} = Layout;

type propType = {}

type stateType = {
    imageBtnDisplay: 'none' | 'block',
    imageData: any,
    downloadLink: string,
    gotoLink: string,
    author: string,
    authorLink: string,
    createTime: string,
}

interface App {
    state: stateType,
    props: propType
}

class App extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            imageBtnDisplay: 'none',
            imageData: '',
            downloadLink: '',
            gotoLink: '',
            author: '',
            authorLink: '',
            createTime: '',
        }
    }

    componentDidMount() {
        let tempThis = this;
        setColorTheme();

        let clientId = 'ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM';
        let orientation = 'landscape';
        let imageXHR=new XMLHttpRequest();
        imageXHR.open('GET','https://api.unsplash.com/photos/random?client_id=' + clientId + '&orientation=' + orientation + '&content_filter=high');
        imageXHR.onload=function(){
            if(imageXHR.status===200){
                let imageData=JSON.parse(imageXHR.responseText);
                tempThis.setState({
                    imageBtnDisplay: 'block',
                    imageData: imageData,
                    downloadLink: imageData.links.download,
                    gotoLink: imageData.links.html,
                    author: imageData.user.name,
                    authorLink: imageData.user.links.html,
                    createTime: imageData.created_at.split('T')[0],
                }, () => {
                    setBackgroundImage(imageData)
                })
            }
            else{
                message.error('无法获取背景图片');
            }
        }
        imageXHR.onerror=function(){
            message.error('无法获取背景图片');
        }
        imageXHR.send();
    }

    render() {
        return (
            <Layout>
                <Header id={'header'}>
                    <Row>
                        <Col span={12}>
                            <Space size={'small'}>
                                <GreetComponent />
                                <WeatherComponent />
                            </Space>
                        </Col>
                        <Col span={12} style={{textAlign: 'right'}}>
                            <Space size={'small'}>
                                <DownloadComponent
                                    display={this.state.imageBtnDisplay}
                                    downloadLink={this.state.downloadLink}
                                />
                                <GotoComponent
                                    display={this.state.imageBtnDisplay}
                                    gotoLink={this.state.gotoLink}
                                />
                                {/*<Button type="primary" shape="round" icon={<SettingOutlined />} size={'large'} />*/}
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content id={'content'} className={'center'}>
                    <img className="backgroundImage" id="backgroundImage"/>
                    <SearchComponent />
                </Content>
                <Footer id={'footer'}>
                    <Row>
                        <Col span={12} offset={12} style={{textAlign: 'right'}}>
                            <Space size={'small'} align={'end'}>
                                <AuthorComponent
                                    display={this.state.imageBtnDisplay}
                                    author={this.state.author}
                                    authorLink={this.state.authorLink}
                                />
                                <CreatTimeComponent
                                    display={this.state.imageBtnDisplay}
                                    createTime={this.state.createTime}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        );
    }
}

export default App;
