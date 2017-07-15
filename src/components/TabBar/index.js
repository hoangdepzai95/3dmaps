import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import styles from './style';
const { height, width } = Dimensions.get('window');

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caculatedLayout: false,
      activeTab: '',
      leftAnimation: 0,
      widthAnimation: 0,
    };
    this.labelsSize = {};
    this.tabsSize = {};
    this.tabsPositon = {};
    this.tabAnimateValue = new Animated.Value(0);
    this.tabAnimation = Animated.timing(this.tabAnimateValue, {
      toValue: 1,
      duration: 150,
    });
    this.scrollX = new Animated.Value(0);
    this.underlineWidthValue = new Animated.Value(0);
    this.underlineWidthAnimation = Animated.timing(this.underlineWidthValue, {
      toValue: 1,
      duration: 150,
    });
  }
  componentWillMount() {
    this.setState({ activeTab: this.props.initTab });
  }
  handleOnLayout(label, e) {
    // on last call handleOnLayout
    if (label === '_mainArea' ) {
      this.tabsContainerWidth = e.nativeEvent.layout.width;
    } else {
      this.labelsSize[label] = e.nativeEvent.layout.width;
    }
    if (this.tabsContainerWidth && this.props.children.length === Object.keys(this.labelsSize).length) {
      let totalLabelWidth = 0;
      for (let key in this.labelsSize) {
        totalLabelWidth += this.labelsSize[key];
      }
      this.tabSpace = (this.tabsContainerWidth - totalLabelWidth) /
                      Object.keys(this.labelsSize).length;
      let tempX = 0;
      for (const key in this.labelsSize) {
        this.tabsPositon[key] = tempX;
        this.tabsSize[key] = this.tabSpace + this.labelsSize[key];
        tempX += this.tabsSize[key];
      }
      this.setState({ caculatedLayout: true, widthAnimation: this.labelsSize[Object.keys(this.labelsSize)[0]]});
    }
  }
  getDistance = (currentTab, nextTab) => {
    return this.tabsPositon[nextTab] - this.tabsPositon[currentTab];
  }
  gotoTab(label) {
    this.tabAnimateValue.setValue(0);
    this.underlineWidthValue.setValue(0);
    const leftAnimation = this.tabAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.tabsPositon[this.state.activeTab], this.tabsPositon[label]],
    });
    const widthAnimation = this.tabAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.labelsSize[this.state.activeTab], this.labelsSize[label]],
    });
    this.setState(
      { activeTab: label, leftAnimation, widthAnimation },
      () => {
        this.tabAnimation.start();
        this.underlineWidthAnimation.start();
      }
    );
    React.Children.map(this.props.children, (child, index) => {
      if (child.props.tabLabel === label) {
        this.scrollView._component.scrollTo({ x: width * index, animated: true });
      }
    });
  }
  renderTabs = () => {
    const marginLeft = this.tabSpace ? this.tabSpace / 2 : 0;
    return (
      <View style={styles.tabs}>
        <View style={styles.leftArea}>
          <Entypo name="chevron-left" size={18} color="#1069ff" />
        </View>
        <View style={styles.mainArea} onLayout={this.handleOnLayout.bind(this, '_mainArea')}>
          {
            React.Children.map(this.props.children, (child) => {
              const label = child.props.tabLabel;
              const caculatedStyle = this.state.caculatedLayout ? { width: this.tabsSize[label], flex: 0 } : {};
              return (
                <TouchableOpacity style={[styles.tab, caculatedStyle]} onPress={this.gotoTab.bind(this, label)}>
                  <Text
                    onLayout={this.handleOnLayout.bind(this, label)}
                  >
                    { label }
                  </Text>
                </TouchableOpacity>
              );
            })
          }
          <Animated.View style={[styles.tabUnderlineStyle, { left: this.state.leftAnimation, width: this.state.widthAnimation, marginLeft }]}></Animated.View>
        </View>
        <View style={styles.rightArea}>
          <EvilIcons name="user" size={18} />
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {this.renderTabs()}
        </View>
        <View style={styles.mainContainer}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEnabled={true}
          automaticallyAdjustContentInsets={false}
          contentOffset={{ x: 0 }}
          onScroll={
            Animated.event([{
                  nativeEvent: { contentOffset: { x: this.scrollX } }
                }], {
                  useNativeDriver: true,
                })
          }
          ref={(scroll) => {this.scrollView = scroll}}
          scrollEventThrottle={16}
          scrollsToTop={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          directionalLockEnabled
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
        >
          {
            this.props.children.map((child, index) => {
              return (
                <View style={{ width }} key={index}>{child}</View>
              );
            })
          }
        </Animated.ScrollView>
        </View>
      </View>
    );
  }
}
