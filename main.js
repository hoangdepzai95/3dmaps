import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './src/reducers';
import rootSaga from './src/sagas';
import App from './src/App';
import setUpLang from './src/util/lang';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
                reducers,
                applyMiddleware(sagaMiddleware),
              );
sagaMiddleware.run(rootSaga);
setUpLang();
const root = () => {
  return (
    <Provider
      store={store}
    >
      <View style={styles.container}>
        <App />
      </View>
    </Provider>
  );
};

Expo.registerRootComponent(root);
