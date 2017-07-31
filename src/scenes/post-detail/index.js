import React, { Component } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import WebView from 'react-native-webview-autoheight';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from './style';
import TabView from '../../lib/react-native-scrollable-tab-view';
import Slider from './Slider';
import { setActiveTab } from '../../actions/layout';
import StarRatingBar from '../../lib/react-native-star-rating-view/StarRatingBar';
import startstyles from '../../styles/starRating';
import homeStyles from '../../styles/home';
import Map from './Map';
import Comment from './Comment';

const { width } = Dimensions.get('window');

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.scaleY = new Animated.Value(0.2);
  }
  shouldComponentUpdate(nextProps) {
    const { type, stackHome, stackExperience } = this.props;
    return (type === 'home' && stackHome.join('') !== nextProps.stackHome.join('')) ||
           (type === 'experience' && stackExperience.join('') !== nextProps.stackExperience.join(''));
  }
  componentWillUpdate(nextProps) {
    const { stackHome, stackExperience } = this.props;
    if (
      (_.last(stackHome) !== 'postDetail' && _.last(nextProps.stackHome) === 'postDetail') ||
      (_.last(stackExperience) !== 'postDetail' && _.last(nextProps.stackExperience) === 'postDetail')
    ) {
      this.playAnimation();
    }
  }
  playAnimation() {
    Animated.timing(this.scaleY, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  openComments() {
    this.props.dispatch(setActiveTab('_comment', 'Post'));
  }
  onChangeTab = (e) => {
    if (e.i === 2) this.openComments();
  }
  render() {
    const { type, post, stackHome, stackExperience } = this.props;
    if ((type === 'home' && _.last(stackHome) !== 'postDetail') || !post) return null;
    if ((type === 'experience' && _.last(stackExperience) !== 'postDetail') || !post) return null;
    return (
      <Animated.ScrollView style={[styles.container, { transform: [{ scale: this.scaleY }] }]}>
        <View style={styles.webView}>
          <TabView
            tabBarPosition="bottom"
            locked
            onChangeTab={this.onChangeTab}
          >
            <Slider
              tabLabel="IMAGES"
              images={post.images.map(o => o.url)}
              width={width}
            />
            {
              post.formatedUrl ?
                <WebView
                  source={{ uri: post.formatedUrl }}
                  style={{ flex: 1 }}
                  tabLabel="3D MAP"
                />
                : null
            }
            <Text tabLabel='COMMENTS'>project</Text>
          </TabView>
        </View>
        <View style={styles.footer}>
          <View style={styles.rating}>
            <View style={styles.headerLine1}>
              <Text style={styles.titleText}>{post.title}</Text>
              <StarRatingBar
                score={post.rating}
                allowsHalfStars={false}
                accurateHalfStars={false}
                readOnly
                style={styles.starRating}
                starStyle={startstyles.star}
                spacing={startstyles.space}
              />
            </View>
            <View style={styles.headerLine2}>
              <View style={styles.colLine2}>
                <Text style={[homeStyles.statusText, styles.smallText, styles.statusText]}>TRENDING NOW</Text>
                <Text style={[homeStyles.timeText, styles.smallText]}>  5 minutes ago</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerLine3}>
            <Text style={[styles.likeText, styles.smallText]}>5 likes </Text>
            <Text style={styles.smallText}>10 reviews</Text>
          </View>
          <WebView
            source={{ html: post.content }}
            width={width - 50}
          />
        </View>
        <Map post={post} />
        <Comment postType={type === 'home' ? 'Post' : 'Experience'} id={post.id} />
      </Animated.ScrollView>
    );
  }
}

export default connect((state, ownProps) => {
  return {
    post: state.layout.activePost[ownProps.type],
    stackHome: state.layout.stackHome,
    stackExperience: state.layout.stackExperience,
  };
})(PostDetail);
