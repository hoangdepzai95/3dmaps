import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import I18n from 'i18n-js';
import Post from '../home/post';
import homeStyles from '../../styles/home';
import SelectedGallery from './SelectedGallery';

import styles from './style';

export default class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallerys: [
      ],
      suggestionLocations: [
      ],
      selectedGallery: '',
    };
  }
  onSelectGallery(name) {
    this.setState({ selectedGallery: name });
  }
  render() {
    const { gallerys, selectedGallery, suggestionLocations } = this.state;
    const { onPressFilter, onScroll } = this.props;
    if (selectedGallery) {
      return <SelectedGallery onPressFilter={onPressFilter} onScroll={onScroll} />;
    }
    return (
      <View style={homeStyles.container}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          alwaysBounceVertical={false}
          bounces={false}
          bouncesZoom={false}
        >
          {
            gallerys.map((gallery) => {
              return (
                <View key={gallery.name} style={homeStyles.gallery}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={this.onSelectGallery.bind(this, gallery.name)}
                  >
                    <View style={homeStyles.card}>
                      <Text>{gallery.name}</Text>
                      <Text style={homeStyles.seeAllText}>{I18n.t('SEE_ALL')}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={homeStyles.postRow}>
                    <Post {...gallery.posts[0]} />
                    <View style={homeStyles.divider} />
                    <Post {...gallery.posts[1]} />
                  </View>
                </View>
              );
            })
          }
          <View style={homeStyles.gallery}>
            <TouchableOpacity activeOpacity={0.6} >
              <View style={[homeStyles.card, styles.suggestions]}>
                <Text>{I18n.t('Suggested_Places')}</Text>
                <Text style={homeStyles.seeAllText}>{I18n.t('SEE_ALL')}</Text>
              </View>
            </TouchableOpacity>
            <View style={homeStyles.postRow}>
            {
              /*
              <Post {...suggestionLocations[0]} />
              <View style={homeStyles.divider} />
              <Post {...suggestionLocations[1]} />
              */
            }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
