import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import homeStyles from '../../../styles/home';
import VerticalListView from '../../../components/ListView';
import Post from './post';
import { getPost } from '../../../actions/fetchData';
import styles from './style';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.scaleY = new Animated.Value(0.2);
  }
  componentWillUpdate(nextProps) {
    if ((_.last(nextProps.stackExperience) === 'category') &&
        (_.last(this.props.stackExperience) !== 'category')
  ) {
      Animated.timing(this.scaleY, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }
  onEndReached(id) {
    const { postsData } = this.props;
    if (!postsData.category[id].loading && postsData.category[id].hasMore) {
      this.props.dispatch(getPost(id, postsData.category[id].currentPage + 1, 'category'));
    }
  }
  couplePosts = (data) => {
    const rs = [];
    for (let i = 0; i < data.length; i += 1) {
      if (i % 2 === 0) {
        rs.push({
          key: i,
          items: [data[i], data[i + 1]],
        });
      }
    }
    return rs;
  }
  renderPost = (data) => {
    return (
      <View key={data.key} style={{ flexDirection: 'row' }}>
        {
          data.items.map((post) => {
            if (!post) return <View style={{ flex: 1 }} key="_empty-post" />;
            return (
              <Post {...post} key={post.id} even type="experience" />
            );
          })
        }
      </View>
    );
  }
  render() {
    const { postsData, category, stackExperience } = this.props;
    if (!category || stackExperience[0] !== 'category') return null;
    return (
      <Animated.View style={[styles.container, { transform: [{ scaleY: this.scaleY }] }]}>
        <View style={homeStyles.card}>
          <Text style={homeStyles.galleryTitle}>{category.name}</Text>
        </View>
        <VerticalListView
          loading={postsData.category[category.id].loading}
          hasMore
          onEndReached={this.onEndReached.bind(this, category.id)}
          data={this.couplePosts(postsData.gallery[category.id].data)}
          renderRow={this.renderPost}
        />
      </Animated.View>
    );
  }
}

export default connect((state) => {
  return {
    postsData: state.data.postsData,
    category: state.data.experience.data.find(o => o.id === state.layout.activeCategory),
    stackExperience: state.layout.stackExperience,
  };
})(Gallery);
