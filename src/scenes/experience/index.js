import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';
import Post from '../home/post';
import homeStyles from '../../styles/home';
import Loading from '../../components/Loading';
import SelectedGallery from './SelectedGallery';
import { getExperienceCategory } from '../../actions/fetchData';
import styles from './style';

class Experience extends Component {
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
  shouldComponentUpdate(nextProps) {
    if (nextProps.activeTab === 'experience' && this.props.activeTab !== 'experience' && nextProps.loading) {
      this.props.dispatch(getExperienceCategory());
    }
    return nextProps.loading !== this.props.loading ||
           nextProps.data !== this.props.data;
  }
  render() {
    const { selectedGallery, suggestionLocations } = this.state;
    const { onPressFilter, onScroll, loading } = this.props;
    const gallerys = this.props.data;
    if (selectedGallery) {
      return <SelectedGallery onPressFilter={onPressFilter} onScroll={onScroll} />;
    }
    return (
      <View style={homeStyles.container}>
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
                        {
                          gallery.experiences.map((post, index) => {
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
              <View style={homeStyles.footerSpace} />
            </ScrollView>
        }
      </View>
    );
  }
}

export default connect((state) => {
  return {
    loading: !state.data.experience.loaded,
    activeTab: state.layout.activeTab,
    data: state.data.experience.data,
  };
})(Experience);
