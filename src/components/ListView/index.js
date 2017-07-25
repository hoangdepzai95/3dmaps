import React, { Component } from 'react';
import { ListView } from 'react-native';
import Loading from '../Loading';

export default class HorizontalListView extends Component {
  renderFooter = () => {
    const { loading } = this.props;
    return (
      <Loading
        style={{ paddingHorizontal: 50, opacity: loading ? 1 : 0 }}
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
        onEndReachedThreshold={300}
        bounces={false}
        bouncesZoom={false}
        renderFooter={this.renderFooter}
      />
    );
  }
}
