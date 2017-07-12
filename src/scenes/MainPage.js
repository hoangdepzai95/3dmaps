/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import TabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from 'react-native-scrollable-tab-view/DefaultTabBar';

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
        <TabView
          renderTabBar={this.renderTabBar}
        >
          <MapPage tabLabel="HOME" />
          <LikePage tabLabel="EXPERIENCE" />
          <ExplorePage tabLabel="MAP" />
          <NewsPage tabLabel="MAPs" />
        </TabView>
      </View>
    );
  }
}
