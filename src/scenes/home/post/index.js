import React from 'react';
import { View, Text } from 'react-native';
import StarRatingBar from '../../../lib/react-native-star-rating-view/StarRatingBar';
import PostImage from '../../../components/post-image';
import styles from './style';
import startstyles from '../../../styles/starRating';
import PostWrapper from '../../../components/PostWrapper';

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
        <Text style={styles.smallText}>{props.formatedAddress}</Text>
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
