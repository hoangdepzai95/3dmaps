import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Post from './post';
import homeStyles from '../../../styles/home';
import styles from './style';

export default class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: {
      },
      suggestionPosts: [
      ],
    };
  }
  render() {
    const { gallery, suggestionPosts } = this.state;
    const { onScroll } = this.props;
    return (
      <View style={homeStyles.container}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          alwaysBounceVertical={false}
          bounces={false}
          bouncesZoom={false}
        >
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
                    <View style={homeStyles.postRow} key={post.id}>
                      <Post {...gallery.posts[index]} />
                      <View style={homeStyles.divider} />
                      {
                        gallery.posts[index + 1] ?
                          <Post {...gallery.posts[index + 1]} />
                            :
                          <View style={styles.emptyPost} />
                      }
                    </View>
                  );
                }
                return null;
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
        </ScrollView>
      </View>
    );
  }
}
