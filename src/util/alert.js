import { AlertIOS, Alert, Platform } from 'react-native';

export default function alert(content) {
  if (Platform.OS === 'ios') {
    AlertIOS.alert(content);
  } else {
    Alert.alert(content);
  }
}
