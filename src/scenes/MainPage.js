/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    StatusBar,
} from 'react-native';

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
  onChangeTab = (tab) => {
    this.tabView.gotoTab(tab);
  }
  onPressFilter = () => {
  }
  onScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if ((offsetY - this.prevOffsetY) > height / 10) {
      this.hideHeader();
      this.prevOffsetY = offsetY;
    }
    if ((offsetY - this.prevOffsetY) < -height / 10) {
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
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.View style={[styles.header, { top: this.headerHeight }]}>
          <AutoCompleteSearch />
        </Animated.View>
        <Animated.View style={[styles.main, { marginTop: this.marginTop }]}>
          <TabBar
            initTab="home"
            onPressFilter={this.onPressFilter}
            onChangeTab={this.onChangeTab}
            onScroll={this.onScroll}
            showHeader={this.showHeader}
            ref={(tabView) => { this.tabView = tabView; }}
          >
            <HomeTab
              tabLabel="HOME"
              tabId="home"
              onScroll={this.onScroll}
            />
            <ExperiencePage
              tabLabel="EXPERIENCE"
              tabId="experience"
              onScroll={this.onScroll}
            />
            <MapPage
              tabLabel="MAP"
              tabId="map"
              onScroll={this.onScroll}
            />
          </TabBar>
        </Animated.View>
      </View>
    );
  }
}
