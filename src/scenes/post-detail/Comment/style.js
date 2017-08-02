import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 60,
    marginHorizontal: 13,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  avatar: {
    height: height / 15,
    width: height / 15,
    borderRadius: height / 30,
    marginRight: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comment: {
    padding: 10,
  },
  time: {
    fontSize: 11,
    color: '#8f90fe',
  },

});

export default styles;
