import React from 'react';
import { View, Text } from 'react-native';
import StarRatingBar from '../../../../lib/react-native-star-rating-view/StarRatingBar';
import PostImage from '../../../../components/post-image';
import styles from './style';
import homeStyles from '../../../../styles/home';
import startstyles from '../../../../styles/starRating';

const Post = (props) => {
  return (
    <View style={[styles.container, props.even ? { marginRight: 13 } : null]}>
      <PostImage {...props} />
      <View style={styles.footer}>
        <Text>{props.title}</Text>
        <Text style={[homeStyles.statusText, styles.smallText]}>TRENDING NOW</Text>
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
    </View>
  );
};
export default Post;
