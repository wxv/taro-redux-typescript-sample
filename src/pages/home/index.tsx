import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { list } from '../../actions/counter'

import './index.scss'


type PageStateProps = { counter: { list:any } }

type PageDispatchProps = {
  list: (params) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index { props: IProps }

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  list(params) {
    dispatch(list(params))
  }
}))
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }
  state:{ page:number , per_page: number}

  constructor(props) {
    super(props)
    if (Object.keys(props).length === 0) return
    this.state = { page:1 , per_page: 20}
    // this.setState(this.state)
    // this.props.initData(this.state)
    // 解决第二次加载问题，
    // 利用setState回调这样只调用一次
    this.setState(this.state, () => {
      this.props.list(this.state)
    })
  }

  
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  onReachBottom() {
    // 触发到底部
    this.state.page = this.state.page + 1
    // 设值成功之后请求数据
    this.setState(this.state, ()=> this.props.list(this.state))
  }

  render() {
    return (
      <View className='index'>
        <View className='data'>数据列表</View>
        <View className='news'>
          {
            this.props.counter.list.map((item, index) => {
              return <View className='title'>{index}.{item.title}</View>
            })
          }
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
