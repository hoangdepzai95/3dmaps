import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  emptyPost : {
    flex: 1,
  },
  suggestions: {
    backgroundColor: '#f6f6f6',
    paddingLeft: 0,
  },
});
export default styles;
