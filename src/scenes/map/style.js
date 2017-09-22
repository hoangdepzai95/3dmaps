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
    paddingBottom: 10,
  },
  rating: {
    paddingBottom: 5,
  },
  boldText: {
    fontWeight: '400',
    marginBottom: 4,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  tag: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#74a8ff',
    marginRight: 6,
    marginBottom: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  tagText: {
    color: '#808cff',
    fontSize: 11,
  },
  textFooter: {
    fontSize: 11,
  },
  colLine2: {
    flexDirection: 'row',
  },
  smallText: {
    fontSize: 11,
  },
});
