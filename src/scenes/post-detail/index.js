import React, { Component } from 'react';
import { View, Text, WebView  } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from './style';
import TabView from '../../lib/react-native-scrollable-tab-view';

class PostDetail extends Component {
  shouldComponentUpdate(nextProps) {
    const { type, stackHome, stackExperience } = this.props;
    return (type === 'home' && stackHome.join('') !== nextProps.stackHome.join('')) ||
           (type === 'experience' && stackExperience.join('') !== nextProps.stackExperience.join(''));
  }
  render() {
    const { type, post, stackHome, stackExperience } = this.props;
    if ((type === 'home' && _.last(stackHome) !== 'postDetail') || !post) return null;
    if ((type === 'experience' && _.last(stackExperience) !== 'postDetail') || !post) return null;
    console.log(post.formatedUrl);
    return (
      <View style={styles.container}>
        <View style={styles.webView}>
          <TabView
            tabBarPosition="bottom"
            locked
          >
            <WebView
              source={{ uri: post.formatedUrl }}
              style={{ flex: 1 }}
              tabLabel="3D MAP"
            />
            <Text tabLabel='IMAGES'>favorite</Text>
            <Text tabLabel='COMMENTS'>project</Text>
          </TabView>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
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
