import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

import { loginFaceBook, loginGoogle } from '../../../actions/auth';

class NotLogged extends Component {
  onLoginFaceBook = () => {
    this.props.dispatch(loginFaceBook());
  }
  onLoginGoogle = () => {
    this.props.dispatch(loginGoogle());
  }
  render() {
    return (
      <View>
        <Button
          onPress={this.onLoginFaceBook}
          title="Login with facebook"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.onLoginGoogle}
          title="Login with google"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

export default connect()(NotLogged);
