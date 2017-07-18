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
  contentSuggest: {
    flex: 1,
  },
  rating: {
    paddingTop: 3,
    flex: 7,
  },
  boldText: {
    fontWeight: '400',
  },
});
