import React, { Component } from 'react';
import { MapView } from 'expo';
import _ from 'lodash';
import { Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import StarRatingBar from '../../lib/react-native-star-rating-view/StarRatingBar';

import ImageSlider from '../../components/ImageSlider';
import styles from './style';
import startstyles from '../../styles/starRating';
import Loading from '../../components/Loading';
import { getMapPosts } from '../../actions/fetchData';

const { height, width } = Dimensions.get('window');

class Map extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      region: {
        longitude: location ? location.longitude : 105.84197,
        latitude: location ? location.latitude : 21.0177,
        longitudeDelta: 0.05,
        latitudeDelta: 0.05,
      },
      activePostIndex: 1,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab === 'map' && this.props.activeTab !== 'map' && nextProps.loading) {
      this.props.dispatch(getMapPosts());
    }
  }
  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }
  onPressCallOut(post, index) {
    const region = _.cloneDeep(this.state.region);
    region.latitude = post.coordinate.latitude;
    region.longitude = post.coordinate.longitude;
    this.setState({ activePostIndex: index, region });
  }
  onPressMarker(post, index) {
    const region = _.cloneDeep(this.state.region);
    region.latitude = post.coordinate.latitude;
    region.longitude = post.coordinate.longitude;
    this.slider.snapToItem(index);
    this.setState({ activePostIndex: index, region });
  }
  renderPost = (posts) => {
    const { activePostIndex } = this.state;
    return (
      posts.map((post, index) => {
        return (
          <MapView.Marker
            coordinate={post.coordinate}
            pinColor={activePostIndex === index ? '#7076eb' : '#42b983'}
            onPress={this.onPressMarker.bind(this, post, index)}
            key={post.id}
          >
            <MapView.Callout onPress={this.onPressCallOut.bind(this, post, index)}>
              <View>
                <Text>{post.title}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        );
      })
    );
  }
  onSnapToItem = (index) => {
    const { posts } = this.props;
    const region = _.cloneDeep(this.state.region);
    region.latitude = posts[index].coordinate.latitude;
    region.longitude = posts[index].coordinate.longitude;
    this.setState({ activePostIndex: index, region });
  }
  render() {
    const { region, activePostIndex } = this.state;
    const { loading, posts } = this.props;
    const activePost = posts[activePostIndex];
    if (loading) {
      return (
        <View style={[styles.container, { marginTop: 20 }]}>
          <Loading />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapView}
          initialRegion={region}
          region={region}
        >
          {this.renderPost(posts)}
        </MapView>
        <View style={styles.suggestPlace} >
          <ImageSlider
            source={posts}
            containerWidth={width / 1.3}
            containerHeight={height / 5}
            onSnapToItem={this.onSnapToItem}
            activePostIndex={activePostIndex}
            onMounted={(slider) => { this.slider = slider; }}
          />
          <View style={[styles.contentSuggest, { width: width / 1.3 }]}>
            <View style={styles.rating}>
              <Text style={styles.boldText}>{activePost.title}</Text>
              <StarRatingBar
                score={activePost.rating}
                allowsHalfStars={false}
                accurateHalfStars={false}
                readOnly
                starStyle={startstyles.star}
                spacing={startstyles.space}
              />
            </View>
            <View style={styles.tags}>
              {
                activePost.tags.map((tag, index) => {
                  return (
                    <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  );
                })
              }
            </View>
            <Text style={styles.textFooter}>{activePost.formatedAddress}</Text>
            <Text style={styles.textFooter}>5 Likes 10 Reviews</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default connect((state) => {
  return {
    loading: !state.data.maps.loaded,
    activeTab: state.layout.activeTab,
    locale: state.auth.locale,
    posts: state.data.postsData.maps,
    location: state.auth.location ? state.auth.location.coords : null,
  };
})(Map);
