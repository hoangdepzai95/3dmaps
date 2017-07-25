import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Gallery extends Component {
  render() {
    const { activeGallery, galleries } = this.props;
    return (
      <View>
        <Text>{activeGallery}</Text>
      </View>
    );
  }
}

export default connect((state) => {
  return {
    activeGallery: state.layout.activeGallery,
    galleries: state.data.galleries,
  };
})(Gallery);
