import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, BackHandler } from 'react-native';
import AppLoading from './components/AppLoading';

import Router from './Router';
import { initApp } from './actions/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApp: true,
      showLoading: false,
    };
  }
  componentWillMount() {
    this.props.dispatch(initApp(this));
    this.handelBackAndroid();
  }
  componentDidUpdate(prevProps, preState) {
    const { firstOpenApp, initDone } = this.props;
    if (firstOpenApp && initDone) {
      AsyncStorage.setItem('first_open', '1');
    }
    if (preState.showApp && !this.state.showApp) {
      setTimeout(() => {
        this.setState(
          { showApp: true },
          () => {
            setTimeout(() => {
              this.setState({
                showLoading: false,
              });
            }, 0);
          },
        );
      }, 0);
    }
  }
  handelBackAndroid = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }
  forceRender = () => {
    this.setState(
      { showApp: false, showLoading: true },
    );
  }
  render() {
    const { loading, initDone } = this.props;
    const { showApp, showLoading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <AppLoading loading={loading || showLoading} />
        {
          initDone && showApp ?
            <View style={{ flex: 1, opacity: loading || showLoading ? 0 : 1 }}>
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
    activeTab: state.layout.active,
    stackHome: state.layout.stackHome,
    stackExperience: state.layout.stackExperience,
  };
})(App);
