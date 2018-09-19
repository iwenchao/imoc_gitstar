/**
 * Author: iwen
 * Create Time: 2018-09-16 22:07
 * Description:
 */

import React, {Component} from 'react';
import {Image, ListView, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-easy-toast';
import NavigationBar from "../widget/NavigationBar";


var data = {
    "result": [
        {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao0"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao1"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao2"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao3"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao4"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao5"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao6"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao7"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao8"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao8"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao8"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao8"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao8"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao8"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao8"
        }, {
            "email": "iwenchaos@gmail.com",
            "fullName": "iwenchao9"
        },
    ],
    "resultCode": 0,
};


class ArticleList extends Component {


    constructor(props) {
        super(props);
        // this.renderRow.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
            isLoading: true,
        };

        this.onLoad();
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={'ArticleList'}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this.renderRow(item)}
                    renderSeparator={(sID, rId, adjacentRowHighLine) => this.renderSeparator(sID, rId, adjacentRowHighLine)}
                    renderFooter={() => this.renderFooter()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.onLoad()}
                        />
                    }
                />
                <Toast ref={toast => {
                    this.toast = toast
                }}/>
            </View>
        );
    }

    renderRow(item) {
        return <View style={styles.row}>
            <TouchableOpacity onPress={() => {
                this.toast.show("你单击了:" + item.email + "  名字: " + item.fullName)
            }}>

                <Text style={styles.text}>{item.fullName}</Text>
                <Text style={styles.text}>{item.email}</Text>

            </TouchableOpacity>
        </View>
    }

    renderSeparator() {
        return <View style={styles.line}/>
    }

    renderFooter() {
        return <Image source={require('../../res/images/ic_star.png')}/>
    }

    onLoad() {
        setTimeout(() => {
            this.setState({
                isLoading: false,
            });
        }, 2000)
    }
}

export default ArticleList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    row: {
        height: 80,
    },
    text: {
        fontSize: 20
    },
    line: {
        height: 2,
        backgroundColor: 'gray'
    }
})