import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  bottomText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  userImage: {
    width: height / 6,
    height: height / 6,
    borderRadius: height / 12,
  },
  header: {
    flex: 2,
  },
  userInfo: {
    flex: 10,
    alignItems: 'center',
  },
  footerTools: {
    flex: 6,
    marginBottom: height / 10,
  },
  userName: {
    marginTop: 10,
  },
});

export default styles;
