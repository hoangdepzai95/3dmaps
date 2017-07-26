import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import { getPost } from '../../actions/fetchData';
import styles from '../../styles/home';
import { pushSubTab, setActiveCategory } from '../../actions/layout';
import Posts from './Posts';
import { PER_PAGE } from '../../config';

class Galleries extends Component {
  onPressFilter = () => {
  }
  onEndReached = (id) => {
    const { postsData } = this.props;
    if (!postsData.category[id].loading && postsData.category[id].hasMore) {
      this.props.dispatch(getPost(id, postsData.gallery[id].currentPage + 1, 'experience'));
    }
  }
  seeAll(id) {
    this.props.dispatch(setActiveCategory(id));
    this.props.dispatch(pushSubTab('stackExperience', 'category'));
  }
  render() {
    const { experienceData, postsData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {
          experienceData.map((category) => {
            return (
              <View key={category.id} style={styles.gallery}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.seeAll.bind(this, category.id)}
                >
                  <View style={styles.card}>
                    <Text style={styles.galleryTitle}>{category.name}</Text>
                    <Text style={styles.seeAllText}>{I18n.t('SEE_ALL')}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.postRow}>
                  <Posts posts={postsData.gallery[category.id].data.slice(0, PER_PAGE)} />
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
    experienceData: state.data.experience.data,
    postsData: state.data.postsData,
  };
})(Galleries);
