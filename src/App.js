import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View } from 'react-native';
import AppLoading from './components/AppLoading';

import Router from './Router';
import { initApp } from './actions/auth';
import { changeLoading } from './actions/layout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApp: true,
    };
  }
  componentWillMount() {
    this.props.dispatch(initApp(this));
  }
  componentDidUpdate() {
    const { firstOpenApp, initDone } = this.props;
    if (firstOpenApp && initDone) {
      AsyncStorage.setItem('first_open', '1');
    }
  }
  forceRender = () => {
    this.setState(
      { showApp: false },
      () => {
        this.setState({ showApp: true });
      },
    );
  }
  render() {
    const { loading, initDone } = this.props;
    const { showApp } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <AppLoading loading={loading || !showApp} />
        {
          initDone && showApp ?
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
