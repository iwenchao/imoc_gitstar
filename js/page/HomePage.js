/**
 * Author: iwen
 * Create Time: 2018-09-17 22:32
 * Description:
 */

import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import TabNavigator from "react-native-tab-navigator";
import PopularPage from "./PopularPage";


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

                        <PopularPage />
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
                        <View style={styles.trending}/>
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

                        <View style={styles.favorite}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_mine'}
                        title="我的"
                        selectedTitleStyle={{color: 'purple'}}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'purple'}]}
                                                         source={require('../../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_mine'})}>
                        <View style={styles.mine}/>
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

});