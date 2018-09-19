/**
 * Author: iwen
 * Create Time: 2018-09-18 23:58
 * Description:
 */

import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export default class RepositoryCell extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.cell_container}
            >
                <View style={{margin: 10}}>
                    <Text style={styles.title}>{this.props.data.full_name}</Text>
                    <Text style={styles.description}>{this.props.data.description}</Text>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.subdes}>作者:</Text>
                            <Image
                                style={{height: 22, width: 22,borderRadius:2}}
                                source={{uri: this.props.data.owner.avatar_url}}
                            />
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.subdes}>关注度:</Text>
                            <Text>{this.props.data.stargazers_count}</Text>
                        </View>
                        <Image
                            style={{width: 22, height: 22,borderRadius:2}}
                            source={require('../../res/images/ic_star.png')}
                        />
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        marginBottom: 2,
        color: '#333333'
    },
    subdes:{
        fontSize:16,
        marginRight: 4
    },

    description: {
        fontSize: 16,
        color: '#666666'
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor: 'gray',
        shadowOffset: {width:0.5,height:0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 1
    }

});