/**
 * Author: iwen
 * Create Time: 2018-09-20 23:03
 * Description:
 */

import React from "react";
import {Image, StyleSheet, TouchableOpacity} from 'react-native'

export default class ViewUtils {


    static getLeftButton(callback) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={callback}
        >
            <Image style={styles.icon_back}
                   source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
        </TouchableOpacity>
    }
}


const styles = StyleSheet.create({

    icon_back: {
        height: 26,
        width: 26,
        margin: 10,
        tintColor:'white'
    },
});