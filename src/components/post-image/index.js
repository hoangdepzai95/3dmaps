import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import styles from './style';

export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state= {
      containerWidth: null,
    }
  }
  handleLayout = (e) => {
    if (!this.state.containerWidth) {
      this.setState({
        containerWidth: e.nativeEvent.layout.width,
      });
    }
  }
  renderGallery() {
    return;
  }
  render() {
    const { containerWidth } = this.state;
    const { favorite } = this.props;
    return (
      <View
        style={styles.container}
        onLayout={this.handleLayout}
      >
      {
        containerWidth ?
          <Image
            source={{ uri: 'http://maapvn.com/admin/images/post/IMG0000000140.jpeg?1494409196' }}
            style={{ height: containerWidth * 0.75, width: containerWidth }}
            resizeMode="cover"
          />
          :
          null
      }
      {
        favorite ?
        <Image
          source={require('../../../assets/images/heart.png')}
          style={[styles.favoriteIcon, { width: containerWidth / 10, height: containerWidth / 10 }]}
        />
        :
        <Image
          source={require('../../../assets/images/ic_favorite.png')}
          style={[styles.favoriteIcon, { width: containerWidth / 10, height: containerWidth / 10 }]}
        />
      }
      </View>
    );
  }
}
