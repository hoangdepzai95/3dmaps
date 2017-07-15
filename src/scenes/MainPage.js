/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Animated,
    Dimensions,
    StatusBar,
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
const { height, width } = Dimensions.get('window');
const standradHeight = (height - 25) / 17;
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
    position: 'relative',
  },
  header: {
    overflow: 'hidden',
    height: standradHeight,
  },
  main: {
    flex: 1,
  },
});
export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: FLAG_TAB.flag_popularTab,
    };
    this.headerHeight = new Animated.Value(0);
    this.marginTop = new Animated.Value(0);
    this.scrollY = new Animated.Value(0);
    this.prevOffsetY = 0;
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
    this.scrollY.setValue(0);
  }
  onClickFilter = () => {
    console.log('click filter');
  }
  showHeader() {
    this.headerHeightAnimation = Animated.timing(this.headerHeight, {
      toValue: -standradHeight - 25,
      duration: 100,
    });
    this.marginTopAnimation = Animated.timing(this.marginTop, {
      toValue: -standradHeight,
      duration: 100,
    });
    this.playAnimation();
  }
  playAnimation() {
    Animated.parallel([this.headerHeightAnimation, this.marginTopAnimation]).start();
  }
  hideHeader() {
    this.headerHeightAnimation = Animated.timing(this.headerHeight, {
      toValue: 0,
      duration: 100,
    });
    this.marginTopAnimation = Animated.timing(this.marginTop, {
      toValue: 0,
      duration: 100,
    });
    this.playAnimation();
  }
  onScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if ((offsetY - this.prevOffsetY) > height/10) {
      this.showHeader();
      this.prevOffsetY = offsetY;
    }
    if ((offsetY - this.prevOffsetY) < -height/10) {
      this.hideHeader();
      this.prevOffsetY = offsetY;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.View style={[styles.header, { top: this.headerHeight}]}>
          <AutoCompleteSearch />
        </Animated.View>
        <Animated.View style={[styles.main, { marginTop: this.marginTop }]}>
          <TabBar
            renderTabBar={this.renderTabBar}
            locked={true}
            initTab="home"
            scrollY={this.scrollY}
            onClickFilter={this.onClickFilter}
            onChangeTab={this.onChangeTab}
            onScroll={this.onScroll}
            ref={(tabView) => { this.tabView = tabView; }}
          >
            <HomeTab
              tabLabel="HOME"
              tabId="home"
            />
            <ExperiencePage
            tabLabel="EXPERIENCE"
            tabId="experience"
            />
            <MapPage tabLabel="MAP" tabId="map"/>
          </TabBar>
        </Animated.View>
      </View>
    );
  }
}
