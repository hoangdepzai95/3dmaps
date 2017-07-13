import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Post from './post';

import styles from './style';

export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallerys: [
        {
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
          ],
        },
        {
          name: 'Restaurent',
          posts: [
            {
              favorite: false,
              rate: 5,
            },
            {
              favorite: false,
              rate: 4,
            },
          ],
        },
        {
          name: 'Experience',
          posts: [
            {
              favorite: true,
              rate: 2,
            },
            {
              favorite: true,
              rate: 1,
            },
          ],
        },
        {
          name: 'Cute',
          posts: [
            {
              favorite: false,
              rate: 3,
            },
            {
              favorite: true,
              rate: 2,
            },
          ],
        },
      ]
    };
  }
  renderGallery() {
    return (
      <View>
      </View>
    );
  }
  render() {
    const { gallerys } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {
            gallerys.map((gallery) => {
              return (
                <View key={gallery.name} style={styles.gallery}>
                <TouchableOpacity activeOpacity={0.6}>
                  <View style={styles.card}>
                    <Text>{gallery.name}</Text>
                    <Text style={styles.seeAllText}>See all</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.postRow}>
                  <Post {...gallery.posts[0]} />
                  <View style={styles.divider} />
                  <Post {...gallery.posts[1]} />
                </View>
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}
