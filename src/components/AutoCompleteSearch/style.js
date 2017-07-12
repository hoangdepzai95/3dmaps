import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 3,
    paddingBottom: 0,
    paddingLeft: 35,
    paddingRight: 10,
  },
  icon: {
    tintColor: '#acacac',
    position: 'absolute',
    width: 15,
    height: 15,
    top: 6,
    left: 16,
  },
});

export default styles;
