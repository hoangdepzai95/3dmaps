import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    overflow: 'hidden',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  mapIcon: {
    tintColor: '#333',
    width: (height / 17) * 0.44,
    height: (height / 17) * 0.44,
    marginRight: 5,
  },
  filterIcon: {
    tintColor: '#333',
    width: (height / 17) * 0.42,
    height: (height / 17) * 0.37,
    marginRight: 5,
  },
  boxRight: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  boxLeft: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  }
});

export default styles;
