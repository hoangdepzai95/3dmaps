import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import { getComments } from '../../../actions/fetchData';
import Loading from '../../../components/Loading';

class Comment extends Component {
  componentDidMount() {
    const { postType, id, currentPage } = this.props;
    this.props.dispatch(getComments(id, postType, currentPage + 1));
  }
  render() {
    const { loading, comment } = this.props;
    if (!loading && !comment) return null;
    return (
      <TouchableOpacity style={styles.container}>
        {
         loading ?
           <Loading />
           :
           <View style={styles.content}>
             <View>
              <View style={styles.header}>
                <View style={styles.userInfo}>
                  <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
                  <Text>{comment.user.fullname}</Text>
                </View>
                <Text style={styles.time}> 2min ago</Text>
              </View>
             </View>
             <View style={styles.comment}>
              <Text>{comment.content}</Text>
             </View>
           </View>
       }
      </TouchableOpacity>
    );
  }
}

export default connect((state) => {
  return {
    comment: state.data.comments.data[0],
    currentPage: state.data.comments.currentPage,
    loading: state.data.comments.hasMore && !state.data.comments.data[0],
  };
})(Comment);
