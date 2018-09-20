/**
 * Author: iwen
 * Create Time: 2018-09-20 22:50
 * Description:
 */


import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import * as Constant from '../common/Constant'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import ViewUtils from "../util/ViewUtils";
import NavigationBar from '../widget/NavigationBar'

export default class LabelsPage extends Component {


    constructor(props) {
        super(props)
        this.lanDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
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
                this.setState({
                    labelArrays: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }



    renderLabel(){
        if(!this.state.labelArrays || this.state.labelArrays.length ===0){
            return;
        }
        let len = this.state.labelArrays.length;
        let labelViews = [];
        for (let i = 0,size = len -2; i < size; i+=2) {
            labelViews.push(
                <View key={i}>
                    <View style={styles.item}>
                        <Text>{this.state.labelArrays[i].name}</Text>
                        <Text>{this.state.labelArrays[i+1].name}</Text>
                    </View>
                    <View style={styles.line}>
                        <Text>{this.state.labelArrays[i].name}</Text>
                        <Text>{this.state.labelArrays[i+1].name}</Text>
                    </View>
                </View>
            )
        }
        labelViews.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2===0?<Text>{this.state.labelArrays[len-2].name}</Text>:null}
                    <Text>{this.state.labelArrays[len-1].name}</Text>
                </View>
            </View>
        );



        return labelViews;
    }

    _onBack() {
        this.props.navigator.pop();
    }

    _onSave() {

    }

    render() {
        let rightButton = <TouchableOpacity
            style={{padding: 8}}
            onPress={this._onSave()}
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
    line:{
        height: 1,
        backgroundColor:'black'
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'center'
    }
});