import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  box1: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  box2: {
    flex: 4,
    paddingTop: '25%',
    paddingHorizontal: '11%',
  },
  iconMap: {
    alignSelf: 'flex-end',
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'cover',
  },
  facebookLogin: {
    backgroundColor: '#3b5998',
    borderRadius: 8,
    height: '15%',
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLogin: {
    backgroundColor: '#ff6363',
    borderRadius: 8,
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    marginTop: '5%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  skipText: {
    color: '#acaeb2',
    backgroundColor: 'transparent',
  },
  company: {
    alignSelf: 'center',
    marginTop: '30%',
    width: width * 0.146,
    height: width * 0.146 * 0.574,
  },
  facebookIcon: {
  },
  googleIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default styles;
