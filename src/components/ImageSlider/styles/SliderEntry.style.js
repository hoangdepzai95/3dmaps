import { StyleSheet } from 'react-native';

export default (viewportWidth, viewportHeight) => {
  function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }
  const slideHeight = viewportHeight;
  const slideWidth = wp(75);
  const itemHorizontalMargin = wp(2);

  const sliderWidth = viewportWidth;
  const itemWidth = slideWidth + (itemHorizontalMargin * 2);

  const entryBorderRadius = 2;

  return {
    slideHeight,
    sliderWidth,
    itemWidth,
    styles: {
      slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18, // needed for shadow
      },
      image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: entryBorderRadius,
      },
    },
  };
};
