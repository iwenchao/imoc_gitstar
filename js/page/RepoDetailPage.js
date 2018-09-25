/**
 * Author: iwen
 * Create Time: 2018-09-25 23:06
 * Description:
 */



import React, {Component} from 'react';

import {StyleSheet, WebView,View} from 'react-native';
import NavigationBar from "../widget/NavigationBar";

import * as Constant from  '../common/Constant'

const URL = 'http://www.imooc.com';

export default class RepoDetailPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            url:URL
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'WebView使用'}
                    style={{backgroundColor:Constant.STATUS_BAR_COLOR}}
                />
                <WebView
                    source={{uri:this.state.url}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});