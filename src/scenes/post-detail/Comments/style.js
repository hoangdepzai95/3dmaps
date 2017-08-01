import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  comment: {
    marginBottom: 0,
    marginTop: 10,
  },
  postComment: {
    marginHorizontal: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    width: 100,
    backgroundColor: '#7076eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    color: '#FFF',
  },
});

export default styles;
