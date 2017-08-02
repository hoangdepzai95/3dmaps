import React from 'react';
import { View, Text } from 'react-native';
import I18n from 'i18n-js';
import StarRatingBar from '../../../../lib/react-native-star-rating-view/StarRatingBar';
import PostImage from '../../../../components/post-image';
import styles from './style';
import homeStyles from '../../../../styles/home';
import startstyles from '../../../../styles/starRating';
import PostWrapper from '../../../../components/PostWrapper';

const Post = (props) => {
  return (
    <PostWrapper
      style={[styles.container, props.even ? { marginRight: 13 } : null]}
      post={props}
      type={props.type}
    >
      <PostImage {...props} />
      <View style={styles.footer}>
        <Text>{props.title}</Text>
        {
          props.trending ?
            <Text style={[homeStyles.statusText, styles.smallText, styles.statusText]}>{I18n.t('TRENDING_NOW')}</Text>
            : null
        }
        <View style={styles.rating}>
          <StarRatingBar
            score={props.rating}
            allowsHalfStars={false}
            accurateHalfStars={false}
            readOnly
            starStyle={startstyles.star}
            spacing={startstyles.space}
          />
        </View>
      </View>
    </PostWrapper>
  );
};
export default Post;
