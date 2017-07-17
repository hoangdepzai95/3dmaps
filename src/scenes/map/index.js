import React, { Component } from 'react';
import { MapView } from 'expo';
import { Text, View, Image, Dimensions } from 'react-native';

import ImageSlider from '../../components/ImageSlider';
import styles from './style';

const { height, width } = Dimensions.get('window');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09,
      },
      posts: [
        {
          coordinate: {
            longitude: -122,
            latitude: 37.01,
          },
          title: 'post1',
          image: 'http://maapvn.com/admin/images/post/IMG0000000145.jpeg?1494490153',
        },
        {
          coordinate: {
            longitude: -122,
            latitude: 37.04,
          },
          title: 'post2',
          image: 'http://maapvn.com/admin/images/post/IMG0000000140.jpeg?1494409196',
        },
        {
          coordinate: {
            longitude: -122,
            latitude: 37.06,
          },
          title: 'post3',
          image: 'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
        },
        {
          coordinate: {
            longitude: -122,
            latitude: 37.06,
          },
          title: 'post6',
          image: 'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
        },
        {
          coordinate: {
            longitude: -122,
            latitude: 37.06,
          },
          title: 'post4',
          image: 'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
        },
        {
          coordinate: {
            longitude: -122,
            latitude: 37.06,
          },
          title: 'post7',
          image: 'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
        },
      ],
    };
  }
  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }
  onPressCallOut = () => {
  }
  renderPost = (posts) => {
    return (
      posts.map((post) => {
        return (
          <MapView.Marker coordinate={post.coordinate} key={post.title} pinColor="#42b983">
            <MapView.Callout onPress={this.onPressCallOut}>
              <View>
                <Text>{post.title}</Text>
                <Text>{post.title}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        );
      })
    );
  }
  render() {
    const { posts, region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapView}
          initialRegion={region}
        >
          {this.renderPost(posts)}
        </MapView>
        <View style={styles.suggestPlace} >
          <ImageSlider
            images={posts.map(o => o.image)}
          />
        </View>
      </View>
    );
  }
}
export default Map;
