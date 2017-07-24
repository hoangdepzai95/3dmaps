import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ProgressImage from '../ProgressImage';
import { PostImageWidth } from '../../styles/home';
import styles from './style';

const links = [
  'http://maapvn.com/admin/images/post/IMG0000000145.jpeg?1494490153',
  'http://maapvn.com/admin/images/post/IMG0000000140.jpeg?1494409196',
  'http://maapvn.com/admin/images/post/IMG0000000059.jpeg?1494399433',
  'http://maapvn.com/admin/images/post/IMG0000000120.jpeg?1494411491',
  'http://maapvn.com/admin/images/post/IMG0000000116.jpeg?1494560441',
];

export default class HomeTab extends Component {
  renderGallery = () => {
  }
  render() {
    const containerWidth = PostImageWidth;
    const { favorite } = this.props;
    const seo = this.props.seo || {};
    return (
      <View
        style={styles.container}
        onLayout={this.handleLayout}
      >
        <ProgressImage
          url={seo.featured_image}
          style={{ height: containerWidth * 0.75, width: containerWidth }}
        />
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
