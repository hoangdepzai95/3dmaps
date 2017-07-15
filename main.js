import React from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { View, StyleSheet, StatusBar  } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './src/reducers';
import rootSaga from './src/sagas';
import App from './src/App';

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
const root = () => {
  return (
    <Provider
      store={store}
    >
      <View style={styles.container}>
        <StatusBar
           backgroundColor="transparent"
           barStyle="light-content"
           translucent={false}
         />
        <App />
      </View>
    </Provider>
  );
};

Expo.registerRootComponent(root);
