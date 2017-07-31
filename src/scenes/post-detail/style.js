import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f6f6f6',
    zIndex: 999999,
    paddingTop: 13,
  },
  footer: {
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 25,
    backgroundColor: '#FFF',
    margin: 13,
    marginBottom: 0,
    padding: 10,
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
  headerLine3: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  colLine2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 11,
  },
  starRating: {
    marginRight: -15,
  },
});

export default styles;
