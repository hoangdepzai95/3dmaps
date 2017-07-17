import React, { Component } from 'react';
import { View, Image } from 'react-native';
import _ from 'lodash';
import styles from './style';

const links = [
  'http://maapvn.com/admin/images/post/IMG0000000145.jpeg?1494490153',
  'http://maapvn.com/admin/images/post/IMG0000000140.jpeg?1494409196',
  'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
  'http://maapvn.com/admin/images/post/IMG0000000120.jpeg?1494411491',
  'http://maapvn.com/admin/images/post/IMG0000000116.jpeg?1494560441',
];

export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: null,
    };
  }
  handleLayout = (e) => {
    if (!this.state.containerWidth) {
      this.setState({
        containerWidth: e.nativeEvent.layout.width,
      });
    }
  }
  renderGallery = () => {
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
              source={{ uri: links[_.random(1, links.length - 1)] }}
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
              style={
              [styles.favoriteIcon,
                { width: containerWidth / 10, height: containerWidth / 10 },
              ]
              }
            />
            :
            <Image
              source={require('../../../assets/images/ic_favorite.png')}
              style={
              [styles.favoriteIcon,
                { width: containerWidth / 10, height: containerWidth / 10 },
              ]
              }
            />
        }
      </View>
    );
  }
}
