import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: width / 20,
    height: height / 11,
    marginBottom: 3,
  },
  label: {
    flex: 1,
    marginLeft: width / 16,
  },
});

export default styles;
