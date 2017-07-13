import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './style';

const MapAndFilter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxLeft}>
        <Image
          source={require('../../../assets/images/ic_map.png')}
          style={styles.mapIcon}
        />
        <Text>MAP</Text>
      </View>
      <View style={styles.boxRight}>
        <Image
          source={require('../../../assets/images/ic_filter.png')}
          style={styles.filterIcon}
        />
        <Text>FILTER</Text>
      </View>
    </View>
  );
};

export default MapAndFilter;
