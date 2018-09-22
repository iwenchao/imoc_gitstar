/**
 * Author: iwen
 * Create Time: 2018-09-20 22:50
 * Description:
 */


import React, {Component} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from 'react-native-check-box';

import * as Constant from '../common/Constant'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import ViewUtils from "../util/ViewUtils";
import NavigationBar from '../widget/NavigationBar'

export default class LabelsPage extends Component {


    constructor(props) {
        super(props);
        this._onBack.bind(this);
        this._onSave.bind(this);
        this.lanDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changedValues = [];
        this.allLabels = [];
        this.state = {
            labelArrays: []
        }
    }

    componentDidMount() {
        this.onLoadLabels();
    }


    onLoadLabels() {
        this.lanDao.fetch()
            .then(result => {
                this.allLabels = result;
                this.setState({
                    labelArrays: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    renderLabel() {
        if (!this.state.labelArrays || this.state.labelArrays.length === 0) {
            return;
        }
        let len = this.state.labelArrays.length;
        let labelViews = [];
        for (let i = 0, size = len - 2; i < size; i += 2) {
            labelViews.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this._renderCheckBox(this.state.labelArrays[i])}
                        {this._renderCheckBox(this.state.labelArrays[i + 1])}
                    </View>
                    <View style={styles.line}>
                    </View>
                </View>
            )
        }
        labelViews.push(
            <View key={len - 1}>
                <View style={styles.line}>
                </View>
                <View style={styles.item}>
                    {len % 2 === 0 ? this._renderCheckBox(this.state.labelArrays[len - 2]) : null}
                    {this._renderCheckBox(this.state.labelArrays[len - 1])}
                </View>

            </View>
        );


        return labelViews;
    }


    _renderCheckBox(itemData) {
        let leftName = itemData.name;
        return (
            <CheckBox
                isChecked={itemData.checked}
                style={{flex: 1, padding: 10}}
                onClick={() => this._onItemClick(itemData)}
                leftText={leftName}
                checkedImage={<Image
                    style={styles.checkbox}
                    source={require('../../res/images/ic_check_box.png')}/>}
                unCheckedImage={<Image
                    style={styles.checkbox}
                    source={require('../../res/images/ic_check_box_outline_blank.png')}/>}
            />
        );
    }


    _onItemClick(itemData) {

        if (this.allLabels) {
            for (let i = 0, len = this.allLabels.length; i < len; i++) {
                let tmp = this.allLabels[i];
                if (tmp === itemData) {
                    tmp.checked = !itemData.checked;
                    break;
                }
            }
        }
        //这里需要将操作后的数据重新setState
        this.setState({
            labelArrays: this.allLabels
        });
        //这里需要记录本次修改的结果
        for (let i = 0, len = this.changedValues.length; i < len; i++) {
            let tmp = this.changedValues[i];
            if (tmp === itemData) {
                this.changedValues.splice(i, 1);
                return;
            }
        }
        this.changedValues.push(itemData);
    }

    _onBack() {
        if (this.changedValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert('提示', '要保存修改吗?', [
            {
                text: '不保存',
                onPress: () => {
                    this.props.navigator.pop();
                },
                style: 'cancel'
            }, {
                text: '保存',
                onPress: () => {
                    this._onSave();
                }
            }
        ])

    }

    /**
     * 这里有个问题:
     * @private
     */
    _onSave() {
        this.lanDao.save(this.props.allLabels);
        this.props.navigator.pop();

    }


    render() {
        let rightButton = <TouchableOpacity
            style={{padding: 8}}
            onPress={() => this._onSave()}
        >
            <Text style={styles.icon_save}>保存</Text>
        </TouchableOpacity>;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={Constant.STATUS_TITLE_LABELS}
                    style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                    statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                    leftButton={ViewUtils.getLeftButton(() => {
                        this._onBack();
                    })}
                    rightButton={rightButton}

                />

                <ScrollView>
                    {this.renderLabel()}

                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon_save: {
        fontSize: 18,
        color: 'white',
        margin: 10
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 10,
        tintColor: Constant.STATUS_BAR_COLOR
    }
});