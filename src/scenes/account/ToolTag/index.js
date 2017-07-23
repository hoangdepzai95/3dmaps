import React from 'react';
import { Text, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './style';

const { height } = Dimensions.get('window');
const ToolTag = ({ label, iconName, iconType }) => {
  let leftIcon;
  const iconSize = height / 25;
  if (iconType === 'SimpleLineIcons') {
    leftIcon = <SimpleLineIcons size={iconSize} name={iconName} />;
  } else if (iconType === 'MaterialCommunityIcons') {
    leftIcon = <MaterialCommunityIcons size={iconSize} name={iconName} />;
  } else if (iconType === 'Ionicons') {
    leftIcon = <Ionicons size={iconSize} name={iconName} />;
  }
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.3}>
      {leftIcon}
      <Text style={styles.label}>{label}</Text>
      <Entypo name="chevron-right" size={iconSize} color="#1069ff" />
    </TouchableOpacity>
  );
};

export default ToolTag;
