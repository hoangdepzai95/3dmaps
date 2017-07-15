import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Post from '../home/post';
import MapAndFilter from '../../components/MapAndFilter';
import homeStyles from '../../styles/home';
import SelectedGallery from './SelectedGallery';

export default class Experience extends Component {
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
          name: 'Art',
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
          name: 'Game',
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
      ],
      selectedGallery: '',
    };
  }
  onSelectGallery(name) {
    this.setState({ selectedGallery: name });
  }
  render() {
    const { gallerys, selectedGallery } = this.state;
    if (selectedGallery) return <SelectedGallery />;
    return (
      <View style={homeStyles.container}>
        <ScrollView>
          {
            gallerys.map((gallery) => {
              return (
                <View key={gallery.name} style={homeStyles.gallery}>
                <TouchableOpacity activeOpacity={0.6} onPress={this.onSelectGallery.bind(this, gallery.name)}>
                  <View style={homeStyles.card}>
                    <Text>{gallery.name}</Text>
                    <Text style={homeStyles.seeAllText}>See all</Text>
                  </View>
                </TouchableOpacity>
                <View style={homeStyles.postRow}>
                  <Post {...gallery.posts[0]} />
                  <View style={homeStyles.divider} />
                  <Post {...gallery.posts[1]} />
                </View>
                </View>
              );
            })
          }
        </ScrollView>
        <View style={homeStyles.mapAndFilter} elevation={5}>
          <MapAndFilter
            onPressMap={this.onPressMap}
            onPressFilter={this.onPressFilter}
          />
        </View>
      </View>
    );
  }
}
