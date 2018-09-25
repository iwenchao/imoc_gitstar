/**
 * Author: iwen
 * Create Time: 2018-09-17 23:03
 * Description:
 */

import React, {Component, PropTypes} from 'react';
import {ListView, RefreshControl, StyleSheet, View,DeviceEventEmitter} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import * as Constant from "../common/Constant";
import RepositoryCell from "../common/RepositoryCell";
import DataRepository from '../expand/dao/DataRepository'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import NavigationBar from "../widget/NavigationBar";


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';


export default class PopularPage extends Component {


    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            tabArrays: [],
        }

    }

    componentDidMount() {
        this._onLoadLabels();
    }

    _onLoadLabels() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    tabArrays: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let content;
        if (this.state.tabArrays) {
            content = this.state.tabArrays.length === 0 ? null :
                <ScrollableTabView
                    tabBarBackgroundColor={Constant.STATUS_BAR_COLOR}
                    tabBarInactiveTextColor="mintcream"
                    tabBarActiveTextColor="white"
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    renderTabBar={() => <ScrollableTabBar tabStyle={{
                        paddingLeft: 2, paddingRight: 2
                    }}/>}
                    tabBarPosition="top"
                >


                    {this.state.tabArrays.map((result, i, arr) => {
                        let lan = arr[i];
                        return lan.checked ? <PopularTabPage key={i} tabLabel={lan.name} searchKey={lan.name}/> : null
                    })}
                </ScrollableTabView>;
        }

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                    statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                />
                {content}

            </View>
        )
            ;
    }
}


class PopularTabPage extends Component {

    static propTypes = {
        searchKey: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();

        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            refreshing: false,
        }
    }


    componentDidMount() {
        this._onLoad(this.props.searchKey);
    }

    _onLoad(text) {
        this.setState({
            refreshing: true
        });
        let url = this._getUrl(text);
        this.dataRepository
            .fetchRepositoryByKey(url)
            .then(result => {
                let items = result && result.items ? result.items : result ? result : [];

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    refreshing: false
                });
                if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                    DeviceEventEmitter.emit(Constant.EVENT_TOAST,'数据过时');
                    return this.dataRepository.getNetData(url);
                }else {
                    DeviceEventEmitter.emit(Constant.EVENT_TOAST,'命中缓存数据');
                }
            })
            .then(items => {
                if (!items || items.length === 0) {
                    return;
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                });
                DeviceEventEmitter.emit(Constant.EVENT_TOAST,'获取网络数据');
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                    refreshing: false
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
                    ref = {(listView) =>{this.listView = listView}}
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderRow(item)}
                    refreshControl={
                        <RefreshControl
                            colors={['#2196F3']}
                            tintColor={'#2196F3'}
                            title={'加载中'}
                            titleColor={'#2196F3'}
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onLoad("Java")}
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