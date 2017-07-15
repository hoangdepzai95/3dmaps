import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage, StatusBar } from 'react-native';

import Router from './Router';
import { initApp } from './actions/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.dispatch(initApp());
    StatusBar.setBackgroundColor('#FFF');
  }
  componentDidMount() {
      StatusBar.setBackgroundColor('#FFF');
      this.setState({sdf : 2});
  }
  componentDidUpdate() {
    const { firstOpenApp, initDone } = this.props;
    if (firstOpenApp && initDone) {
      AsyncStorage.setItem('first_open', '1');
    }
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
