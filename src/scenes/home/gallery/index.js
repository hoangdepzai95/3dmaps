import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import homeStyles from '../../../styles/home';
import VerticalListView from '../../../components/ListView';
import Post from './post';
import { getPost } from '../../../actions/fetchData';

class Gallery extends Component {
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
    const { postsData, gallery } = this.props;
    return (
      <View style={homeStyles.container}>
        <View style={homeStyles.card}>
          <Text>{gallery.name}</Text>
        </View>
        <VerticalListView
          loading={postsData.gallery[gallery.id].loading}
          hasMore
          onEndReached={this.onEndReached.bind(this, gallery.id)}
          data={postsData.gallery[gallery.id].data}
          renderRow={this.renderPost}
        />
      </View>
    );
  }
}

export default connect((state) => {
  return {
    postsData: state.data.postsData,
    gallery: state.data.home.data.find(o => o.id === state.layout.activeGallery),
  };
})(Gallery);
