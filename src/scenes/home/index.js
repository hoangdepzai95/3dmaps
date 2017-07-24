import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import Post from './post';
import { getHomeGallery } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import styles from '../../styles/home';

class HomeTab extends Component {
  componentDidMount() {
    this.props.dispatch(getHomeGallery());
  }
  onPressFilter = () => {
  }
  render() {
    const { onScroll, homePageData, loading } = this.props;
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
            >
              {
                homePageData.map((gallery) => {
                  return (
                    <View key={gallery.name} style={styles.gallery}>
                      <TouchableOpacity activeOpacity={0.6}>
                        <View style={styles.card}>
                          <Text>{gallery.name}</Text>
                          <Text style={styles.seeAllText}>{I18n.t('SEE_ALL')}</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.postRow}>
                        {
                          gallery.posts.map((post, index) => {
                            return (
                              <Post {...post} key={post.id} even={index === 0} />
                            );
                          })
                        }
                      </View>
                    </View>
                  );
                })
              }
            </ScrollView>
        }
      </View>
    );
  }
}

export default connect((state) => {
  return {
    homePageData: state.data.home.data,
    loading: !state.data.home.loaded,
  };
})(HomeTab);
