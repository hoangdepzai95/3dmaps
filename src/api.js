import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { BASE_API_URL, FACEBOOK_ID } from './config';
// inital
axios.defaults.baseURL = BASE_API_URL;
// ---------------------

export default {
  initApp() {
    const p1 = AsyncStorage.getItem('facebook_token');
    const p2 = AsyncStorage.getItem('google_token');
    const p3 = AsyncStorage.getItem('first_open');
    return Promise.all([p1, p2, p3]);
  },
  loginFaceBook() {
    return Facebook.logInWithReadPermissionsAsync(FACEBOOK_ID, {
      permissions: ['public_profile'],
    });
  },
};
