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
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab === 'experience' && this.props.activeTab !== 'experience' && nextProps.loading) {
      this.props.dispatch(getExperienceCategory());
    }
  }
  render() {
    const { onScroll, loading } = this.props;
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
        <PostDetail type="experience" />
      </View>
    );
  }
}

export default connect((state) => {
  return {
    loading: !state.data.experience.loaded,
    activeTab: state.layout.activeTab,
  };
})(HomeTab);
