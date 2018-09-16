/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Image,Navigator,ListView} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Boy from './js/page/Boy'
import ArticleList from './js/page/ArticleList'

export default class imoc_gitstar extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <View style={styles.container}>
               {/* <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        title="最热"
                        selectedTitleStyle={{color:'red'}}
                        renderIcon={() => <Image style={styles.icon} source={require('./res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor :'red'}]} source={require('./res/images/ic_polular.png')}/>}
                        badgeText="1"
                        onPress={() => this.setState({selectedTab: 'tb_popular'})}>

                        <View style={styles.page1}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        title="趋势"
                        selectedTitleStyle={{color:'green'}}
                        renderIcon={() => <Image style={styles.icon} source={require('./res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor :'green'}]} source={require('./res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        title="收藏"
                        selectedTitleStyle={{color:'red'}}
                        renderIcon={() => <Image style={styles.icon} source={require('./res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor :'red'}]} source={require('./res/images/ic_polular.png')}/>}
                        badgeText="1"
                        onPress={() => this.setState({selectedTab: 'tb_favorite'})}>

                        <View style={styles.page1}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_mine'}
                        title="我的"
                        selectedTitleStyle={{color:'green'}}
                        renderIcon={() => <Image style={styles.icon} source={require('./res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor :'green'}]} source={require('./res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_mine'})}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>
                </TabNavigator>
                <Navigator
                    initialRoute={
                        { component:ArticleList}
                    }
                    renderScene={(route,navigator)=>{
                        let Component = route.component;
                        return <Component navigator={navigator} {...route.params}/>
                    }}
                >

                </Navigator>*/}
                <ArticleList/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5fcff'
    },
    page1:{
        flex:1,
        backgroundColor: 'red',
    },
    page2:{
        flex:1,
        backgroundColor: 'green',
    },
    icon:{
        height: 22,
        width: 22
    },

});

AppRegistry.registerComponent('imoc_gitstar', () => imoc_gitstar);
