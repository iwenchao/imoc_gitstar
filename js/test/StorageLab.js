/**
 * Author: iwen
 * Create Time: 2018-09-19 22:58
 * Description: 本地存储实验室
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View,AsyncStorage} from 'react-native';
import NavigationBar from "../widget/NavigationBar";
import Toast,{DURATION} from 'react-native-easy-toast';

const KEY = 'storage_key';


export default class StorageLab extends Component {


    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={"AsyncStorage使用"}
                    style={{backgroundColor: '#6495ed'}}
                />

                <TextInput
                    style={{borderWidth: 1, height: 50}}
                    onChangeText={(text)=>this.text = text}
                />

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text
                        style={styles.tips}
                        onPress={() => this.onSave()}
                    >
                        保存
                    </Text>
                    <Text
                        style={styles.tips}
                        onPress={() => this.onDelete()}
                    >
                        删除
                    </Text>
                    <Text style={styles.tips}
                          onPress={() => this.onGet()}
                    >
                        取出
                    </Text>
                </View>

                <Toast ref={toast=>this.toast=toast}/>
            </View>
        );
    }

    onSave() {
        AsyncStorage.setItem(KEY,this.text,(error)=>{
            if(!error){
                this.toast.show("保存成功",DURATION.LENGTH_SHORT);
            }else {
                this.toast.show("保存失败",DURATION.LENGTH_SHORT);
            }
        })
    }

    onDelete() {
        AsyncStorage.removeItem(KEY,(error)=>{
            if(!error){
                this.toast.show("删除成功",DURATION.LENGTH_SHORT);
            }else {
                this.toast.show("删除失败",DURATION.LENGTH_SHORT);
            }
        });
    }

    onGet() {
       AsyncStorage.getItem(KEY,(error,result)=>{
           if(!error){
               if(result){
                   this.toast.show("取出了:"+result);
               }else {
                   this.toast.show("没有找到");
               }
           }else {
               this.toast.show("取出失败");
           }
       });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 22,
        color: "black",
        margin: 6
    }
});