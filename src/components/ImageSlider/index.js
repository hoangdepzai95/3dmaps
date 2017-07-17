import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel from '../../lib/react-native-snap-carousel';
import SliderEntry from './components/SliderEntry';
import styles from './styles/index.style';
import getStyles from './styles/SliderEntry.style';

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerHeight: null,
      containerWidth: null,
      caculatedLayout: false,
    };
  }
  getSlides = () => {
    const { images } = this.props;
    const { containerHeight, containerWidth } = this.state;
    if (!images) {
      return null;
    }

    return images.map((image, index) => {
      return (
        <SliderEntry
          key={`carousel-entry-${index}`}
          even={(index + 1) % 2 === 0}
          image={image}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        />
      );
    });
  }
  getContent = () => {
    const { containerWidth, containerHeight } = this.state;
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
      >
        {this.getSlides()}
      </Carousel>
    );
  }
  handleOnLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    if (!this.state.caculatedLayout) {
      this.setState({ containerWidth: width, containerHeight: height, caculatedLayout: true });
    }
  }
  render() {
    return (
      <View
        style={styles.container}
        onLayout={this.handleOnLayout}
      >
        {
          this.state.caculatedLayout ?
            this.getContent()
            :
            null
        }
      </View>
    );
  }
}
