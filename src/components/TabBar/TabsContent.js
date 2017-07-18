import React, { Component } from 'react';
import { View, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default class TabsContent extends Component {
  componentDidMount() {
    this.props.onMounted(this.scrollView);
  }
  shouldComponentUpdate(nextProps) {
    return this.props.tabs !== nextProps.tabs;
  }
  render() {
    const { tabs } = this.props;
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        automaticallyAdjustContentInsets={false}
        contentOffset={{ x: 0 }}
        ref={(scroll) => { this.scrollView = scroll; }}
        scrollEventThrottle={16}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
        alwaysBounceVertical={false}
        keyboardDismissMode="on-drag"
      >
        {
          tabs.map((child) => {
            return (
              <View style={{ width }} key={child.props.tabId}>
                {child}
              </View>
            );
          })
        }
      </Animated.ScrollView>
    );
  }
}
