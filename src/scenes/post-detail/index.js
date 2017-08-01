import React, { Component } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from './style';
import WebView from '../../lib/react-native-webview-autoheight';
import TabView from '../../lib/react-native-scrollable-tab-view';
import Slider from './Slider';
import Loading from '../../components/Loading';
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
    this.state = {
      animateEnd: false,
      webViewUpdated: false,
    };
    this.scaleY = new Animated.Value(0.2);
  }
  componentWillMount() {
    this.playAnimation();
  }
  openComments() {
    this.props.dispatch(setActiveTab('_comment', 'Post'));
  }
  onChangeTab = (e) => {
    if (e.i === 2) this.openComments();
  }
  webViewUpdated = () => {
    this.setState({ webViewUpdated: true });
  }
  onAnimateEnd = () => {
    this.setState({ animateEnd: true });
  }
  playAnimation() {
    Animated.timing(this.scaleY, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(this.onAnimateEnd);
  }
  render() {
    const { post, empty } = this.props;
    const { animateEnd, webViewUpdated } = this.state;
    if (empty) return null;
    const loaded = animateEnd && webViewUpdated;
    return (
      <Animated.ScrollView style={[styles.container, { transform: [{ scale: this.scaleY }] }]}>
        <View style={styles.tabs}>
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
        <View style={[loaded ? null : { height: 1, opacity: 0 }]}>
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
              updated={this.webViewUpdated}
            />
          </View>
          <Map post={post} />
          <Comment
            comment={post.comments[0]}
          />
        </View>
        {
          loaded ?
           null
           :
           <Loading style={{ marginTop: 50 }} />
        }
      </Animated.ScrollView>
    );
  }
}

export default connect((state, ownProps) => {
  const post = state.layout.activePost[ownProps.type];
  const empty = (ownProps.type === 'home' && _.last(state.layout.stackHome) !== 'postDetail') ||
                (ownProps.type === 'experience' && _.last(state.layout.stackExperience) !== 'postDetail') ||
                !post;
  return {
    post,
    empty,
  };
})(PostDetail);
