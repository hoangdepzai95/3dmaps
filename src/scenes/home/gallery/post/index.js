import React from 'react';
import { View, Text } from 'react-native';
import I18n from 'i18n-js';
import StarRatingBar from '../../../../lib/react-native-star-rating-view/StarRatingBar';
import TimeAgo from '../../../../lib/react-native-timeago';
import PostImage from '../../../../components/post-image';
import styles, { containerWidth } from './style';
import startstyles from '../../../../styles/starRating';
import homeStyles from '../../../../styles/home';
import PostWrapper from '../../../../components/PostWrapper';

const Post = (props) => {
  return (
    <PostWrapper
      style={[styles.container, props.even ? { marginRight: 13 } : null]}
      post={props}
      type={props.type}
    >
      <View style={styles.header}>
        <View style={styles.rating}>
          <View style={styles.headerLine1}>
            <Text style={styles.titleText}>{props.title}</Text>
            <StarRatingBar
              score={props.rating}
              allowsHalfStars={false}
              accurateHalfStars={false}
              readOnly
              style={styles.starRating}
              starStyle={startstyles.star}
              spacing={startstyles.space}
            />
          </View>
          <View style={styles.headerLine2}>
            <View style={styles.colLine2}>
              {
                props.trending ?
                  <Text style={[homeStyles.statusText, styles.smallText, styles.statusText]}>{I18n.t('TRENDING_NOW')}</Text>
                  : null
              }
              <TimeAgo
                time={props.created_at}
                style={[homeStyles.timeText, styles.smallText]}
              />
            </View>
            <View style={styles.colLine2}>
              <Text style={[styles.likeText, styles.smallText]}>{props.like_num} {I18n.t('likes')} </Text>
              <Text style={styles.smallText}>{props.reviews} {I18n.t('reviews')}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.smallText}>{props.formatedAddress}</Text>
      </View>
      <PostImage {...props} width={containerWidth} />
    </PostWrapper>
  );
};
export default Post;
