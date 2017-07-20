import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Dimensions, Image, WebView } from 'react-native';
import I18n from 'i18n-js';
import { connect } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';

import { loginFaceBook, loginGoogle } from '../../../actions/auth';
import ToolTag from '../ToolTag';
import styles from './style';

const { height, width } = Dimensions.get('window');

class NotLogged extends Component {
  loginFaceBook = () => {
    this.props.dispatch(loginFaceBook());
  }
  loginGoogle = () => {
    this.props.dispatch(loginGoogle());
  }
  render() {
    const iconSize = height / 25;
    return (
      <View style={styles.container}>
        <View style={styles.blankUser}>
          <Image
            source={require('../../../../assets/images/blank-profile-picture.png')}
            style={styles.blankImage}
          />
        </View>
        <View style={styles.login}>
          <TouchableOpacity
            style={styles.facebookLogin}
            activeOpacity={0.7}
            onPress={this.loginFaceBook}
          >
            <EvilIcons color="#FFF" name="sc-facebook" size={iconSize} style={styles.facebookIcon} />
            <Text style={styles.buttonText}>{I18n.t('Sign_in_with_Facebook')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.googleLogin}
            activeOpacity={0.7}
            onPress={this.loginGoogle}
          >
            <EvilIcons color="#FFF" name="sc-google-plus" size={iconSize} style={styles.googleIcon} />
            <Text style={styles.buttonText}>{I18n.t('Sign_in_with_Google')}</Text>
          </TouchableOpacity>
          <ToolTag label={I18n.t('ACCOUNT_SETTINGS')} iconType="SimpleLineIcons" iconName="settings" />
          <ToolTag label={I18n.t('HELP_AND_SUPPORT')} iconType="MaterialCommunityIcons" iconName="information-outline" />
          <Text style={styles.bottomText}>{I18n.t('COPYRIGHT_TEXT')}</Text>
        </View>
      </View>
    );
  }
}

export default connect()(NotLogged);
