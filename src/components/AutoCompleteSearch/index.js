import React from 'react';
import { View, TextInput, Image } from 'react-native';
import styles from './style';

const AutoCompleteSearch = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Search"
      />
      <Image
        source={require('../../../assets/images/search.png')}
        style={styles.icon}
      />
    </View>
  );
};
export default AutoCompleteSearch;
