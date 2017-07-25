import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const containerWidth = width - (13 * 2);
const styles = StyleSheet.create({
  container: {
    width: containerWidth,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: height / 30,
  },
  header: {
    padding: 8,
    justifyContent: 'flex-start',
  },
  rating: {
  },
  titleText: {
    maxWidth: '70%',
  },
  headerLine1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headerLine2: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colLine2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 11,
  },
  statusText: {
  },
  likeText: {
  },
  starRating: {
    marginRight: -15,
  },
});
export default styles;
