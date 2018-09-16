/**
 * Author: iwen
 * Create Time: 2018-09-16 19:08
 * Description:
 */
import React, {Component, PropTypes} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';


const NAVIGATION_HEIGHT_ANDROID = 50;
const NAVIGATION_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;

const StatusBarShape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf('default', 'light-content', 'dark-content'),
    hidden: PropTypes.bool,


};


/**
 * 自定义navigator bar
 */
export default class NavigationBar extends Component {

    /**
     * 定义自定义控件的属性,以及相关属性的约束
     * @param props
     */
    static propTypes = {
        style: View.propTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        backgroundColor: PropTypes.string,
        statusBar: PropTypes.shape(StatusBarShape)
    };
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        }

    };

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            hide: false
        }
    }


    render() {
        let statusBar = <View style={styles.statusBar}>
            <StatusBar {...this.props.statusBar}/>
        </View>;
        let titleView = this.props.titleView ?
            this.props.titleView :
            <Text style={styles.title}>{this.props.title}</Text>;
        let content = <View style={styles.navBar}>

            {this.props.leftButton}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>;

        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAVIGATION_HEIGHT_IOS : NAVIGATION_HEIGHT_ANDROID,
        backgroundColor: 'red',
        flexDirection: 'row'
    },
    titleViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    }

});