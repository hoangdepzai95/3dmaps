/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import AccountPage from './account';
import ExplorePage from './explore';
import LikePage from './like';
import MapPage from './map';
import NewsPage from './news';

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
  tabBarIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  tabBarSelectedIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: 'red',
  },
  tabTitle: {
    color: 'red',
  },
});
export default class MainPage extends Component {
  static renderTabIcon(icon) {
    return (
      <Image
        style={styles.tabBarIcon}
        source={icon}
      />
    );
  }
  static renderSelectedTabIcon(icon) {
    return (
      <Image
        style={styles.tabBarSelectedIcon}
        source={icon}
      />
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: FLAG_TAB.flag_popularTab,
    };
  }
  onSelected(selected) {
    this.setState({
      selectedTab: selected,
    });
  }
  renderTab(TabComponent, selectedTab, title, icon) {
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === selectedTab}
        title={title}
        selectedTitleStyle={styles.tabTitle}
        renderIcon={MainPage.renderTabIcon.bind(this, icon)}
        renderSelectedIcon={MainPage.renderSelectedTabIcon.bind(this, icon)}
        onPress={this.onSelected.bind(this, selectedTab)}
      >
        <TabComponent {...this.props} homeComponent={this} />
      </TabNavigator.Item>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator
          tabBarStyle={{ opacity: 0.9 }}
          sceneStyle={{ paddingBottom: 0 }}
        >
          {this.renderTab(ExplorePage, FLAG_TAB.explore, 'Explore', require('../../assets/images/ic_polular.png'))}
          {this.renderTab(MapPage, FLAG_TAB.map_tab, 'Map', require('../../assets//images/ic_trending.png'))}
          {this.renderTab(LikePage, FLAG_TAB.like, 'Like', require('../../assets/images/ic_favorite.png'))}
          {this.renderTab(NewsPage, FLAG_TAB.news, 'Tips', require('../../assets/images/ic_my.png'))}
          {this.renderTab(AccountPage, FLAG_TAB.account, 'Account', require('../../assets/images/ic_my.png'))}
        </TabNavigator>
      </View>
    );
  }
}
