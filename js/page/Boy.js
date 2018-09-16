/**
 * Author: iwen
 * Create Time: 2018-09-16 12:53
 * Description:
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Image, Text} from 'react-native';
import Girl from './Girl'
import NavigationBar from '../widget/NavigationBar'

export default class Boy extends Component{

    constructor(props){
        super(props);
        this.state={
            word:''
        }
    }


    render(){
        let what = this.state.word===''?'':'我收到了女孩的礼物:'+this.state.word;

        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'boy'}
                    statusBar={{
                        backgroundColor: 'red',

                    }}
                />


                <Text style={styles.text}>I am a boy</Text>
                <Text
                    style={styles.text}
                    onPress={()=>{
                        this.props.navigator.push({
                            component:Girl,
                            params:{
                                word:'一枝玫瑰',
                                onCallBack:(what)=>{
                                    this.setState({
                                        word:what
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
    container:{
        flex: 1,
        backgroundColor:'gray',
    },
    text:{
        fontSize:20,

    }
});