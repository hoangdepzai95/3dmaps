import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './style';

const AutoCompleteSearch = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};
export default AutoCompleteSearch;
