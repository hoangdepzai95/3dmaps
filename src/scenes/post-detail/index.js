import React, { Component } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import I18n from 'i18n-js';
import TimeAgo from '../../lib/react-native-timeago';
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
import SuggestPlace from './SuggestPlace';
import SuggestExperience from './SuggestExperience';

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
  componentWillReceiveProps(nextProps) {
    if (
      (this.props.empty && !nextProps.empty) ||
      (this.props.post !== nextProps.post)
    ) {
      this.playAnimation();
    }
  }
  openComments() {
    const { type } = this.props;
    this.props.dispatch(setActiveTab('_comment', type === 'home' ? 'Post' : 'Experience'));
  }
  onChangeTab(haveMapTab, e) {
    if (e.i === (haveMapTab ? 2 : 1)) this.openComments();
  }
  webViewUpdated = () => {
    this.setState({ webViewUpdated: true });
  }
  onAnimateEnd = () => {
    this.setState({ animateEnd: true });
    if (this.scrollView) {
      this.scrollView._component.scrollTo({ y: 0 });
      this.forceUpdate();
  }
}
  playAnimation = () => {
    this.scaleY.setValue(0.2);
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
      <View style={styles.container}>
        <Animated.ScrollView
          style={{ transform: [{ scale: this.scaleY }] }}
          ref={(scroll) => { this.scrollView = scroll; }}
        >
            <View style={styles.tabs}>
              {
                post.formatedUrl ?
                <TabView
                  tabBarPosition="bottom"
                  locked
                  onChangeTab={this.onChangeTab.bind(this, true)}
                >
                  <Slider
                    tabLabel={I18n.t('IMAGES')}
                    images={post.images.map(o => o.url)}
                    width={width}
                  />
                  <WebView
                    source={{ uri: post.formatedUrl }}
                    style={{ flex: 1 }}
                    tabLabel={I18n.t('3D_MAPS')}
                  />
                  <Text tabLabel={I18n.t('COMMENTS')} />
                </TabView>
                :
                <TabView
                  tabBarPosition="bottom"
                  locked
                  onChangeTab={this.onChangeTab.bind(this, false)}
                >
                  <Slider
                    tabLabel={I18n.t('IMAGES')}
                    images={post.images.map(o => o.url)}
                    width={width}
                  />
                  <Text tabLabel={I18n.t('COMMENTS')} />
                </TabView>
              }
          </View>
          <View style={[loaded ? null : { height: 1, opacity: 0 }, styles.footerContaier]}>
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
                    {
                      post.trending ?
                        <Text style={[homeStyles.statusText, styles.smallText, styles.statusText]}>{I18n.t('TRENDING_NOW')}</Text>
                        : null
                    }
                    <TimeAgo
                      time={post.created_at}
                      style={[homeStyles.timeText, styles.smallText]}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.headerLine3}>
                <Text style={[styles.likeText, styles.smallText]}>{post.like_num} {I18n.t('likes')} </Text>
                <Text style={styles.smallText}>{post.reviews} {I18n.t('reviews')}</Text>
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
            <View style={styles.suggests}>
              <Text style={styles.placeText}>{I18n.t('Suggested_Places')}</Text>
              <SuggestPlace />
              <Text style={styles.placeText}>{I18n.t('Suggested_Experience')}</Text>
              <SuggestExperience />
            </View>
          </View>
          {
            loaded ?
             null
             :
             <Loading style={{ marginTop: 50 }} />
          }
        </Animated.ScrollView>
      </View>
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
