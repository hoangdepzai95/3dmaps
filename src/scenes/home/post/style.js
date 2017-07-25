import { StyleSheet } from 'react-native';
import { PostImageWidth } from '../../../styles/home';

const styles = StyleSheet.create({
  container: {
    width: PostImageWidth,
  },
  footer: {
    paddingTop: 3,
    justifyContent: 'flex-start',
  },
  rating: {
    paddingTop: 3,
  },
  smallText: {
    fontSize: 11,
  },
});
export default styles;
