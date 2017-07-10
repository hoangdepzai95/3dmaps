import React from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swipe-a-lot';
import styles from './style';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';

const circleDefaultStyle = {
  width: 8,
  height: 8,
  margin: 10,
  backgroundColor: 'rgb(158, 158, 158)',
  borderRadius: 4,
};

const Wellcome = () => {
  return (
    <View style={styles.wrapper}>
      <Swiper circleDefaultStyle={circleDefaultStyle}>
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
      </Swiper>
    </View>
  );
};

export default Wellcome;
