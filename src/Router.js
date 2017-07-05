import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import Wellcome from './scenes/wellcome';
import MainPage from './scenes/MainPage';

const RouterComponent = () => {
  return (
    <Router hideNavBar >
      <Scene key="wellcomeArea">
        <Scene key="wellcome" component={Wellcome} />
      </Scene>
      <Scene key="main" initial>
        <Scene key="MainPage" component={MainPage} initial />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
