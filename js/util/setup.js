/**
 * Author: iwen
 * Create Time: 2018-09-17 22:04
 * Description:
 */

import React, {Component} from 'react';
import {Navigator} from 'react-native';
import WelcomePage from "../page/WelcomePage";


function setup() {
    //进行一些初始化配置, 根组件,
    class Root extends Component {

        _renderScene(route, navigator) {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator}/>
        }


        render() {
            return (
                <Navigator
                    initialRoute={{
                        component: WelcomePage
                    }}
                    renderScene={(route, navigator) =>
                        this._renderScene(route, navigator)
                    }
                />

            );
        }
    }

    return <Root/>
}


module.exports = setup;