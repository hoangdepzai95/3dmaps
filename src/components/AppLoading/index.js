import React from 'react';
import { View, Image } from 'react-native';
import styles from './style';

const AppLoading = ({ loading }) => {
  if (!loading) return null;
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/icons/loading.png')} style={styles.image} />
    </View>
  );
};

export default AppLoading;
