import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import styles from './style';
const { height, width } = Dimensions.get('window');

const Filter = (props) => {
  const { onPressFilter } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boxRight} onPress={onPressFilter}>
        <SimpleLineIcons size={height/43} name="equalizer" style={styles.filterIcon} color="#333" />
        <Text>FILTER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;
