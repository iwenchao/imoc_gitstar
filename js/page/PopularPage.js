/**
 * Author: iwen
 * Create Time: 2018-09-17 23:03
 * Description:
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,TextInput} from 'react-native';
import DataRepository from '../expand/dao/DataRepository'
import NavigationBar from "../widget/NavigationBar";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {


    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();

        this.state = {
            result:''
        }
    }

    onLoad(text) {
        let url = this.getUrl(text);
        this.dataRepository.getNetData(url)
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)
                })
            })
    }


    getUrl(key){
        return URL+key+QUERY_STR;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{backgroundColor: '#6495ED'}}
                />

                <Text
                    style={styles.tips}
                    onPress={() => {
                        this.onLoad(this.inputText)
                    }}
                >获取数据</Text>

                <TextInput
                    style={{height: 40,borderWidth: 1,margin: 10}}
                    onChangeText={(text) => {
                        this.inputText = text;
                    }}
                />

                <Text style={{fontSize: 20,height:1000}}>{this.state.result}</Text>
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

})