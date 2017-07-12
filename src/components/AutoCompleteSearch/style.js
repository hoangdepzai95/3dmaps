import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 37,
    flex: 1,
    position: 'relative',
  },
  input: {
    height: 37,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 3,
    paddingBottom: 0,
    paddingLeft: 35,
  },
  icon: {
    tintColor: '#ccc',
    position: 'absolute',
    width: 15,
    height: 15,
    top: 11,
    left: 6,
  },
});

export default styles;
