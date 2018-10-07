/**
 * Author: iwen
 * Create Time: 2018-09-25 23:06
 * Description:
 */

import React, { Component } from 'react'

import { StyleSheet, View, WebView } from 'react-native'

import * as Constant from '../common/Constant'
import ViewUtils from '../util/ViewUtils'
import NavigationBar from '../widget/NavigationBar'

const URL = 'http://www.imooc.com'

export default class RepoDetailPage extends Component {
  // 构造
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      url: URL
    }
  }

  _onBack () {
    this.props.navigator.pop()
  }

  componentDidMount () {
  }

  render () {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'WebView使用'}
          style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
          statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
          leftButton={ViewUtils.getLeftButton(() => {
            this._onBack()
          })}
        />
        <WebView
          source={{uri: this.props.item.html_url}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})