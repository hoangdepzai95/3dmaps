import React from 'react';
import { View } from 'react-native';
import Swiper from '../../components/PageSwiper';
import styles from './style';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';

const Wellcome = () => {
  return (
    <View style={styles.wrapper}>
      <Swiper style={styles.container} showsPagination>
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
