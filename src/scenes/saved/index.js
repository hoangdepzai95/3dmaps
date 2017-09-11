import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { getSaved } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import homeStyles from '../../styles/home';
import styles from './style';
import Galleries from './Galleries';
import Gallery from './gallery';
import PostDetail from '../post-detail';

class HomeTab extends Component {
  componentDidMount() {
    const { savedData, userInfo } = this.props;
    if (!savedData.loaded) {
      this.props.dispatch(getSaved(userInfo.id));
    }
  }
  render() {
    const { onScroll, loading, showPostDetail, stackAccount } = this.props;
    if (!stackAccount.find(o => o === 'saved')) return null;
    return (
      <View style={[homeStyles.container, styles.container]}>
        {
          loading ?
            <Loading />
            :
            <ScrollView
              onScroll={onScroll}
              scrollEventThrottle={16}
              alwaysBounceVertical={false}
              bounces={false}
              bouncesZoom={false}
            >
              <View style={styles.header}>
                <View>
                  <Text>Invite frineds</Text>
                </View>
                <View>
                  <Text>Invite frineds</Text>
                </View>
              </View>
              <Galleries />
              <View style={homeStyles.footerSpace} />
            </ScrollView>
        }
        <Gallery />
        {
          showPostDetail ?
            <PostDetail type="saved" />
            : null
        }
      </View>
    );
  }
}

export default connect((state) => {
  return {
    loading: !state.data.saved.loaded,
    showPostDetail: !!state.layout.stackAccount.find(o => o === 'postDetail'),
    stackAccount: state.layout.stackAccount,
    userInfo: state.auth.userInfo,
    savedData: state.data.saved,
  };
})(HomeTab);
