import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getExperienceCategory } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import styles from '../../styles/home';
import Galleries from './Galleries';
import Category from './gallery';
import PostDetail from '../post-detail';

class HomeTab extends Component {
  componentDidMount() {
    this.props.dispatch(getExperienceCategory());
  }
  render() {
    const { onScroll, loading, showPostDetail } = this.props;
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
              <Galleries />
              <View style={styles.footerSpace} />
            </ScrollView>
        }
        <Category />
        {
          showPostDetail ?
            <PostDetail type="experience" />
            : null
        }
      </View>
    );
  }
}

export default connect((state) => {
  return {
    loading: !state.data.experience.loaded || !state.data.home.loaded,
    activeTab: state.layout.activeTab,
    showPostDetail: !!state.layout.stackExperience.find(o => o === 'postDetail'),
  };
})(HomeTab);
