/**
 * Author: iwen
 * Create Time: 2018-09-17 22:23
 * Description:
 */


import HomePage from "../page/HomePage";
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationBar from '../widget/NavigationBar'

/**
 * 欢迎页,轮播图
 */
export default class WelcomePage extends Component {


    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigator.resetTo({
                component: HomePage
            })
        }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }


    render() {
        return (
            <View>
                <NavigationBar
                    title={'欢迎'}
                />
                <Text>欢迎</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({})