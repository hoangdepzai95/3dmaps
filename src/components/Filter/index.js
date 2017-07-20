import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import I18n from 'i18n-js';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import styles from './style';

const { height } = Dimensions.get('window');

const Filter = (props) => {
  const { onPressFilter } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boxRight} onPress={onPressFilter}>
        <SimpleLineIcons size={height / 43} name="equalizer" style={styles.filterIcon} color="#333" />
        <Text>{I18n.t('FILTER')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;
