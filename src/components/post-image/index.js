import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ProgressImage from '../ProgressImage';
import { PostImageWidth } from '../../styles/home';
import styles from './style';

export default class HomeTab extends Component {
  renderGallery = () => {
  }
  render() {
    const { favorite, width } = this.props;
    const containerWidth = width || PostImageWidth;
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
