import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'i18n-js';

import { logOut, changeLocale } from '../../../actions/auth';
import { resetData } from '../../../actions/fetchData';
import { pushSubTab } from '../../../actions/layout';
import styles from './style';
import ToolTag from '../ToolTag';
import Saved from '../../saved';

class LoggedIn extends Component {
  logOut = () => {
    AsyncStorage.removeItem('facebook_token');
    AsyncStorage.removeItem('google_token');
    AsyncStorage.removeItem('user_id');
    this.props.dispatch(logOut());
  }
  changeLocale(locale) {
    if (this.props.locale === locale) return;
    I18n.locale = locale;
    AsyncStorage.setItem('locale', locale);
    this.props.dispatch(resetData());
    this.props.App.forceRender();
    this.props.dispatch(changeLocale(locale));
  }
  onPressSaved = () => {
    this.props.dispatch(pushSubTab('stackAccount', 'saved'));
  }
  render() {
    const { userInfo, vnSelected, engSelected } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.flags}>
            <TouchableOpacity
              style={[styles.wrapFlag1, vnSelected ? styles.selectedFlag : {}]}
              onPress={this.changeLocale.bind(this, 'vi_VN')}
            >
              <Image
                source={require('../../../../assets/images/VN.png')}
                style={styles.flag1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.wrapFlag2, engSelected ? styles.selectedFlag : {}]}
              onPress={this.changeLocale.bind(this, 'en_US')}
            >
              <Image
                source={require('../../../../assets/images/GB.png')}
                style={styles.flag2}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this.logOut}
          >
            <Text style={styles.logoutText}>{I18n.t('LOG_OUT')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <Image
            style={styles.userImage}
            source={{ uri: userInfo.avatar }}
          />
          <Text style={styles.userName}>{userInfo.fullname}</Text>
        </View>
        <View style={styles.footerTools}>
          <ToolTag
            label={I18n.t('SAVED_CONTENTS')}
            iconType="Ionicons"
            iconName="md-heart-outline"
            onPress={this.onPressSaved}
          />
          <ToolTag label={I18n.t('ACCOUNT_SETTINGS')} iconType="SimpleLineIcons" iconName="settings" />
          <ToolTag label={I18n.t('HELP_AND_SUPPORT')} iconType="MaterialCommunityIcons" iconName="information-outline" />
        </View>
        <Text style={styles.bottomText}>{I18n.t('COPYRIGHT_TEXT')}</Text>
        <Saved />
      </View>
    );
  }
}

export default connect((state) => {
  return {
    userInfo: state.auth.userInfo,
    vnSelected: state.auth.locale === 'vi_VN',
    engSelected: state.auth.locale !== 'vi_VN',
    App: state.layout.App,
    locale: state.auth.locale,
  };
})(LoggedIn);
