import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Facebook, Permissions, Location } from 'expo';
import I18n from 'i18n-js';
import setUpLang from './util/lang';
import { BASE_API_URL, FACEBOOK_ID, PER_PAGE } from './config';
// inital
axios.defaults.baseURL = BASE_API_URL;
// ---------------------
function getLocale() {
  return I18n.currentLocale().split('_')[0];
}
function getExperiencePage() {
  return axios.get(`categories?locale=${getLocale()}&experiences=2`);
}
function getMapPage() {
  return axios.get(`categories?locale=${getLocale()}&experiences=2`);
}
async function getUserInfo() {
  const userId = await AsyncStorage.getItem('user_id');
  return axios.get(`users?id=${userId}`);
}
async function getLocationAsync() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    return Location.getCurrentPositionAsync({enableHighAccuracy: true});
  } else {
    return false;
  }
}

export default {
  initApp() {
    const p1 = AsyncStorage.getItem('facebook_token');
    const p2 = AsyncStorage.getItem('google_token');
    const p3 = AsyncStorage.getItem('first_open');
    const p4 = setUpLang();
    const p5 = AsyncStorage.getItem('user_id');
    const p6 = getLocationAsync();
    return Promise.all([p1, p2, p3, p4, p5, p6]);
  },
  loginFaceBook() {
    return Facebook.logInWithReadPermissionsAsync(FACEBOOK_ID, {
      permissions: ['public_profile', 'email'],
    });
  },
  getHomeGallery() {
    return axios.get(`galleries?locale=${getLocale()}&posts=${PER_PAGE}`);
  },
  getPost(id, page, type) {
    if (type === 'category') {
      return axios.get(`experiences?locale=${getLocale()}&category_id=${id}&page=${page}&per_page=${PER_PAGE}`)
    } else if (type === 'gallery') {
      return axios.get(`posts?locale=${getLocale()}&page=${page}&per_page=${PER_PAGE}&gallery_id=${id}`)
    }
  },
  getSaved(userId){
    return axios.get(`favorites?user_id=${userId}&items=${PER_PAGE}`);
  },
  getComments(postId, postType, page) {
    return axios.get(`comments?item_id=${postId}&page=${page}&per_page=15&item_type=${postType}`);
  },
  getExperienceCategory() {
    return axios.get(`categories?locale=${getLocale()}&experiences=${PER_PAGE}`);
  },
  getMapPosts() {
    return axios.get(`addresses?latlon=21.0177,105.84197&r=100000000&locale=${getLocale()}`);
  },
  getUserInfo(token) {
    return axios.get( `https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture`);
  },
  loginBackend(userInfo) {
    return axios.post('sign_in', {
      email: userInfo.email,
      avatar: userInfo.avatar,
      fullname: userInfo.name,
    });
  },
  getUserBackendInfo(userId) {
    return axios.get(`users?id=${userId}`);
  },
  postComment(userId, postType, postId, content) {
    return axios.post('comments', {
      user_id: userId,
      item_type: postType,
      item_id: postId,
      content,
    });
  }
};
