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
  webView: {
    height: height / 2,
  },
  footer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 13,
  },
});

export default styles;
