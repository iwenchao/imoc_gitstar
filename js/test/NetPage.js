/**
 * Author: iwen
 * Create Time: 2018-09-16 23:15
 * Description:
 */

import NavigationBar from "../widget/NavigationBar";
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class NetPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            result: '',
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={'Fetch使用'}/>
                <Text onPress={() => {
                    this.onLoad('http:www.baidu.com');
                }}>获取数据</Text>

                <Text>{this.state.result}</Text>
            </View>
        );
    }

    onLoad(url) {
        fetch(url)
            .then(response => response.json())
            .then(r => {
                this.setState({
                    result:"正确数据: "+JSON.stringify(r),
                })
            })
            .catch(error=>{
                this.setState({
                    result:"错误数据: "+JSON.stringify(error),
                })
            })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});