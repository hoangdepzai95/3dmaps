import React, { Component } from 'react';
import { MapView } from 'expo';
import { Text, View } from 'react-native';

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
    };
  }
  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
      </View>
    );
  }
}
export default Map;
