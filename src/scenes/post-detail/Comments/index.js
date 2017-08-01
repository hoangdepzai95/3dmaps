import React, { Component } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { postComment, getComments } from '../../../actions/fetchData';
import VerticalListView from '../../../components/ListView';
import Comment from '../Comment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  componentDidMount() {
    const { post, type } = this.props;
    this.props.dispatch(getComments(post.id, type, 1));
  }
  onChange = (text) => {
    this.setState({ text });
  }
  onEndReached = () => {
    const { post, type, currentPage, loading, hasMore } = this.props;
    if (!loading && hasMore) {
      this.props.dispatch(getComments(post.id, type, currentPage + 1));
    }
  }
  postComment = () => {
    const { post, type, userInfo } = this.props;
    this.props.dispatch(postComment(userInfo.id, type, post.id, this.state.text));
  }
  renderComment = (comment) => {
    return (
      <Comment comment={comment} style={styles.comment} disable />
    );
  }
  render() {
    const { text } = this.state;
    const { loading, comments, userInfo } = this.props;
    return (
      <View style={styles.container}>
        {
          userInfo ?
            <View style={styles.postComment}>
              <TextInput
                style={styles.input}
                onChangeText={this.onChange}
                value={text}
                underlineColorAndroid="transparent"
                multiline
              />
              <TouchableOpacity
                onPress={this.postComment}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Comment</Text>
              </TouchableOpacity>
            </View>
            : null
        }
        <View style={styles.comments}>
          <VerticalListView
            loading={loading}
            hasMore
            onEndReachedThreshold={200}
            onEndReached={this.onEndReached}
            data={comments}
            renderRow={this.renderComment}
          />
        </View>
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
    currentPage: state.data.comments.currentPage,
    loading: state.data.comments.loading,
    comments: state.data.comments.data,
    hasMore: state.data.comments.hasMore,
  };
})(Comments);
