import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BASE_API_URL } from './config';
// inital
axios.defaults.baseURL = BASE_API_URL;
// ---------------------

export default {
  initApp() {
    console.log('init1');
    const p1 = AsyncStorage.getItem('facebook_token');
    const p2 = AsyncStorage.getItem('google_token');
    const p3 = AsyncStorage.getItem('first_open');
    return Promise.all([p1, p2, p3]);
  },
};
