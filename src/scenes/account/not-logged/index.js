import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Dimensions, Image, WebView } from 'react-native';
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
            <Text style={styles.buttonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.googleLogin}
            activeOpacity={0.7}
            onPress={this.loginGoogle}
          >
            <EvilIcons color="#FFF" name="sc-google-plus" size={iconSize} style={styles.googleIcon} />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <ToolTag label="ACCOUNT SETTING" iconType="SimpleLineIcons" iconName="settings" />
          <ToolTag label="HELP & SUPPORT" iconType="MaterialCommunityIcons" iconName="information-outline" />
          <Text style={styles.bottomText}>Toan Dung Media, All Rights Reserved</Text>
        </View>
      </View>
    );
  }
}

export default connect()(NotLogged);
