import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  favoriteIcon: {
    tintColor: 'red',
  },
  iconWrapper: {
    position: 'absolute',
    top: 5,
  },
  shareIcon: {
    position: 'absolute',
    top: 3,
    right: 5,
  },
});
export default styles;
