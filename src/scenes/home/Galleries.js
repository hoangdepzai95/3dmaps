import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import Post from './post';
import { getHomeGallery, getPost } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import styles from '../../styles/home';
import { pushSubTab, setActiveGallery } from '../../actions/layout';
import Posts from './Posts';

class Galleries extends Component {
  componentDidMount() {
    this.props.dispatch(getHomeGallery());
  }
  onPressFilter = () => {
  }
  onEndReached = (id) => {
    const { postsData } = this.props;
    if (!postsData.gallery[id].loading && postsData.gallery[id].hasMore) {
      this.props.dispatch(getPost(id, postsData.gallery[id].currentPage + 1, 'gallery'));
    }
  }
  seeAll(id) {
    this.props.dispatch(setActiveGallery(id));
    this.props.dispatch(pushSubTab('stackHome', 'gallery'));
  }
  render() {
    const { homePageData, postsData } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
                  <Posts posts={postsData.gallery[gallery.id].data.slice(0, 20)} />
                </View>
              </View>
            );
          })
        }
      </View>
    );
  }
}

export default connect((state) => {
  return {
    homePageData: state.data.home.data,
    postsData: state.data.postsData,
  };
})(Galleries);
