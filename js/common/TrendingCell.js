/**
 * Author: iwen
 * Create Time: 2018-11-13 21:59
 * Description:
 */

import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class TrendingCell extends Component {

  // 构造
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {}
  }

  render () {

    let data = this.props.projectModel.item? this.props.projectModel.item:this.props.projectModel;

    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
        style={styles.container}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>{data.fullName}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <View style={styles.builder_images_wrapper}>
            <Text>Build by:</Text>
            {
              data.contributors.map((result, i, arr) => {
                return <Image style={{height: 22, width: 22}} source={{uri: arr[i]}} key={i}/>
              })
            }
            <Image
              style={{width: 22, height: 22, borderRadius: 2}}
              source={require('../../res/images/ic_star.png')}
            />
          </View>
        </View>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,

  },
  title: {
    fontSize: 18,
    marginBottom: 2,
    color: '#333333'
  },
  description: {
    fontSize: 16,
    color: '#666666'
  },
  builder_images_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})