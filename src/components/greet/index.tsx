import React from 'react';
import '../../App.css';
import {Button, message} from 'antd';
import {SmileOutlined} from "@ant-design/icons";
import {formatDate, getGreet} from "../../functions/functions";

type propType = {
    // username: string,
}

type stateType = {
    greet: string,
}

interface GreetComponent {
    state: stateType,
    props: propType
}

class GreetComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            greet: '',
        };
    }

    componentDidMount() {
        let tempThis = this;
        let tempDate = formatDate(new Date());
        let date = tempDate.year + tempDate.month + tempDate.day;

        let appId = 'cicgheqakgmpjclo'
        let appSecret = 'RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09'
        let holidayXHR=new XMLHttpRequest();
        holidayXHR.open('GET','https://www.mxnzp.com/api/holiday/single/' + date + '?app_id=' + appId + '&app_secret=' + appSecret)
        holidayXHR.onload=function() {
            if (holidayXHR.status === 200) {
                let holidayData=JSON.parse(holidayXHR.responseText);
                let holidayContent = holidayData.data.solarTerms;
                if(holidayData.data.solarTerms.indexOf('后') === -1) {
                    holidayContent = '今日' + holidayContent;
                }
                tempThis.setState({
                    greet: getGreet(new Date()) + ' | ' + holidayContent,
                })
            }
            else{
                tempThis.setState({
                    greet: getGreet(new Date()),
                })
            }
        }
        holidayXHR.onerror=function(){
            tempThis.setState({
                greet: getGreet(new Date()),
            })
        }
        holidayXHR.send();
    }

    render(){
        return (
            <Button shape="round" icon={<SmileOutlined />} size={'large'} id={'greetBtn'} className={'frostedGlass'}>
                {this.state.greet}
            </Button>
        );
    }
}

export default GreetComponent;