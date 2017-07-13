import React from 'react';
import { View, Text } from 'react-native';
import PostImage from '../../../components/post-image';
import styles from './style';

const Post = (props) => {
  return (
    <View style={styles.container}>
      <PostImage {...props} />
    </View>
  );
};
export default Post;
