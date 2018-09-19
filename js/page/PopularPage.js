/**
 * Author: iwen
 * Create Time: 2018-09-17 23:03
 * Description:
 */

import RepositoryCell from "../common/RepositoryCell";
import React, {Component} from 'react';
import {ListView, StyleSheet, Text, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
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
                    style={{backgroundColor: '#6495ED'}}
                />
                <ScrollableTabView renderTabBar={() => <ScrollableTabBar/>}>
                    <PopularTabPage tabLabel='html' style={{flex: 1, backgroundColor: '#dad3e3'}}/>
                    <PopularTabPage tabLabel='android' style={{flex: 1, backgroundColor: '#dad3e3'}}/>
                    <PopularTabPage tabLabel='javaScript' style={{flex: 1, backgroundColor: '#dad3e3'}}/>
                    <PopularTabPage tabLabel='python' style={{flex: 1, backgroundColor: '#dad3e3'}}/>

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
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }


    componentDidMount() {
        this._onLoad("Java");
    }

    _onLoad(text) {
        let url = this._getUrl(text);
        this.dataRepository.getNetData(url)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
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