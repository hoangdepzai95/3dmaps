import React, { Component } from 'react';
import { MapView } from 'expo';
import { Text, View } from 'react-native';

import styles from './style';

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
        },
        {
          coordinate: {
            longitude: -122,
            latitude: 37.04,
          },
          title: 'post2',
        },
        {
          coordinate: {
            longitude: -122,
            latitude: 37.06,
          },
          title: 'post3',
        },
      ],
    };
  }
  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }
  onPressCallOut = () => {
    console.log('press');
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
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
        >
          {this.renderPost(this.state.posts)}
        </MapView>
      </View>
    );
  }
}
export default Map;
