import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: height / 3,
    marginHorizontal: 13,
    marginBottom: 20,
  },
});
