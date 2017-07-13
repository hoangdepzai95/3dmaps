import React from 'react';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import Wellcome from './scenes/wellcome';
import MainPage from './scenes/MainPage';

const RouterComponent = ({ firstOpenApp, authType }) => {
  if (!authType) {
    return <Wellcome />;
  }
  return <MainPage />;
};

export default connect((state) => {
  return {
    firstOpenApp: state.auth.firstOpenApp,
    authType: state.auth.authType,
  };
})(RouterComponent);
