import React from 'react';
import Image from 'react-native-image-progress';
import * as ProgressBar from 'react-native-progress';

const ProgressImage = ({ style, url }) => {
  return (
    <Image
      source={{ uri: url }}
      style={style}
      indicator={ProgressBar.Circle}
      indicatorProps={{
        size: 25,
        borderWidth: 1,
        color: '#7076eb',
      }}
      resizeMode="cover"
    />
  );
};

export default ProgressImage;
