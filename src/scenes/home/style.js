import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    padding: 13,
    paddingTop: 25,
  },
  postRow: {
    flexDirection: 'row',
  },
  divider: {
    width: 13,
  },
  card: {
    height: 29,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#8f90fe'
  },
  gallery: {
    paddingBottom: 10,
  }
});
export default styles;
