import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';

import Router from './Router';
import { checkLogin } from './actions/auth';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('will mount');
    this.props.dispatch(checkLogin());
  }
  componentDidUpdate() {
    const { firstOpenApp, authChecked } = this.props;
    if (firstOpenApp && authChecked) {
      console.log('go');
      AsyncStorage.setItem('first_open', '1');
    }
    console.log(this.props);
  }
  render() {
    const { firstOpenApp, authChecked } = this.props;
    if (!firstOpenApp && !authChecked) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <Router />
    );
  }
}
export default connect((state) => {
  return {
    firstOpenApp: state.auth.firstOpenApp,
    authChecked: state.auth.authChecked,
  };
})(App);
