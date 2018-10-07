/**
 * Author: iwen
 * Create Time: 2018-09-17 22:32
 * Description:
 */

import React, { Component } from 'react'
import { DeviceEventEmitter, Image, StyleSheet, View } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import TabNavigator from 'react-native-tab-navigator'
import * as Constant from '../common/Constant'
import TrendingPage from '../page/TrendingPage'
import WebViewLab from '../test/WebViewLab'
import MinePage from './MinePage'
import PopularPage from './PopularPage'

export default class HomePage extends Component {

  constructor (props) {
    super(props)
    this._registerListener.bind(this)
    this.state = {
      selectedTab: 'tb_popular'
    }
  }

  componentDidMount () {
    this._registerListener()//这里为什么一定要通过this.来引用
  }

  _registerListener () {
    this.toastListener = DeviceEventEmitter.addListener(Constant.EVENT_TOAST, (text) => {
      this.toast.show(text, DURATION.LENGTH_SHORT)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            title="最热"
            selectedTitleStyle={{color: Constant.STATUS_BAR_COLOR}}
            renderIcon={() => <Image style={styles.icon}
                                     source={require('../../res/images/ic_polular.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: Constant.STATUS_BAR_COLOR}]}
                                             source={require('../../res/images/ic_polular.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_popular'})}>

            <PopularPage {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            title="趋势"
            selectedTitleStyle={{color: Constant.STATUS_BAR_COLOR}}
            renderIcon={() => <Image style={styles.icon}
                                     source={require('../../res/images/ic_trending.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: Constant.STATUS_BAR_COLOR}]}
                                             source={require('../../res/images/ic_trending.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_trending'})}>
            <TrendingPage {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            title="收藏"
            selectedTitleStyle={{color: Constant.STATUS_BAR_COLOR}}
            renderIcon={() => <Image style={styles.icon}
                                     source={require('../../res/images/ic_favorite.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: Constant.STATUS_BAR_COLOR}]}
                                             source={require('../../res/images/ic_favorite.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_favorite'})}>

            <WebViewLab/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_mine'}
            title="我的"
            selectedTitleStyle={{color: Constant.STATUS_BAR_COLOR}}
            renderIcon={() => <Image style={styles.icon}
                                     source={require('../../res/images/ic_my.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: Constant.STATUS_BAR_COLOR}]}
                                             source={require('../../res/images/ic_my.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_mine'})}>
            <MinePage {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>

        <Toast ref={toast => this.toast = toast}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  popular: {
    flex: 1,
    backgroundColor: 'red',
  },
  trending: {
    flex: 1,
    backgroundColor: 'green',
  },
  favorite: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  mine: {
    flex: 1,
    backgroundColor: 'purple',
  },
  icon: {
    height: 22,
    width: 22
  },

})