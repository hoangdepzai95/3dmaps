import React from 'react';
import { connect } from 'react-redux';

import Wellcome from './scenes/wellcome';
import MainPage from './scenes/MainPage';

const RouterComponent = (props) => {
  if (props.firstOpenApp) {
    return <Wellcome />;
  }
  return <MainPage />;
};

export default connect((state) => {
  return {
    firstOpenApp: state.auth.firstOpenApp,
  };
})(RouterComponent);
