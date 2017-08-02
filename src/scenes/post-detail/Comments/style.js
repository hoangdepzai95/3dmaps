import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 5,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  comment: {
    marginBottom: 0,
    marginTop: 10,
  },
  postComment: {
    marginHorizontal: 10,
    marginBottom: 5,
    alignItems: 'flex-end',
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
  comments: {
    paddingBottom: 30,
  },
});

export default styles;
