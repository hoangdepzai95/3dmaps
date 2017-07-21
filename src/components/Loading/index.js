import * as Progress from 'react-native-progress';
import React from 'react';
import { View } from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Progress.Circle size={25} indeterminate color="#7076eb" borderWidth={2} />
    </View>
  );
};

export default Loading;
