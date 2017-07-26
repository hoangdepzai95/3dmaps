import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = ({ style }) => {
  return (
    <View
      style={[{
        justifyContent: 'center',
        alignItems: 'center',
      }, style]}
    >
      <ActivityIndicator color="#7076eb" size={25} />
    </View>
  );
};

export default Loading;
