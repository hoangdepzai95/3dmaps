import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 20,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categories: {
    paddingTop: 20,
    height: height / 1.5,
  },
  item: {
    borderWidth: 1,
    borderColor: '#8f90fe',
    marginBottom: 5,
    padding: 5,
    borderRadius: 8,
  },
});
export default styles;
