import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 7,
  },
  suggestPlace: {
    paddingTop: 10,
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
