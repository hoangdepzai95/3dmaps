import React from 'react';
import { View, TextInput, Image } from 'react-native';
import I18n from 'i18n-js';
import styles from './style';

const AutoCompleteSearch = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder={I18n.t('Search')}
      />
      <View style={styles.iconWrapper}>
        <Image
          source={require('../../../assets/images/search.png')}
          style={styles.icon}
        />
      </View>
    </View>
  );
};
export default AutoCompleteSearch;
