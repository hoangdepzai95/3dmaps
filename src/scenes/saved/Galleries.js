import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import styles from '../../styles/home';
import { pushSubTab, setActiveSavedGallery } from '../../actions/layout';
import Posts from '../home/Posts';
import { PER_PAGE } from '../../config';

class Galleries extends Component {
  seeAll(id) {
    this.props.dispatch(setActiveSavedGallery(id));
    this.props.dispatch(pushSubTab('stackAccount', 'gallery'));
  }
  render() {
    const { savedData, postsData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {
          savedData.map((gallery) => {
            return (
              <View key={gallery.id} style={styles.gallery}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.seeAll.bind(this, gallery.id)}
                >
                  <View style={styles.card}>
                    <Text style={styles.galleryTitle}>{gallery.name}</Text>
                    <Text style={styles.seeAllText}>{I18n.t('SEE_ALL')}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.postRow}>
                  <Posts posts={postsData.saved[gallery.id].data.slice(0, PER_PAGE)} type="saved" />
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
    savedData: state.data.saved.data,
    postsData: state.data.postsData,
  };
})(Galleries);
