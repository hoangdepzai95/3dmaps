import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { setActivePost, pushSubTab } from '../../actions/layout';

class PostWrapper extends Component {
  onPressPost = () => {
    const { post, type } = this.props;
    this.props.dispatch(setActivePost(post, type));
    if (type === 'home') {
      this.props.dispatch(pushSubTab('stackHome', 'postDetail'));
    } else if (type === 'experience') {
      this.props.dispatch(pushSubTab('stackExperience', 'postDetail'));
    } else if (type === 'saved') {
      this.props.dispatch(pushSubTab('stackAccount', 'postDetail'));
    } else if (type === 'maps') {
      this.props.dispatch(pushSubTab('stackMap', 'postDetail'));
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.onPressPost}
        style={this.props.style}
        activeOpacity={0.95}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default connect()(PostWrapper);
