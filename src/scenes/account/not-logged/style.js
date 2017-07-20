import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  blankUser: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankImage: {
    width: height / 6,
    height: height / 6,
  },
  login: {
    flex: 7,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#f6f6f6',
  },
  facebookLogin: {
    backgroundColor: '#3b5998',
    borderRadius: 2,
    height: '12%',
    width: '65%',
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLogin: {
    backgroundColor: '#d34836',
    borderRadius: 2,
    height: '12%',
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 15,
  },
  facebookIcon: {
  },
  googleIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
  },
  bottomText: {
    position: 'absolute',
    bottom: 10,
  },
});

export default styles;
