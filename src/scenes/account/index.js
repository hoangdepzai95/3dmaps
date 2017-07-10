import React from 'react';
import { connect } from 'react-redux';

import LoggedIn from './logged-in';
import NotLogged from './not-logged';

const Account = ({ authType }) => {
  if (authType) {
    return <LoggedIn />;
  }
  return <NotLogged />;
};

export default connect((state) => {
  return {
    authType: state.auth.authType,
  };
})(Account);
