import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getHomeGallery } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import styles from '../../styles/home';
import Galleries from './Galleries';
import Gallery from './gallery';

class HomeTab extends Component {
  componentDidMount() {
    this.props.dispatch(getHomeGallery());
  }
  render() {
    const { onScroll, loading, stackHome } = this.props;
    const isOpenGallery = _.last(stackHome) === 'gallery';
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
              <Gallery />
            </ScrollView>
        }
      </View>
    );
  }
}

export default connect((state) => {
  return {
    loading: !state.data.home.loaded,
  };
})(HomeTab);
