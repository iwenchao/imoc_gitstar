/**
 * Author: iwen
 * Create Time: 2018-09-20 22:32
 * Description:
 */

import LabelsPage from "./LabelsPage";
import React, {Component} from 'react';
import {StyleSheet, View,Text} from 'react-native';

import * as Constant from '../common/Constant'
import NavigationBar from '../widget/NavigationBar'


export default class MinePage extends Component {


    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={Constant.NAVI_TAB_MINE}
                    style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                    statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                />

                <Text onPress={() => this._gotoLabelSetting()}>标签设置</Text>
            </View>
        );
    }


    _gotoLabelSetting() {
        this.props.navigator.push({
            component:LabelsPage,
            params:{...this.props}
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});