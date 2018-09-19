/**
 * Author: iwen
 * Create Time: 2018-09-17 23:03
 * Description:
 */

import React, {Component} from 'react';
import {ListView, StyleSheet, View,RefreshControl} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import * as Constant from "../common/Constant";
import RepositoryCell from "../common/RepositoryCell";
import DataRepository from '../expand/dao/DataRepository'
import NavigationBar from "../widget/NavigationBar";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {


    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                    statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                />
                <ScrollableTabView
                    tabBarBackgroundColor={Constant.STATUS_BAR_COLOR}
                    tabBarInactiveTextColor="mintcream"
                    tabBarActiveTextColor="white"
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    renderTabBar={() => <ScrollableTabBar/>}>
                    <PopularTabPage tabLabel='前端' style={{flex: 1, backgroundColor: '#dad3e3'}}/>
                    <PopularTabPage tabLabel='安卓' style={{flex: 1, backgroundColor: '#dad3e3'}}/>
                    <PopularTabPage tabLabel='苹果' style={{flex: 1, backgroundColor: '#dad3e3'}}/>
                    <PopularTabPage tabLabel='后端' style={{flex: 1, backgroundColor: '#dad3e3'}}/>

                </ScrollableTabView>

            </View>
        );
    }
}


class PopularTabPage extends Component {


    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();

        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            refreshing:false,
        }
    }


    componentDidMount() {
        this._onLoad("Java");
    }

    _onLoad(text) {
        this.setState({
            refreshing:true
        });
        let url = this._getUrl(text);
        this.dataRepository.getNetData(url)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    refreshing:false
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                    refreshing:false
                })
            })
    }


    _getUrl(key) {
        return URL + key + QUERY_STR;
    }

    _renderRow(item) {
        return <RepositoryCell data={item}/>
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderRow(item)}
                    refreshControl={
                        <RefreshControl
                            colors={['#2196F3']}
                            tintColor={'#2196F3'}
                            title={'加载中'}
                            titleColor={'#2196F3'}
                            refreshing={this.state.refreshing}
                            onRefresh={()=>this._onLoad("Java")}
                        />
                    }
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 29
    },

});