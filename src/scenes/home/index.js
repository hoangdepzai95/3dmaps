import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import Post from './post';
import { getHomeGallery } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import styles from '../../styles/home';
import { pushSubTab, setActiveGallery } from '../../actions/layout';

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
    loading: !state.data.home.loaded,
  };
})(HomeTab);
