import React, { Component } from 'react';
import { ListView, Dimensions } from 'react-native';
import Loading from '../Loading';

const { height } = Dimensions.get('window');

export default class HorizontalListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    this.dataSource = this.ds.cloneWithRows(this.props.data);
  }
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
  shouldComponentUpdate(nextProps) {
    return this.props.data.length !== nextProps.data.length ||
           this.props.hasMore !== nextProps.hasMore ||
           this.props.loading !== nextProps.loading;
  }
  componentWillUpdate(nextProps) {
    if (this.props.data.length !== nextProps.data.length) {
      this.dataSource = this.ds.cloneWithRows(nextProps.data);
    }
  }
  onEndReached = () => {
    const { id, onEndReached } = this.props;
    onEndReached(id);
  }
  render() {
    const { renderRow, horizontal, onEndReachedThreshold } = this.props;
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={renderRow}
        scrollEventThrottle={32}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        horizontal={horizontal}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={onEndReachedThreshold || horizontal ? 200 : 400}
        bounces={false}
        bouncesZoom={false}
        renderFooter={this.renderFooter}
        initialListSize={1}
      />
    );
  }
}
