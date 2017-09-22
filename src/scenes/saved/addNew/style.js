import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
    backgroundColor: '#FFF',
    paddingTop: 40,
    padding: 20,
  },
  headerText: {
    fontSize: 14,
    paddingBottom: 35,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
    paddingBottom: 7,
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 0,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  radio: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  settingText: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 35,
    paddingBottom: 20,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
});
export default styles;
