import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import homeStyles from '../../../styles/home';
import VerticalListView from '../../../components/ListView';
import Post from '../../home/gallery/post';
import { getPost } from '../../../actions/fetchData';
import styles from '../../home/gallery/style';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.scaleY = new Animated.Value(0.2);
  }
  componentWillUpdate(nextProps) {
    if ((_.last(nextProps.stackAccount) === 'gallery') &&
        (_.last(this.props.stackAccount) !== 'gallery')
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
    if (!postsData.saved[id].loading && postsData.saved[id].hasMore) {
      this.props.dispatch(getPost(id, postsData.saved[id].currentPage + 1, 'saved'));
    }
  }
  renderPost = (post) => {
    return (
      <Post {...post} key={post.id} type="saved" />
    );
  }
  render() {
    const { postsData, gallery, stackAccount } = this.props;
    if (!gallery || (stackAccount[0] !== 'gallery' && !stackAccount[1])) return null;
    return (
      <Animated.View style={[styles.container, { transform: [{ scaleY: this.scaleY }] }]}>
        <View style={homeStyles.card}>
          <Text style={homeStyles.galleryTitle}>{gallery.name}</Text>
        </View>
        <VerticalListView
          loading={postsData.saved[gallery.id].loading}
          hasMore
          onEndReached={this.onEndReached.bind(this, gallery.id)}
          data={postsData.saved[gallery.id].data}
          renderRow={this.renderPost}
        />
      </Animated.View>
    );
  }
}

export default connect((state) => {
  return {
    postsData: state.data.postsData,
    gallery: (state.data.saved.data || []).find(o => o.id === state.layout.activeSavedGallery),
    stackAccount: state.layout.stackAccount,
  };
})(Gallery);
