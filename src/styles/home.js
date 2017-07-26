import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const padding = 13;
export const PostImageWidth = (width - (padding * 3)) / 2;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    paddingTop: 25,
    padding,
    position: 'relative',
  },
  footerSpace: {
    height: height / 8,
  },
  postRow: {
    flexDirection: 'row',
  },
  card: {
    height: height / 19,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#8f90fe',
  },
  gallery: {
    paddingBottom: 10,
  },
  mapAndFilter: {
    position: 'absolute',
    bottom: height / 15,
    height: height / 17,
    backgroundColor: 'transparent',
    zIndex: 9999,
    shadowColor: '#333',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  filterStyle: {
    position: 'absolute',
    bottom: height / 15,
    width: width * 0.25,
    left: (width / 2) - ((width * 0.25) / 2),
    height: height / 17,
    backgroundColor: 'transparent',
    zIndex: 999,
    shadowColor: '#333',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  statusText: {
    color: '#8f90fe',
    fontWeight: '200',
  },
  timeText: {
    color: '#969696',
    fontWeight: '200',
  },
});
export default styles;
