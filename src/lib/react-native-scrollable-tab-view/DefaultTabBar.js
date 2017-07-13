const React = require('react');
const ReactNative = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
} = ReactNative;
const Button = require('./Button');

const DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: View.propTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },
  getInitialState() {
    return {
    };
  },
  handleLayout(e, name) {
    const { width, } = e.nativeEvent.layout;
    this.setState({ [name]: width, });
  },
  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const fontSize = 12;
    return <Button
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
      onLayout={(e) => { this.handleLayout(e, page) }}
    >
      <View style={[styles.tab, this.props.tabStyle, ]} >
        <Text style={[{color: textColor, fontWeight, fontSize }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </Button>;
  },
  getTotalTabWith(state) {
    let rs = 0;
    Object.keys(state).forEach((key) => {
      if (parseInt(key) >= 0) {
        rs = rs + state[key];
      }
    })
    return rs;
  },
  getActiveTabLeft(space) {
    // optimize with good function later
    const activeTab  = this.props.activeTab;
    if (activeTab == 0) {
      return 0;
    } else if (activeTab == 1) {
      return this.state[0] + space;
    } else if (activeTab == 2) {
      // only god know why this work, i have no idea
      return this.state[2] * 2 + space - 1;
    }
  },
  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: this.state[this.props.activeTab],
      height: 3,
      backgroundColor: 'navy',
      bottom: 0,
    };
    const space = (this.state.containerWidth - this.getTotalTabWith(this.state)) / (numberOfTabs - 1) ;
     const left = this.props.scrollValue.interpolate({
       inputRange: [0, 1, ], outputRange: [0, this.getActiveTabLeft(space), ],
     });
    // const left = this.getActiveTabLeft(space);
    return (
      <View style={styles.tabsWarpper}>
        <View style={styles.leftArea}>
          <Image source={require('../../../assets/images/chevron_left.png')} style={styles.iconBackStyle} />
        </View>
        <View style={[{backgroundColor: this.props.backgroundColor, }, this.props.style, styles.tabs]} onLayout={(e) => {this.handleLayout(e, 'containerWidth')} }>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
          })}
          <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />
        </View>
        <View style={styles.rightArea}>
          <Image source={require('../../../assets/images/ic_my.png')} style={styles.iconAccountStyle} />
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 117,
  },
  tabsWarpper: {
    height: 50,
    flexDirection: 'row',
    height: '100%',
  },
  leftArea : {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 44,
  },
  rightArea: {
    flex: 49,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  iconBackStyle : {
    width: 20,
    height: 20,
    marginLeft: 20,
    tintColor: '#1069ff',
  },
  iconAccountStyle : {
    width: 15,
    height: 15,
    marginRight: 25,
  },
});

module.exports = DefaultTabBar;
