import React, { Component } from 'react';
import { MapView } from 'expo';
import _ from 'lodash';
import { Text, View, Dimensions } from 'react-native';
import StarRatingBar from '../../lib/react-native-star-rating-view/StarRatingBar';

import ImageSlider from '../../components/ImageSlider';
import styles from './style';
import startstyles from '../../styles/starRating';

const { height, width } = Dimensions.get('window');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 1,
        latitudeDelta: 1,
      },
      activePostIndex: 1,
      posts: [
        {
          coordinate: {
            longitude: -122.5,
            latitude: 37.01,
          },
          title: 'post1',
          image: 'http://maapvn.com/admin/images/post/IMG0000000145.jpeg?1494490153',
          rate: 4,
        },
        {
          coordinate: {
            longitude: -122.6,
            latitude: 37.04,
          },
          title: 'post2',
          image: 'http://maapvn.com/admin/images/post/IMG0000000140.jpeg?1494409196',
          rate: 3,
        },
        {
          coordinate: {
            longitude: -121,
            latitude: 37.06,
          },
          title: 'post3',
          image: 'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
          rate: 1,
        },
        {
          coordinate: {
            longitude: -120,
            latitude: 37.16,
          },
          title: 'post6',
          image: 'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
          rate: 4,
        },
        {
          coordinate: {
            longitude: -123,
            latitude: 37.26,
          },
          title: 'post4',
          image: 'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
          rate: 2,
        },
        {
          coordinate: {
            longitude: -122.3,
            latitude: 37.16,
          },
          title: 'post7',
          image: 'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
          rate: 3,
        },
      ],
    };
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
    return (
      posts.map((post, index) => {
        return (
          <MapView.Marker
            coordinate={post.coordinate}
            key={post.title}
            pinColor="#42b983"
            onPress={this.onPressMarker.bind(this, post, index)}
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
    const { posts } = this.state;
    const region = _.cloneDeep(this.state.region);
    region.latitude = posts[index].coordinate.latitude;
    region.longitude = posts[index].coordinate.longitude;
    this.setState({ activePostIndex: index, region });
  }
  render() {
    const { posts, region, activePostIndex } = this.state;
    const rate = posts[activePostIndex].rate;
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
            <View style={styles.description}>
              <Text style={styles.boldText}>{posts[activePostIndex].title}</Text>
            </View>
            <View style={styles.rating}>
            <StarRatingBar
              score={rate}
              allowsHalfStars={false}
              accurateHalfStars={false}
              readOnly
              starStyle={startstyles.star}
              spacing={startstyles.space}
            />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Map;
