import Taro, { Component } from '@tarojs/taro'
import { AtIcon  } from 'taro-ui'
import { View, Text, Image } from '@tarojs/components'
import service from '@/service/request'
import nonPic from '@/assets/gitnon.png'
import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    current: 0,
    datas: [],
  }

  constructor() {
    super(...arguments);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }

  componentDidMount () {
    // this.getApi()
  }

  handleSearch(){}

  handleFilter(){}
  
  handleTab(val){
    this.setState({
      current: val
    })
  }

  getApi(){
    Taro.showLoading({
      title: 'loading'
    })
    service.get('/github/trending', {since: 'weekly'}).then(res => {
      Taro.hideLoading()
      this.setState({
        datas: res.data.slice(0, 14)
      })
    }).catch(_ => {
      Taro.hideLoading()
    })
  }

  render () {
    const listItems = this.state.datas.map((data) =>
      <View className='repos' key={data.projectURL}>
        <View className='repos-title'>
          <AtIcon prefixClass='icon' value='bookmark' size='18' color='#666'></AtIcon>
          <Text>{data.owner + ' / ' + data.projectName}</Text>
        </View>
        <View className='repos-intro'>{data.projectIntro}</View>
        <View className='repos-info'>
          {data.language && 
            <View className='language-box'>
              <Text className='language-type' style={{backgroundColor: data.languageColor}}></Text>
              <Text className='language'>{data.language}</Text>
            </View>
          }
          <View className='star'>
            <AtIcon prefixClass='icon' value='star' size='12' color='#666'></AtIcon>
            <Text>{data.starNum || '0'}</Text>
          </View>
          <View className='fork'>
            <AtIcon prefixClass='icon' value='tree' size='12' color='#666'></AtIcon>
            <Text>{data.forkNum || '0'}</Text>
          </View>
        </View>
        <View className='repos-stars'>
          <AtIcon prefixClass='icon' value='star' size='12' color='#666'></AtIcon>
          <Text>{data.starSince}</Text>
        </View>
      </View>
    );
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
          {this.state.datas.length == 0 ? 
            <View className='non-data'>
              <Image src={nonPic} />
              <Text>Oops! Nothing here...</Text>
            </View> :
            {listItems}
          }
        </View>
      </View>
    )
  }
}

export default Index