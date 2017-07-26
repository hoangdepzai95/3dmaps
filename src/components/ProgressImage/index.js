import React from 'react';
import Image from 'react-native-image-progress';
import Loading from '../Loading';

const ProgressImage = ({ style, url }) => {
  return (
    <Image
      source={{ uri: url }}
      style={style}
      indicator={Loading}
      resizeMode="cover"
    />
  );
};

export default ProgressImage;
