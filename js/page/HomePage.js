/**
 * Author: iwen
 * Create Time: 2018-09-17 22:32
 * Description:
 */

import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import TabNavigator from "react-native-tab-navigator";


export default class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        title="最热"
                        selectedTitleStyle={{color: 'red'}}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require('../../res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]}
                                                         source={require('../../res/images/ic_polular.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_popular'})}>

                        <View style={styles.page1}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        title="趋势"
                        selectedTitleStyle={{color: 'green'}}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require('../../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'green'}]}
                                                         source={require('../../res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                        <View style={styles.page2}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        title="收藏"
                        selectedTitleStyle={{color: 'yellow'}}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require('../../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'yellow'}]}
                                                         source={require('../../res/images/ic_favorite.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_favorite'})}>

                        <View style={styles.page3}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_mine'}
                        title="我的"
                        selectedTitleStyle={{color: 'gray'}}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'gray'}]}
                                                         source={require('../../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_mine'})}>
                        <View style={styles.page4}/>
                    </TabNavigator.Item>
                </TabNavigator>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff'
    },
    page1: {
        flex: 1,
        backgroundColor: 'red',
    },
    page2: {
        flex: 1,
        backgroundColor: 'green',
    },
    page3: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    page4: {
        flex: 1,
        backgroundColor: 'gray',
    },
    icon: {
        height: 22,
        width: 22
    },

});