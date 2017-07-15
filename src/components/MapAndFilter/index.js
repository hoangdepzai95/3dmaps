import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import styles from './style';
const { height, width } = Dimensions.get('window');

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
        <SimpleLineIcons size={height/43} name="equalizer" style={styles.filterIcon} color="#333" />
        <Text>FILTER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapAndFilter;
