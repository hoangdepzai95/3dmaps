import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './style';

const MapAndFilter = (props) => {
  const { onPressMap, onPressFilter } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boxLeft} onPress={onPressMap}>
        <Image
          source={require('../../../assets/images/ic_map.png')}
          style={styles.mapIcon}
        />
        <Text>MAP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxRight} onPress={onPressFilter}>
        <Image
          source={require('../../../assets/images/ic_filter.png')}
          style={styles.filterIcon}
        />
        <Text>FILTER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapAndFilter;
