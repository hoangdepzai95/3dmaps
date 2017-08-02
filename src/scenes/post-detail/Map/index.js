import React, { Component } from 'react';
import { MapView } from 'expo';
import { View } from 'react-native';

import styles from './style';


class Map extends Component {
  formatLatlon = (string) => {
    const data = string.split(',').map(o => parseFloat(o));
    return {
      longitude: data[1],
      latitude: data[0],
      longitudeDelta: 0.05,
      latitudeDelta: 0.05,
    };
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
          />
        );
      })
    );
  }
  render() {
    const { post } = this.props;
    const latlong = this.formatLatlon(post.latlon);
    return (
      <MapView
        style={styles.container}
        initialRegion={latlong}
        scrollEnabled={false}
      >
        <MapView.Marker
          coordinate={latlong}
          pinColor="#42b983"
        />
      </MapView>
    );
  }
}
export default Map;
