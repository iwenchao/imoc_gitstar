/**
 * Author: iwen
 * Create Time: 2018-09-16 12:53
 * Description:
 */


import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Constant from '../common/Constant';
import NavigationBar from '../widget/NavigationBar';

class Girl extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    _setActionImg(image) {
        return <TouchableOpacity onPress={() => {
            this.props.navigator.pop();
        }}>
            <Image
                style={{width: 22, height: 22, margin: 10}}
                source={image}/>
        </TouchableOpacity>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'girl'}
                    style={{
                        backgroundColor: 'green',
                    }}
                    statusBar={{
                        backgroundColor: Constant.STATUS_BAR_COLOR,

                    }}
                    leftButton={
                        this._setActionImg(require('../../res/images/ic_arrow_back_white_36pt.png'))
                    }
                    rightButton={
                        this._setActionImg(require('../../res/images/ic_star.png'))
                    }

                />
                <Text style={styles.text}> I am a girl</Text>
                <Text style={styles.text}>我收到了男孩送的:{this.props.word}</Text>
                <Text style={styles.text}
                      onPress={() => {
                          this.props.onCallBack('一盒巧克力');
                          this.props.navigator.pop()
                      }}
                >回赠</Text>
            </View>
        );
    }
}

export default Girl;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    text: {
        fontSize: 22
    }
})