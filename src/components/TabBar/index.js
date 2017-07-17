import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import styles from './style';
import MapAndFilter from '../../components/MapAndFilter';
import Filter from '../../components/Filter';
import homeStyles from '../../styles/home';
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
  handleOnLayout(id, e) {
    // on last call handleOnLayout
    if (this.state.caculatedLayout) return;
    if (id === '_mainArea') {
      this.tabsContainerWidth = e.nativeEvent.layout.width;
    } else {
      this.labelsSize[id] = e.nativeEvent.layout.width;
    }
    if (this.tabsContainerWidth && this.props.children.length === Object.keys(this.labelsSize).length) {
      let totalLabelWidth = 0;
      for (let key in this.labelsSize) {
        totalLabelWidth += this.labelsSize[key];
      }
      this.tabSpace = (this.tabsContainerWidth - totalLabelWidth) /
                      Object.keys(this.labelsSize).length;
      let tempX = 0;
      React.Children.map(this.props.children, (child) => {
        const key = child.props.tabId;
        this.tabsPositon[key] = tempX;
        this.tabsSize[key] = this.tabSpace + this.labelsSize[key];
        tempX += this.tabsSize[key];
      });
      this.setState({
        caculatedLayout: true,
        widthAnimation: this.labelsSize[this.props.children[0].props.tabId],
      });
    }
  }
  getDistance = (currentTab, nextTab) => {
    return this.tabsPositon[nextTab] - this.tabsPositon[currentTab];
  }
  gotoTab(id) {
    this.tabAnimateValue.setValue(0);
    this.underlineWidthValue.setValue(0);
    const leftAnimation = this.tabAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.tabsPositon[this.state.activeTab], this.tabsPositon[id]],
    });
    const widthAnimation = this.tabAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.labelsSize[this.state.activeTab], this.labelsSize[id]],
    });
    this.setState(
      { activeTab: id, leftAnimation, widthAnimation },
      () => {
        this.tabAnimation.start();
        this.underlineWidthAnimation.start();
      }
    );
    React.Children.map(this.props.children, (child, index) => {
      if (child.props.tabId === id) {
        this.scrollView._component.scrollTo({ x: width * index, animated: true });
      }
    });
  }
  onPressMap = () => {
    this.props.onChangeTab('map');
  }
  renderTabs = () => {
    const marginLeft = this.tabSpace ? this.tabSpace / 2 : 0;
    const iconSize = height / 25;
    return (
      <View style={styles.tabs}>
        <View style={styles.leftArea}>
          <Entypo name="chevron-left" size={iconSize} color="#1069ff" />
        </View>
        <View style={styles.mainArea} onLayout={this.handleOnLayout.bind(this, '_mainArea')}>
          {
            React.Children.map(this.props.children, (child) => {
              const id = child.props.tabId;
              const caculatedStyle = this.state.caculatedLayout ? { width: this.tabsSize[id], flex: 0 } : {};
              return (
                <TouchableOpacity style={[styles.tab, caculatedStyle]} onPress={this.gotoTab.bind(this, id)}>
                  <Text
                    onLayout={this.handleOnLayout.bind(this, id)}
                  >
                    { child.props.tabLabel }
                  </Text>
                </TouchableOpacity>
              );
            })
          }
          <Animated.View style={[styles.tabUnderlineStyle, { left: this.state.leftAnimation, width: this.state.widthAnimation, marginLeft }]}></Animated.View>
        </View>
        <View style={styles.rightArea}>
          <EvilIcons name="user" size={iconSize} />
        </View>
      </View>
    );
  }
  render() {
    const { onPressFilter, onScroll } = this.props;
    const { activeTab } = this.state;
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
                <View style={{ width }} key={index}>
                  {child}
                </View>
              );
            })
          }
        </Animated.ScrollView>
        </View>
        {
          activeTab === 'home' ?
          <View style={homeStyles.mapAndFilter} elevation={5}>
            <MapAndFilter
              onPressMap={this.onPressMap}
              onPressFilter={onPressFilter}
            />
          </View>
          :
          null
        }
        {
          activeTab === 'experience' ?
          <View style={homeStyles.filterStyle} elevation={5}>
            <Filter
              onPressFilter={onPressFilter}
            />
          </View>
          :
          null
        }
      </View>
    );
  }
}
