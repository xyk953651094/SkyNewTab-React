import React from 'react';
import '../../App.css';
import {Input, Select, Row } from 'antd';
import {SearchOutlined} from "@ant-design/icons";
const { Option } = Select;
const { Search } = Input;

type propType = {}

type stateType = {
    searchValue: string
    showMask: 'none' | 'block'
}

interface SearchComponent {
    state: stateType,
    props: propType
}

class SearchComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: '',
            showMask: 'none'
        };
    }

    searchEngine = 'https://www.bing.com/search?q='; // 默认必应搜索引擎

    selectBefore = (
        <Select defaultValue="Bing" className="select-before" onSelect={this.onSelect.bind(this)}>
            <Option value="Bing">必应</Option>
            <Option value="Baidu">百度</Option>
            <Option value="Google">谷歌</Option>
        </Select>
    );

    componentDidMount() {

    }

    onSelect(value: string) {
        switch (value) {
            case 'Bing':
                this.searchEngine = 'https://www.bing.com/search?q=';
                break;
            case 'Baidu':
                this.searchEngine = 'https://www.baidu.com/s?wd=';
                break;
            case 'Google':
                this.searchEngine = 'https://www.google.com/search?q=';
                break;
        }
    }

    onFocus() {
        this.setState({
            showMask: 'block'
        })
    }

    onBlur() {
        this.setState({
            showMask: 'none'
        })
    }

    onSearch(value: string) {
        window.location.href = this.searchEngine + value;
    }

    render(){
        return (
            <Row>
                <div className="mask" id="mask" style={{display:this.state.showMask}}/>
                <Search
                    id={'searchInput'}
                    addonBefore={this.selectBefore}
                    placeholder="请输入搜索内容"
                    allowClear
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                    size="large"
                />
            </Row>
        );
    }
}

export default SearchComponent;