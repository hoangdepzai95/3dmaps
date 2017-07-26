import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Post from '../home/post';

export default class Posts extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.posts.length !== nextProps.posts.length;
  }
  render() {
    const { posts } = this.props;
    return (
      <ScrollView
        horizontal
      >
        {
         posts.map((post) => {
           return (
             <Post {...post} key={post.id} even />
           );
         })
        }
      </ScrollView>
    );
  }
}
