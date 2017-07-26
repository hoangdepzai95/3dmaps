import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import Post from './post';
import { getHomeGallery, getPost } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import styles from '../../styles/home';
import { pushSubTab, setActiveGallery } from '../../actions/layout';
import HorizontalListView from '../../components/ListView';

class HomeTab extends Component {
  componentDidMount() {
    this.props.dispatch(getHomeGallery());
  }
  onPressFilter = () => {
  }
  seeAll(id) {
    this.props.dispatch(setActiveGallery(id));
    this.props.dispatch(pushSubTab('stackHome', 'gallery'));
  }
  onEndReached = (id) => {
    const { postsData } = this.props;
    if (!postsData.gallery[id].loading && postsData.gallery[id].hasMore) {
      this.props.dispatch(getPost(id, postsData.gallery[id].currentPage + 1, 'gallery'));
    }
  }
  renderPost = (post) => {
    return (
      <Post {...post} key={post.id} even />
    );
  }
  render() {
    const { onScroll, homePageData, loading, postsData } = this.props;
    console.log('render home');
    return (
      <View style={styles.container}>
        {
          loading ?
            <Loading />
            :
            <ScrollView
              onScroll={onScroll}
              scrollEventThrottle={16}
              alwaysBounceVertical={false}
              bounces={false}
              bouncesZoom={false}
              style={{ display: 'none' }}
            >
              {
                homePageData.map((gallery) => {
                  return (
                    <View key={gallery.id} style={styles.gallery}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={this.seeAll.bind(this, gallery.id)}
                      >
                        <View style={styles.card}>
                          <Text>{gallery.name}</Text>
                          <Text style={styles.seeAllText}>{I18n.t('SEE_ALL')}</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.postRow}>
                      </View>
                    </View>
                  );
                })
              }
              <View style={styles.footerSpace} />
            </ScrollView>
        }
      </View>
    );
  }
}

export default connect((state) => {
  return {
    homePageData: state.data.home.data,
    postsData: state.data.postsData,
    loading: !state.data.home.loaded,
  };
})(HomeTab);
