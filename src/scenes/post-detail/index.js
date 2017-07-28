import React, { Component } from 'react';
import { View, Text, WebView, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from './style';
import TabView from '../../lib/react-native-scrollable-tab-view';
import Slider from './Slider';

const { height, width } = Dimensions.get('window');

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.scaleY = new Animated.Value(0.2);
  }
  shouldComponentUpdate(nextProps) {
    const { type, stackHome, stackExperience } = this.props;
    return (type === 'home' && stackHome.join('') !== nextProps.stackHome.join('')) ||
           (type === 'experience' && stackExperience.join('') !== nextProps.stackExperience.join(''));
  }
  componentWillUpdate(nextProps) {
    const { stackHome, stackExperience } = this.props;
    if (
      (_.last(stackHome) !== 'postDetail' && _.last(nextProps.stackHome) === 'postDetail') ||
      (_.last(stackExperience) !== 'postDetail' && _.last(nextProps.stackExperience) === 'postDetail')
    ) {
      this.playAnimation();
    }
  }
  playAnimation() {
    Animated.timing(this.scaleY, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  render() {
    const { type, post, stackHome, stackExperience } = this.props;
    if ((type === 'home' && _.last(stackHome) !== 'postDetail') || !post) return null;
    if ((type === 'experience' && _.last(stackExperience) !== 'postDetail') || !post) return null;
    return (
      <Animated.View style={[styles.container, { transform: [{ scale: this.scaleY }] }]}>
        <View style={styles.webView}>
          <TabView
            tabBarPosition="bottom"
            locked
          >
            <Slider
              tabLabel="IMAGES"
              images={post.images.map(o => o.url)}
              width={width}
            />
            <WebView
              source={{ uri: post.formatedUrl }}
              style={{ flex: 1 }}
              tabLabel="3D MAP"
            />
            <Text tabLabel='COMMENTS'>project</Text>
          </TabView>
        </View>
        <View style={styles.footer}>
        </View>
      </Animated.View>
    );
  }
}

export default connect((state, ownProps) => {
  return {
    post: state.layout.activePost[ownProps.type],
    stackHome: state.layout.stackHome,
    stackExperience: state.layout.stackExperience,
  };
})(PostDetail);
