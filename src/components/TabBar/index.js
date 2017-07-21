import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import I18n from 'i18n-js';
import { connect } from 'react-redux';
import { setActiveTab, backTab, changeLoading } from '../../actions/layout';
import styles from './style';
import MapAndFilter from '../../components/MapAndFilter';
import Filter from '../../components/Filter';
import TabsContent from './TabsContent';
import homeStyles from '../../styles/home';
import Account from '../../scenes/account';

const { height, width } = Dimensions.get('window');

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caculatedLayout: false,
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
    this.props.dispatch(setActiveTab(this.props.initTab));
    this.props.dispatch(changeLoading(true));
  }
  componentDidMount() {
    this.props.onMounted(this);
  }
  getDistance = (currentTab, nextTab) => {
    return this.tabsPositon[nextTab] - this.tabsPositon[currentTab];
  }
  onPressAccount = () => {
    if (this.props.activeTab !== '_account') {
      this.props.dispatch(setActiveTab('_account'));
    }
  }
  onPressBack = () => {
    this.props.dispatch(backTab());
  }
  onTabContentMounted = (scrollView) => {
    this.scrollView = scrollView;
  }
  handleOnLayout(id, e) {
    // on last call handleOnLayout
    if (this.state.caculatedLayout) return;
    if (id === '_mainArea') {
      this.tabsContainerWidth = e.nativeEvent.layout.width;
    } else {
      this.labelsSize[id] = e.nativeEvent.layout.width;
    }
    if (
      this.tabsContainerWidth &&
      this.props.children.length === Object.keys(this.labelsSize).length
    ) {
      let totalLabelWidth = 0;
      for (const key in this.labelsSize) {
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
      this.setState(
        {
          caculatedLayout: true,
          widthAnimation: this.labelsSize[this.props.children[0].props.tabId],
        },
        () => {
          this.props.dispatch(changeLoading(false));
        },
      );
    }
  }
  gotoTab(id, animated = true) {
    const { activeTab } = this.props;
    this.tabAnimateValue.setValue(0);
    this.underlineWidthValue.setValue(0);
    const leftAnimation = this.tabAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.tabsPositon[activeTab], this.tabsPositon[id]],
    });
    const widthAnimation = this.tabAnimateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.labelsSize[activeTab], this.labelsSize[id]],
    });
    this.setState(
      { leftAnimation, widthAnimation },
      () => {
        this.props.dispatch(setActiveTab(id));
        Animated.parallel([this.tabAnimation, this.underlineWidthAnimation]).start();
      },
    );
    React.Children.map(this.props.children, (child, index) => {
      if (child.props.tabId === id) {
        this.scrollView._component.scrollTo({ x: width * index, animated });
      }
    });
    this.props.showHeader();
  }
  renderTabs = () => {
    const { activeTab } = this.props;
    const marginLeft = this.tabSpace ? this.tabSpace / 2 : 0;
    const iconSize = height / 25;
    return (
      <View style={styles.tabs}>
        {
          activeTab === '_account' ?
            <TouchableOpacity
              style={styles.leftArea}
              onPress={this.onPressBack}
            >
              <Entypo name="chevron-left" size={iconSize} color="#1069ff" />
            </TouchableOpacity>
          :
            <View style={styles.leftArea} />
        }
        <View style={styles.mainArea} onLayout={this.handleOnLayout.bind(this, '_mainArea')}>
          {
            this.props.children.find(child => child.props.tabId === activeTab) ?
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {
                React.Children.map(this.props.children, (child) => {
                  const id = child.props.tabId;
                  const caculatedStyle = this.state.caculatedLayout ?
                                        { width: this.tabsSize[id], flex: 0 } : {};
                  return (
                    <TouchableOpacity
                      style={[styles.tab, caculatedStyle]}
                      onPress={this.gotoTab.bind(this, id)}
                    >
                      <Text
                        onLayout={this.handleOnLayout.bind(this, id)}
                      >
                        { child.props.tabLabel }
                      </Text>
                    </TouchableOpacity>
                  );
                })
              }
                <Animated.View
                  style={
                  [styles.tabUnderlineStyle,
                      { left: this.state.leftAnimation, width: this.state.widthAnimation, marginLeft }]
                  }
                />
              </View>
            : null
          }
          {
            activeTab === '_account' ?
              <View style={styles.profile}>
                <Text>{I18n.t('PROFILE')}</Text>
              </View>
              : null
          }
        </View>
        <TouchableOpacity
          style={styles.rightArea}
          onPress={this.onPressAccount}
        >
          <EvilIcons name="user" size={iconSize} />
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { onPressFilter, activeTab, onChangeTab } = this.props;
    const { caculatedLayout } = this.state;
    const isMainTab = !!this.props.children.find(child => child.props.tabId === activeTab);
    const MapAndFilterWidth = I18n.currentLocale() === 'vi_VN' ? width * 0.46 : width * 0.378;
    const MapAndFilterFeft = (width / 2) - (MapAndFilterWidth / 2);
    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {this.renderTabs()}
        </View>
        <View style={[styles.mainContainer]}>
          <TabsContent tabs={this.props.children} onMounted={this.onTabContentMounted} />
          {
            isMainTab ?
            null :
            <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#FFF', zIndex: 9999 }]}>
              {
                activeTab === '_account' ?
                  <Account />
                  : null
              }
            </View>
          }
        </View>
        {
          activeTab === 'home' ?
            <View style={[homeStyles.mapAndFilter, { width: MapAndFilterWidth, left: MapAndFilterFeft }]} >
              <MapAndFilter
                onPressMap={() => { onChangeTab('map'); }}
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

export default connect((state) => {
  return {
    activeTab: state.layout.activeTab,
    prevTab: state.layout.prevTab,
  };
})(TabBar);
