import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Router from './Router';
import reducers from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
                reducers,
                applyMiddleware(sagaMiddleware),
              );
sagaMiddleware.run(rootSaga);
const App = () => {
  return (
    <Provider
      store={store}
    >
      <Router />
    </Provider>
  );
};

export default App;
