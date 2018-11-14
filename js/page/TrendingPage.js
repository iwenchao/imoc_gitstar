/**
 * Author: iwen
 * Create Time: 2018-10-07 16:05
 * Description:
 */
import React, { Component, PropTypes } from 'react'
import { ListView, StyleSheet, View ,FlatList,RefreshControl} from 'react-native'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import * as Constant from '../common/Constant'
import DataRepository, { FLAG_STORAGE } from '../expand/dao/DataRepository'
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao'
import NavigationBar from '../widget/NavigationBar'
import TrendingCell from '../common/TrendingCell'



const API_URL = 'https://github.com/trending/';
const dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);


export default class TrendingPage extends Component {

  // 构造
  constructor (props) {
    super(props)
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language)
    // 初始状态
    this.state = {
      languages: [],
      theme: this.props.theme,
    }

    //
    this._loadLanguage()

  }

  _loadLanguage () {
    this.languageDao.fetch()
      .then((languages) => {
        if (languages) {
          this.setState({
            languages: languages,
          })
        }
      })
      .catch((error)=>{
        //
      })
  }

  render () {
    let content
    if (this.state.languages) {
      content = this.state.languages.length === 0 ? null :
        <ScrollableTabView
          tabBarBackgroundColor={Constant.STATUS_BAR_COLOR}
          tabBarInactiveTextColor='mintcream'
          tabBarActiveTextColor='white'
          tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
          renderTabBar={() => <ScrollableTabBar tabStyle={{
            paddingLeft: 2, paddingRight: 2
          }
          }/>}
          tabBarPosition='top'
        >

          {this.state.languages.map((result, i, arr) => {
            let lan = arr[i]
            return lan.checked ? <TrendingTabPage key={i} tabLabel={lan.name}
                                                  searchKey={lan.name} {...this.props}/> : null
          })
          }

        </ScrollableTabView>
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          title={'趋势'}
          style={{backgroundColor: Constant.STATUS_BAR_COLOR}}
          statusBar={{backgroundColor: Constant.STATUS_BAR_COLOR}}
        />
        {content}
      </View>
    )
  }
}

class TrendingTabPage extends Component {

  static propTypes = {
    searchKey: PropTypes.string,
  }

  // 构造
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      refreshing: false,
      projectModels:[],
      theme: this.props.theme
    }
  }

  componentDidMount () {
    this._onLoad()
  }

  _getUrl(category){//objective-c?since=daily   timeSpan.searchText
    return API_URL + category + "?"+"since=daily";
  }

  _onLoad(){
    this.setState({
      refreshing:true,
    })
    let url = this._getUrl(this.props.searchKey);
    dataRepository.fetchRepositoryByKey(url)
      .then(result=>{
        this.items = result && result.items? result.items:result?result:[];

        if(!this.items){
          return dataRepository.getNetData(url);
        }
      })
      .then((items)=>{
        if(!items||items.length === 0) return;
        this.items = items;

      })
      .catch(error=>{
        console.log(error);
        this.setState({
          refreshing:false,
        })
      })

  }

  renderRow(data) {
    const projectModel = data.item;
    return <TrendingCell
      key={projectModel.item.id}
      projectModel={projectModel}

     />
  }

  render () {
    return (
      <View style={styles.container} >
        <FlatList
          data={this.state.projectModels}
          renderItem={(data)=> this.renderRow(data)}
          keyExtractor={item => ""+(item.item.id || item.item.fullName)}
          refreshControl={
            <RefreshControl
              colors={['#2196F3']}
              tintColor={'#2196F3'}
              title={'加载中'}
              titleColor={'#2196F3'}
              refreshing={this.state.refreshing}
              onRefresh={() => this._onLoad('Java')}
            />
          }
        />


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  tips: {
    fontSize: 20
  }
})