import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage, StatusBar } from 'react-native';

import Router from './Router';
import { initApp } from './actions/auth';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(initApp());
  }
  componentDidUpdate() {
    const { firstOpenApp, initDone } = this.props;
    if (firstOpenApp && initDone) {
      AsyncStorage.setItem('first_open', '1');
    }
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  render() {
    const { firstOpenApp, initDone } = this.props;
    if (!firstOpenApp && !initDone) {
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
    initDone: state.auth.initDone,
  };
})(App);
