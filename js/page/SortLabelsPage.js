/**
 * Author: iwen
 * Create Time: 2018-09-22 20:42
 * Description:
 */

import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import * as Constant from "../common/Constant";
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import ArrayUtils from '../util/ArrayUtils'
import ViewUtils from "../util/ViewUtils";
import NavigationBar from "../widget/NavigationBar";

export default class SortLabelsPage extends Component {


    // 构造
    constructor(props) {
        super(props);
        //初始变量
        this.dataArrays = [];
        this.sortedResultArray = [];
        this.originalCheckedArray = [];

        //
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);

        // 初始状态
        this.state = {
            checkedArray: [],
        };
    }


    componentDidMount() {
        this._loadLabels();

    }


    render() {
        return (
            <View style={styles.container}>

                <NavigationBar
                    title="标签排序"
                    style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                    statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
                    leftButton={ViewUtils.getLeftButton(() => {
                        this._onBack();
                    })}

                />

                <SortableListView
                    style={{flex: 1}}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortLabelCell data={row}/>}
                />

            </View>
        );
    }

    _onBack() {
        if (!ArrayUtils.isEqual(this.state.checkedArray, this.originalCheckedArray)) {
            //保存排序后的数据
            this._saveSortedResult();
        }
        this.props.navigator.pop();

    }

    _saveSortedResult() {
        this.sortedResultArray = ArrayUtils.clone(this.dataArrays);
        for (let i = 0; i < this.originalCheckedArray.length; i++) {
            let item = this.originalCheckedArray[i];
            let itemIndex = this.originalCheckedArray.indexOf(item);
            this.sortedResultArray.splice(itemIndex, 1, this.state.checkedArray);
        }
        this.languageDao.save(this.sortedResultArray)
    }


    _loadLabels() {
        this.languageDao.fetch()
            .then(result => {
                //处理数据
                this._getCheckedLabels(result);
            })
            .catch(err => {

            })
    }

    _getCheckedLabels(datas) {
        this.dataArrays = datas;
        let checkedArr = [];

        for (let i = 0, len = datas.length; i < len; i++) {
            let item = datas[i];
            if (item.checked) {
                checkedArr.push(item);
            }
        }
        this.setState({
            checkedArray: checkedArr
        });
        this.originalCheckedArray = ArrayUtils.clone(checkedArr);
    }
}

class SortLabelCell extends Component {


    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={styles.item_container}
                {...this.props.sortHandlers}
            >


                <View style={styles.row}>
                    <Image
                        style={styles.item_img}
                        source={require('../../res/images/ic_sort_list.png')}
                    />
                    <Text style={{margin: 8}}>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item_container: {
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
        padding: 10

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    item_img: {
        height: 16,
        width: 16,
        margin: 8,
        tintColor: Constant.STATUS_BAR_COLOR
    }

})