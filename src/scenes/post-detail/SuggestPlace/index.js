import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';

import Posts from '../../home/Posts';

class SuggestPlace extends Component {
  render() {
    const { posts, type } = this.props;
    return (
      <View>
        <Posts posts={posts} type={type} />
      </View>
    );
  }
}

export default connect((state) => {
  const dataHome = state.data.home.data;
  const randomGallery = dataHome[_.random(0, dataHome.length - 1)];
  return {
    posts: state.data.postsData.gallery[randomGallery.id].data.slice(0, 6),
  };
})(SuggestPlace);
