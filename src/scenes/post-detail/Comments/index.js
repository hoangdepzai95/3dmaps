import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { postComment } from '../../../actions/fetchData';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  onChange = (text) => {
    this.setState({ text });
  }
  postComment = () => {
    const { post, type, userInfo } = this.props;
    this.props.dispatch(postComment(userInfo.id, type, post.id, this.state.text));
  }
  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.onChange}
          value={text}
        />
        <Button
          onPress={this.postComment}
          title="Comment"
          color="#841584"
        />
      </View>
    );
  }
}

export default connect((state) => {
  const type = state.layout.commentType;
  return {
    type,
    post: state.layout.activePost[type === 'Post' ? 'home' : 'experience'],
    userInfo: state.auth.userInfo,
  };
})(Comments);
