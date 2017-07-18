import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = {
  space: 2,
  star: {
    width: width / 35,
    height: width / 35,
  },
};
export default styles;
