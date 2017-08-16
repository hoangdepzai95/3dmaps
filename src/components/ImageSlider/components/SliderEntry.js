import React from 'react';
import { View } from 'react-native';
import getStyles from '../styles/SliderEntry.style';
import PostWrapper from '../../../components/PostWrapper';
import PostImage from '../../../components/post-image';

const SliderEntry = ({ data, containerWidth, containerHeight }) => {
  const styles = getStyles(containerWidth, containerHeight);
  return (
    <View
      style={styles.styles.slideInnerContainer}
    >
      <PostWrapper>
        <PostImage {...data} />
      </PostWrapper>
    </View>
  );
};

export default SliderEntry;
