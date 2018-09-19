/**
 * Author: iwen
 * Create Time: 2018-09-18 23:58
 * Description:
 */

import React, {Component} from 'react';
import {ListView, StyleSheet, Text, View,Image} from 'react-native';


export default class RepositoryCell extends Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize:20}}>{this.props.data.full_name}</Text>
                <Text>{this.props.data.description}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Author:</Text>
                        <Image
                            style={{height: 22,width: 22}}
                            source={{uri:this.props.data.owner.avatar_url}}
                        />
                    </View>

                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        <Text>Stars:</Text>
                        <Text>{this.props.data.stargazers_count}</Text>
                    </View>
                    <Image
                        style={{width:22,height:22}}
                        source={require('../../res/images/ic_star.png')}
                    />
                </View>

                <Text>{this.props.data.owner.avatar_url}</Text>
                <Text>{this.props.data.stargazers_count}</Text>
            </View>
        );
    }
}