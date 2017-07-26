import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Post from './post';
import Loading from '../../components/Loading';
import { getPost } from '../../actions/fetchData';

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
