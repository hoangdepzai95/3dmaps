import React, { Component } from 'react';
import { Image } from 'react-native';

import ViewPager from '../../../lib/react-native-viewpager';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
  }
  renderPage = (data) => {
    const { width } = this.props;
    return (
      <Image
        source={{ uri: data }}
        style={{ width }}
      />
    );
  }
  render() {
    this.data = this.dataSource.cloneWithPages(this.props.images);
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.data}
        renderPage={this.renderPage}
      />
    );
  }
}
