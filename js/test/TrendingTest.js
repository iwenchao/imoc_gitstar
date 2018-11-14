/**
 * Author: iwen
 * Create Time: 2018-11-13 20:34
 * Description:
 */

import GithubTrending from 'GitHubTrending'
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import NavigationBar from '../widget/NavigationBar'

const URL = 'https://github.com/trending/'

export default class TrendingTest extends Component {

  // 构造
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      result: ""
    }

    this.githubTrending = new GithubTrending()
  }

  onLoad () {
    let url = URL + this.text
    this.githubTrending.fetchTrending(url)
      .then(result => {
        this.setState({
            result: JSON.stringify(result),
          }
        )
      })
      .catch(error => {
        this.setState({
            result: JSON.stringify(error),
          }
        )
      })
  }

  render () {

    return (
      <View>
        <NavigationBar title={'githubTrending的使用'}/>
        <TextInput style={{height: 70, borderWidth: 1}}
                   onChangeText={(text) => {
                     this.text = text
                   }
                   }
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text} onPress={() => this.onLoad()}>
            加载数据
          </Text>
          <Text style={{flex: 1}}> {this.state.result}</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 2,
    color: '#333333'
  }
})