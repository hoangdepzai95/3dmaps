import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Post from './post';

export default class Posts extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.posts.length !== nextProps.posts.length;
  }
  render() {
    const { posts, type } = this.props;
    return (
      <ScrollView
        horizontal
      >
        {
         posts.map((post) => {
           return (
             <Post {...post} key={post.id} even type={type || 'home'} />
           );
         })
        }
      </ScrollView>
    );
  }
}
