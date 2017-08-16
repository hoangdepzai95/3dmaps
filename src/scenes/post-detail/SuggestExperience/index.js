import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';

import Posts from '../../experience/Posts';

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
  const dataExperience = state.data.experience.data;
  const randomCategory = dataExperience[_.random(0, dataExperience.length - 1)];
  return {
    posts: state.data.postsData.category[randomCategory.id].data.slice(0, 6),
  };
})(SuggestPlace);
