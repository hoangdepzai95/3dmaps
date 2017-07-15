/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import TabView from '../lib/react-native-scrollable-tab-view';
import DefaultTabBar from '../lib/react-native-scrollable-tab-view/DefaultTabBar';

import AccountPage from './account';
import ExplorePage from './explore';
import LikePage from './like';
import MapPage from './map';
import NewsPage from './news';
import HomeTab from './home';
import ExperiencePage from './experience';
import AutoCompleteSearch from '../components/AutoCompleteSearch';
import TabBar from '../components/TabBar';

export const FLAG_TAB = {
  account: 'account',
  explore: 'explore',
  like: 'like',
  map_tab: 'map_tab',
  news: 'news',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  header: {
    flex: 1,
  },
  main: {
    flex: 17,
  },
});
export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: FLAG_TAB.flag_popularTab,
    };
  }
  renderTabBar = () => {
    return (
      <DefaultTabBar
        activeTextColor="#7076eb"
        underlineStyle={{ backgroundColor: '#7076eb' }}
        style={{ borderWidth: 0, justifyContent: 'flex-end' }}
      />
    );
  }
  onChangeTab = (tab) => {
    this.tabView.gotoTab(tab);
  }
  onClickFilter = () => {
    console.log('click filter');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AutoCompleteSearch />
        </View>
        <View style={styles.main}>
          <TabBar
            renderTabBar={this.renderTabBar}
            locked={true}
            initTab="HOME"
            ref={(tabView) => { this.tabView = tabView; }}
          >
            <HomeTab tabLabel="HOME" onChangeTab={this.onChangeTab}  onClickFilter={this.onClickFilter}/>
            <ExperiencePage tabLabel="EXPERIENCE" onClickFilter={this.onClickFilter} />
            <MapPage tabLabel="MAP" />
          </TabBar>
        </View>
      </View>
    );
  }
}
