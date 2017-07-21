import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View } from 'react-native';
import AppLoading from './components/AppLoading';

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
  render() {
    const { loading, initDone } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <AppLoading loading={loading} />
        {
          initDone ?
            <View style={{ flex: 1, opacity: loading ? 0 : 1 }}>
              <Router />
            </View>
            : null
        }
      </View>
    );
  }
}
export default connect((state) => {
  return {
    initDone: state.auth.initDone,
    loading: state.layout.loading || !state.auth.initDone,
  };
})(App);
