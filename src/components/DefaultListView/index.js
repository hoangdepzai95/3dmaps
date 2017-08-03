import React, { Component } from 'react';
import { ListView } from 'react-native';


export default class HorizontalListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = this.ds.cloneWithRows(this.props.data);
  }
  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data.length;
  }
  componentWillUpdate(nextProps) {
    if (this.props.data.length !== nextProps.data.length) {
      this.dataSource = this.ds.cloneWithRows(nextProps.data);
    }
  }
  render() {
    const { renderRow } = this.props;
    return (
      <ListView
      dataSource={this.dataSource}
        {...this.props}
      />
    );
  }
}
