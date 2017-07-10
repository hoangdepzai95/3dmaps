import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { logOut } from '../../../actions/auth';

class LoggedIn extends Component {
  logOut = () => {
    AsyncStorage.removeItem('facebook_token');
    AsyncStorage.removeItem('google_token');
    this.props.dispatch(logOut());
  }
  render() {
    return (
      <View>
        <Button
          onPress={this.logOut}
          title="Login out"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

export default connect()(LoggedIn);
