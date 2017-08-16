import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    position: 'relative',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: height / 40,
  },
  flags: {
    flexDirection: 'row',
  },
  flag1: {
    width: height / 16,
    height: height / 22,
    resizeMode: 'stretch',
  },
  flag2: {
    width: height / 17,
    height: height / 23,
    resizeMode: 'stretch',
  },
  wrapFlag1: {
    marginRight: 5,
  },
  selectedFlag: {
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#2694cc',
    height: (height / 23) + 6,
    marginTop: -3,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  logoutText: {
    color: '#c70000',
  },
});

export default styles;
