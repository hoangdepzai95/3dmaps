import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel from '../../lib/react-native-snap-carousel';
import SliderEntry from './components/SliderEntry';
import styles from './styles/index.style';
import getStyles from './styles/SliderEntry.style';

export default class example extends Component {
  getSlides = () => {
    const { source, containerHeight, containerWidth } = this.props;
    if (!source) {
      return null;
    }

    return source.map((data, index) => {
      return (
        <SliderEntry
          key={`carousel-entry-${index}`}
          even={(index + 1) % 2 === 0}
          data={data}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        />
      );
    });
  }
  getContent = () => {
    const { containerWidth, containerHeight, onSnapToItem } = this.props;
    const contentStyles = getStyles(containerWidth, containerHeight);
    return (
      <Carousel
        sliderWidth={contentStyles.sliderWidth}
        itemWidth={contentStyles.itemWidth}
        firstItem={1}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.6}
        enableMomentum={false}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid
        removeClippedSubviews={false}
        onSnapToItem={onSnapToItem}
      >
        {this.getSlides()}
      </Carousel>
    );
  }
  render() {
    return (
      <View
        style={styles.container}
      >
        {this.getContent()}
      </View>
    );
  }
}
