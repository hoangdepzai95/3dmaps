/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './account';
import TrendingPage from './news';
import FavoritePage from './like';
import MyPage from './map';

export const FLAG_TAB = {
  flag_popularTab: 'flag_popularTab',
  flag_trendingTab: 'flag_trendingTab',
  flag_favoriteTab: 'flag_favoriteTab',
  flag_myTab: 'flag_myTab',
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
        selectedTitleStyle={{}}
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
          {this.renderTab(PopularPage, FLAG_TAB.flag_popularTab, 'Popular', require('../../assets/images/ic_polular.png'))}
          {this.renderTab(TrendingPage, FLAG_TAB.flag_trendingTab, 'Trending', require('../../assets//images/ic_trending.png'))}
          {this.renderTab(FavoritePage, FLAG_TAB.flag_favoriteTab, 'Favorsd', require('../../assets/images/ic_favorite.png'))}
          {this.renderTab(MyPage, FLAG_TAB.flag_myTab, 'My', require('../../assets/images/ic_my.png'))}
        </TabNavigator>
      </View>
    );
  }
}
