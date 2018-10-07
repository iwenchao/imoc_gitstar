/**
 * Author: iwen
 * Create Time: 2018-09-25 23:06
 * Description:
 */

import React, { Component } from 'react'
import { StyleSheet, View, WebView ,DeviceEventEmitter} from 'react-native'

import * as Constant from '../common/Constant'
import ViewUtils from '../util/ViewUtils'
import NavigationBar from '../widget/NavigationBar'


export default class RepoDetailPage extends Component {
  // 构造
  constructor (props) {
    super(props)
    this.url = this.props.data.html_url;
    this.title = this.props.data.full_name;
    // 初始状态
    this.state = {
      url: this.url,
      title: this.title,
      canGoBack: false
    }
  }

  componentDidMount () {
  }

  _onBack () {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      this.props.navigator.pop()
    }
  }

  _onNavigationStateChange (e) {
    this.setState({
      canGoBack: e.canGoBack,
      url: e.url
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.title}
          style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
          statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
          leftButton={ViewUtils.getLeftButton(() => {
            this._onBack()
          })}
        />
        <WebView
          ref={webView => this.webView = webView}
          source={{uri: this.url}}
          onNavigationStateChange={(e) => this._onNavigationStateChange(e)}
          startInLoadingState={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

})