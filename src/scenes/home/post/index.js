import React from 'react';
import { View, Text } from 'react-native';
import Stars from 'react-native-stars-rating';
import PostImage from '../../../components/post-image';
import styles from './style';

const Post = (props) => {
  return (
    <View style={styles.container}>
      <PostImage {...props} />
      <View style={styles.footer}>
        <View style={styles.description}>
          <Text>Green city</Text>
          <Text style={styles.smallText}>Nguyễn huy tưởng</Text>
        </View>
        <View style={styles.rating}>
          <Stars
            isActive={false}
            rateMax={5}
            isHalfStarEnabled={false}
            rate={props.rate}
            color="#ff8b00"
            size={12}
          />
        </View>
      </View>
    </View>
  );
};
export default Post;
