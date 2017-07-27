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
    if ((_.last(nextProps.stackHome) === 'gallery') &&
        (_.last(this.props.stackHome) !== 'gallery')
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
    if (!postsData.gallery[id].loading && postsData.gallery[id].hasMore) {
      this.props.dispatch(getPost(id, postsData.gallery[id].currentPage + 1, 'gallery'));
    }
  }
  renderPost = (post) => {
    return (
      <Post {...post} key={post.id} />
    );
  }
  render() {
    const { postsData, gallery, stackHome } = this.props;
    if (!gallery || stackHome[0] !== 'gallery') return null;
    return (
      <Animated.View style={[styles.container, { transform: [{ scaleY: this.scaleY }] }]}>
        <View style={homeStyles.card}>
          <Text style={homeStyles.galleryTitle}>{gallery.name}</Text>
        </View>
        <VerticalListView
          loading={postsData.gallery[gallery.id].loading}
          hasMore
          onEndReached={this.onEndReached.bind(this, gallery.id)}
          data={postsData.gallery[gallery.id].data}
          renderRow={this.renderPost}
        />
      </Animated.View>
    );
  }
}

export default connect((state) => {
  return {
    postsData: state.data.postsData,
    gallery: state.data.home.data.find(o => o.id === state.layout.activeGallery),
    stackHome: state.layout.stackHome,
  };
})(Gallery);
