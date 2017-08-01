import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getHomeGallery } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import styles from '../../styles/home';
import Galleries from './Galleries';
import Gallery from './gallery';
import PostDetail from '../post-detail';

class HomeTab extends Component {
  componentDidMount() {
    this.props.dispatch(getHomeGallery());
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
        <Gallery />
        {
          showPostDetail ?
            <PostDetail type="home" />
            : null
        }
      </View>
    );
  }
}

export default connect((state) => {
  return {
    loading: !state.data.home.loaded,
    showPostDetail: !!state.layout.stackHome.find(o => o === 'postDetail'),
  };
})(HomeTab);
