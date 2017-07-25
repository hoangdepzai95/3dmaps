import React from 'react';
import { View, Text } from 'react-native';
import StarRatingBar from '../../../../lib/react-native-star-rating-view/StarRatingBar';
import PostImage from '../../../../components/post-image';
import styles, { containerWidth } from './style';
import startstyles from '../../../../styles/starRating';
import homeStyles from '../../../../styles/home';

const Post = (props) => {
  return (
    <View style={[styles.container, props.even ? { marginRight: 13 } : null]}>
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
              <Text style={[homeStyles.statusText, styles.smallText, styles.statusText]}>TRENDING NOW</Text>
              <Text style={[homeStyles.timeText, styles.smallText]}>  5 minutes ago</Text>
            </View>
            <View style={styles.colLine2}>
              <Text style={[styles.likeText, styles.smallText]}>5 likes </Text>
              <Text style={styles.smallText}>10 reviews</Text>
            </View>
          </View>
        </View>
        <Text style={styles.smallText}>{props.formatedAddress}</Text>
      </View>
      <PostImage {...props} width={containerWidth} />
    </View>
  );
};
export default Post;
