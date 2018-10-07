/**
 * Author: iwen
 * Create Time: 2018-10-07 16:05
 * Description:
 */
import React, { Component } from 'react'
import { View ,StyleSheet,DeviceEventEmitter} from 'react-native'
import * as Constant from '../common/Constant'
import NavigationBar from '../widget/NavigationBar'

export default class TrendingPage extends Component {

  // 构造
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {}
  }

  render () {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'趋势'}
          style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
          statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
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