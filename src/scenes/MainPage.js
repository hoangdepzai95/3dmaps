/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    StatusBar,
} from 'react-native';
import TabView from '../lib/react-native-scrollable-tab-view';
import DefaultTabBar from '../lib/react-native-scrollable-tab-view/DefaultTabBar';

import AccountPage from './account';
import ExplorePage from './explore';
import LikePage from './like';
import MapPage from './map';
import NewsPage from './news';
import AutoCompleteSearch from '../components/AutoCompleteSearch';

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
  },
  header: {
    flex: 1,
  },
  main: {
    flex: 18,
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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AutoCompleteSearch />
        </View>
        <View style={styles.main}>
          <TabView
            renderTabBar={this.renderTabBar}
          >
            <MapPage tabLabel="HOME" />
            <LikePage tabLabel="EXPERIENCE" />
            <ExplorePage tabLabel="MAP" />
          </TabView>
        </View>
      </View>
    );
  }
}
