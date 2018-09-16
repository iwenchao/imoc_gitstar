/**
 * Author: iwen
 * Create Time: 2018-09-16 12:53
 * Description:
 */

import * as Constant from "../common/Constant";
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationBar from '../widget/NavigationBar'
import Girl from './Girl'

export default class Boy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word: ''
        }
    }


    render() {
        let what = this.state.word === '' ? '' : '我收到了女孩的礼物:' + this.state.word;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'boy'}
                    statusBar={{
                        backgroundColor: Constant.STATUS_BAR_COLOR,
                    }}
                />


                <Text style={styles.text}>I am a boy</Text>
                <Text
                    style={styles.text}
                    onPress={() => {
                        this.props.navigator.push({
                            component: Girl,
                            params: {
                                word: '一枝玫瑰',
                                onCallBack: (what) => {
                                    this.setState({
                                        word: what
                                    })
                                }
                            }
                        })
                    }}
                >我要给你送玫瑰花</Text>
                <Text style={styles.text}>{what}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    text: {
        fontSize: 20,

    }
});