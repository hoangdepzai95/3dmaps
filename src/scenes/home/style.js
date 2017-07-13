import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    padding: 13,
    paddingTop: 25,
    position: 'relative',
  },
  postRow: {
    flexDirection: 'row',
  },
  divider: {
    width: 13,
  },
  card: {
    height: 29,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#8f90fe'
  },
  gallery: {
    paddingBottom: 10,
  },
  mapAndFilter: {
    position: 'absolute',
    bottom: height / 15,
    width: width * 0.378,
    left: (width / 2) - ((width * 0.378) / 2),
    height: height / 17,
    backgroundColor: 'transparent',
    zIndex: 999,
    overflow: 'hidden',
  },
});
export default styles;
