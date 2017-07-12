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
    height: 15,
    width: 15,
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
