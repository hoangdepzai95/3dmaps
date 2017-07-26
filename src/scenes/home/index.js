import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
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
        <Gallery />
      </View>
    );
  }
}

export default connect((state) => {
  return {
    loading: !state.data.home.loaded,
  };
})(HomeTab);
