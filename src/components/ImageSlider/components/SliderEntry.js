import React from 'react';
import { View, Image } from 'react-native';
import getStyles from '../styles/SliderEntry.style';

const SliderEntry = ({ data, containerWidth, containerHeight }) => {
  const styles = getStyles(containerWidth, containerHeight);
  return (
    <View
      style={styles.styles.slideInnerContainer}
    >
      <Image
        source={{ uri: data.image }}
        style={styles.styles.image}
      />
    </View>
  );
};

export default SliderEntry;
