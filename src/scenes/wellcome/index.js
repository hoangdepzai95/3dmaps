import React, { Component } from 'react';
import { View , Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { loginFaceBook, loginGoogle, skipLogin } from '../../actions/auth';
import styles from './style';

class WellCome extends Component {
  constructor(props) {
    super(props);
  }
  loginFaceBook = () => {
    this.props.dispatch(loginFaceBook());
  }
  loginGoogle = () => {
    this.props.dispatch(loginGoogle());
  }
  skipLogin = () => {
    this.props.dispatch(skipLogin());
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/SIGNIN2.png')}
          style={styles.backgroundImage}
        >
        <View style={styles.box1}>
          <Image
            source={require('../../../assets/images/3DMAP.png')}
            style={styles.iconMap}
          />
        </View>
        <View style={styles.box2}>
          <TouchableOpacity
            style={styles.facebookLogin}
            activeOpacity={0.7}
            onPress={this.loginFaceBook}
          >
            <Image
              source={require('../../../assets/images/facebook.png')}
              style={styles.facebookIcon}
            />
            <Text style={styles.buttonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.googleLogin}
            activeOpacity={0.7}
            onPress={this.loginGoogle}
          >
            <Image
              source={require('../../../assets/images/google-plus.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skip} onPress={this.skipLogin}>
            <Text style={styles.skipText}>Skip Login</Text>
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/company.png')}
            style={styles.company}
          />
        </View>
        </Image>
      </View>
    );
  }
}

export default connect()(WellCome);
