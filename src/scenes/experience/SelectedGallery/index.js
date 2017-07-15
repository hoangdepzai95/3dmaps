import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text , Animated} from 'react-native';
import shortid from 'shortid';
import Post from './post';
import Filter from '../../../components/Filter';
import homeStyles from '../../../styles/home';
import styles from './style';

export default class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: {
        name: 'Cities',
        posts: [
          {
            favorite: true,
            rate: 1,
          },
          {
            favorite: false,
            rate: 2,
          },
          {
            favorite: true,
            rate: 4,
          },
          {
            favorite: true,
            rate: 2,
          },
          {
            favorite: true,
            rate: 5,
          },
        ],
      },
      suggestionPosts: [
        {
          favorite: false,
          rate: 3,
        },
        {
          favorite: true,
          rate: 2,
        },
      ],
    };
  }
  render() {
    const { gallery, suggestionPosts } = this.state;
    const { onClickFilter, scrollY } = this.props;
    return (
      <View style={homeStyles.container}>
              <View key={gallery.name} style={homeStyles.gallery}>
              <TouchableOpacity activeOpacity={0.6}>
                <View style={homeStyles.card}>
                  <Text>{gallery.name}</Text>
                  <Text style={homeStyles.seeAllText}>See all</Text>
                </View>
              </TouchableOpacity>
                {
                  gallery.posts.map((post, index) => {
                    if ((index % 2) === 0) {
                      return (
                        <View style={homeStyles.postRow} key={shortid.generate()}>
                          <Post {...gallery.posts[index]} />
                          <View style={homeStyles.divider}></View>
                          {
                            gallery.posts[index + 1] ?
                            <Post {...gallery.posts[index + 1]} />
                              :
                            <View style={styles.emptyPost}></View>
                          }
                        </View>
                      );
                    }
                  })
                }
              </View>
              <View style={homeStyles.gallery}>
              <TouchableOpacity activeOpacity={0.6} >
                <View style={[homeStyles.card, styles.suggestions]}>
                  <Text>SUUGESTED POST</Text>
                  <Text style={homeStyles.seeAllText}>See all</Text>
                </View>
              </TouchableOpacity>
              <View style={homeStyles.postRow}>
                <Post {...suggestionPosts[0]} />
                <View style={homeStyles.divider} />
                <Post {...suggestionPosts[1]} />
              </View>
              </View>
        <View style={homeStyles.filterStyle} elevation={5}>
          <Filter
            onPressFilter={onClickFilter}
          />
        </View>
      </View>
    );
  }
}
