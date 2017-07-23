import React, { Component } from 'react';
import { View, Text, AsyncStorage, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';

import { logOut } from '../../../actions/auth';
import styles from './style';
import ToolTag from '../ToolTag';

const { height, width } = Dimensions.get('window');

class LoggedIn extends Component {
  logOut = () => {
    AsyncStorage.removeItem('facebook_token');
    AsyncStorage.removeItem('google_token');
    AsyncStorage.removeItem('user_id');
    this.props.dispatch(logOut());
  }
  render() {
    const { userInfo } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <View style={styles.userInfo}>
          <Image
            style={styles.userImage}
            source={{ uri: userInfo.avatar }}
          />
          <Text style={styles.userName}>{userInfo.fullname}</Text>
        </View>
        <View style={styles.footerTools}>
          <ToolTag label={I18n.t('SAVED_CONTENTS')} iconType="Ionicons" iconName="md-heart-outline" />
          <ToolTag label={I18n.t('ACCOUNT_SETTINGS')} iconType="SimpleLineIcons" iconName="settings" />
          <ToolTag label={I18n.t('HELP_AND_SUPPORT')} iconType="MaterialCommunityIcons" iconName="information-outline" />
        </View>
        <Text style={styles.bottomText}>{I18n.t('COPYRIGHT_TEXT')}</Text>
      </View>
    );
  }
}

export default connect((state) => {
  console.log(state.auth);
  return {
    userInfo: state.auth.userInfo,
  };
})(LoggedIn);
