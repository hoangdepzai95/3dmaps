import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TimeAgo from '../../../lib/react-native-timeago';
import styles from './style';
import { setActiveTab } from '../../../actions/layout';

class Comment extends Component {
  onPressComment = () => {
    if (this.props.disable) return;
    this.props.dispatch(setActiveTab('_comment', 'Post'));
  }
  render() {
    const { comment, style, disable } = this.props;
    if (!comment) return null;
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={this.onPressComment}
        activeOpacity={disable ? 1 : 0.3}
      >
         <View>
          <View style={[styles.header, disable ? { borderBottomWidth: 0 } : null]}>
            <View style={styles.userInfo}>
              <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
              <Text>{comment.user.fullname}</Text>
            </View>
            <TimeAgo
              time={comment.created_at}
              style={styles.time}
            />
          </View>
         </View>
         <View style={styles.comment}>
           <Text>{comment.content}</Text>
         </View>
      </TouchableOpacity>
    );
  }
}

export default connect()(Comment);
