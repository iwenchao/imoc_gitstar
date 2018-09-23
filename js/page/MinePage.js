/**
 * Author: iwen
 * Create Time: 2018-09-20 22:32
 * Description:
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Constant from "../common/Constant";
import NavigationBar from '../widget/NavigationBar'

import EditLabelsPage from "./EditLabelsPage";
import LabelsPage from "./LabelsPage";


export default class MinePage extends Component {


    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={Constant.NAVI_TAB_MINE}
                    style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                    statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                />

                <Text style={styles.item} onPress={() => this._gotoLabelSetting()}>标签设置</Text>
                <Text style={styles.item} onPress={() => this._gotoSortLabelSetting()}>标签排序设置</Text>
                <Text style={styles.item} onPress={() => this._gotoDelLabelSetting()}>标签移除</Text>
            </View>
        );
    }


    _gotoLabelSetting() {
        this.props.navigator.push({
            component: LabelsPage,
            params: {...this.props}
        })
    }

    _gotoSortLabelSetting() {
        this.props.navigator.push({
            component: EditLabelsPage,
            params: {...this.props}
        })
    }

    _gotoDelLabelSetting() {
        this.props.navigator.push({
            component: LabelsPage,
            params: {...this.props, isRemoveable: true}
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        margin: 10
    }
});