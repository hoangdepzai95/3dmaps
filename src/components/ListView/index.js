import React, { Component } from 'react';
import { ListView } from 'react-native';

export default class HorizontalListView extends Component {
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
        onEndReachedThreshold={100}
        bounces={false}
        bouncesZoom={false}
      />
    );
  }
}
