import Taro, { Component } from '@tarojs/taro'
import { AtIcon  } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import service from '@/service/request'

import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    current: 0,
    datas: []
  }

  constructor() {
    super(...arguments);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount () {
    this.getApi()
  }

  handleSearch(){}

  handleFilter(){}
  
  handleTab(val){
    this.setState({
      current: val
    })
  }

  getApi(){
    service.get('/github/trending', {since: 'daily'}).then(res => {
      console.log(res);
      this.setState({
        datas: res.data.slice(0, 14)
      })
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='header'>
          <AtIcon value='filter' size='20' color='#666'></AtIcon>
          <View className='tab'>
            <view className={this.state.current? 'tab-item' : 'tab-item active'} onClick={_ => this.handleTab(0)}>Repos</view>
            <view className={this.state.current? 'tab-item active' : 'tab-item'} onClick={ _ => this.handleTab(1)}>Devers</view>
          </View>
          <AtIcon value='search' size='20' color='#666'></AtIcon>
        </View>
        <View className='body'>
          <PanelList datas={this.state.datas} current={this.state.current}/>
        </View>
      </View>
    )
  }
}

// 返回panel的list
function PanelList(props) {
  const datas = props.datas;
  const tabFlag = props.current;
  const listItems = datas.map((data) =>
    <View className='repos' key={data.projectURL}>
      <View className='repos-title'>
        <AtIcon prefixClass='icon' value='bookmark' size='20' color='#666'></AtIcon>
        <Text>{data.owner + '/' + data.projectName}</Text>
      </View>
      <View className='repos-intro'>{data.projectIntro}</View>
      <View className='repos-info'>
        <View className='language'>
          <Text>1100</Text>
        </View>
        <View className='star'>
          <AtIcon prefixClass='icon' value='star' size='20' color='#666'></AtIcon>
          <Text>1100</Text>
        </View>
        <View className='fork'></View>
      </View>
      <View className='repos-stars'></View>
    </View>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default Index