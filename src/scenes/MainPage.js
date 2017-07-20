/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
} from 'react-native';
import I18n from 'i18n-js';

import MapPage from './map';
import HomeTab from './home';
import ExperiencePage from './experience';
import AutoCompleteSearch from '../components/AutoCompleteSearch';
import TabBar from '../components/TabBar';

const { height } = Dimensions.get('window');

const standradHeight = (height - 25) / 17;

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
    this.headerHeight = new Animated.Value(0);
    this.marginTop = new Animated.Value(0);
    this.prevOffsetY = 0;
  }
  onTabViewMounted = (tabView) => {
    this.tabView = tabView;
  }
  onChangeTab = (tab) => {
    this.tabView.gotoTab(tab);
  }
  onPressFilter = () => {
  }
  onScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if ((offsetY - this.prevOffsetY) > height / 5) {
      this.hideHeader();
      this.prevOffsetY = offsetY;
    }
    if ((offsetY - this.prevOffsetY) < -height / 5) {
      this.showHeader();
      this.prevOffsetY = offsetY;
    }
  }
  hideHeader = () => {
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
  showHeader = () => {
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
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, { top: this.headerHeight }]}>
          <AutoCompleteSearch />
        </Animated.View>
        <Animated.View style={[styles.main, { marginTop: this.marginTop }]}>
          <TabBar
            initTab="home"
            onPressFilter={this.onPressFilter}
            onChangeTab={this.onChangeTab}
            onMounted={this.onTabViewMounted}
            onScroll={this.onScroll}
            showHeader={this.showHeader}
          >
            <HomeTab
              tabLabel={I18n.t('HOME')}
              tabId="home"
              onScroll={this.onScroll}
            />
            <ExperiencePage
              tabLabel={I18n.t('EXPERIENCE')}
              tabId="experience"
              onScroll={this.onScroll}
            />
            <MapPage
              tabLabel={I18n.t('MAP')}
              tabId="map"
              onScroll={this.onScroll}
            />
          </TabBar>
        </Animated.View>
      </View>
    );
  }
}
