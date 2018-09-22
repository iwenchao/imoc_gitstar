/**
 * Author: iwen
 * Create Time: 2018-09-22 20:42
 * Description:
 */

import React, {Component} from "react";
import {StyleSheet, Text, View} from 'react-native';
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
                        order.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortLabelCell data={row}/>}
                />

            </View>
        );
    }

    _onBack() {
        this.props.navigator.pop();

        // Alert.alert('提示', '要保存修改吗?', [
        //     {
        //         text: '不保存',
        //         onPress: () => {
        //             this.props.navigator.pop();
        //         },
        //         style: 'cancel'
        //     }, {
        //         text: '保存',
        //         onPress: () => {
        //             this._onSave();
        //         }
        //     }
        // ])

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

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={styles.item_container}>
                <Image
                    style={{height: 18, width: 18}}
                    source={require('../../res/images/')}
                />
                <Text>{this.props.data.name}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item_container: {
        flex: 1,
    }

})