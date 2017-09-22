import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Share, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import I18n from 'i18n-js';
import { connect } from 'react-redux';
import ProgressImage from '../ProgressImage';
import { PostImageWidth } from '../../styles/home';
import styles from './style';
import { setActiveTab, setActiveSave } from '../../actions/layout';

const { height } = Dimensions.get('window');

class PostImage extends Component {
  onPressShare(slug) {
    const url = `http://3dmaps.vn/bai-dang/${slug}.html`;
    Share.share({
     ...Platform.select({
       ios: {
         message: `${I18n.t('share_content')} : `,
         url,
       },
       android: {
         message: `${I18n.t('share_content')} : \n ${url}`,
       },
     }),
     title: I18n.t('share_content'),
   }, {
     ...Platform.select({
       ios: {
         // iOS only:
         excludedActivityTypes: [
           'com.apple.UIKit.activity.PostToTwitter'
         ]
       },
       android: {
         // Android only:
         dialogTitle: I18n.t('share_content'),
       }
     })
   });
  }
  onPressSaved(saved) {
    if (saved) {

    } else {
      this.props.dispatch(setActiveTab('_save'));
      this.props.dispatch(setActiveSave(this.props));
    }
  }
  render() {
    const { favorite, width } = this.props;
    const containerWidth = width || PostImageWidth;
    const seo = this.props.seo || {};
    const iconSize = containerWidth / 9;
    return (
      <View
        style={styles.container}
        onLayout={this.handleLayout}
      >
        <ProgressImage
          url={seo.featured_image}
          style={{ height: containerWidth * 0.75, width: containerWidth }}
        />
        <TouchableOpacity onPress={this.onPressSaved.bind(this, favorite)} style={[styles.iconWrapper, { right: containerWidth / 6 }]}>
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
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareIcon} onPress={this.onPressShare.bind(this, this.props.slug)}>
          <Ionicons name="ios-cloud-upload" size={iconSize} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(PostImage);
