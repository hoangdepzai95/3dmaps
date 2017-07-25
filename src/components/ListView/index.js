import React, { Component } from 'react';
import { ListView, Dimensions } from 'react-native';
import Loading from '../Loading';

const { height } = Dimensions.get('window');

export default class HorizontalListView extends Component {
  renderFooter = () => {
    const { loading, hasMore, horizontal } = this.props;
    if (!hasMore) return null;
    return (
      <Loading
        style={{
          paddingHorizontal: 50,
          opacity: loading ? 1 : 0,
          paddingBottom: horizontal ? 0 : height / 8,
        }}
      />
    );
  }
  render() {
    const { renderRow, data, horizontal, onEndReached } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(data);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={renderRow}
        scrollEventThrottle={16}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        horizontal={horizontal}
        onEndReached={onEndReached}
        onEndReachedThreshold={horizontal ? 200 : 400}
        bounces={false}
        bouncesZoom={false}
        renderFooter={this.renderFooter}
      />
    );
  }
}
