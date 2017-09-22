import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import I18n from 'i18n-js';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getSaved } from '../../actions/fetchData';
import Loading from '../../components/Loading';
import homeStyles from '../../styles/home';
import styles from './style';
import Galleries from './Galleries';
import Gallery from './gallery';
import PostDetail from '../post-detail';
import AddNew from './addNew';
import { pushSubTab } from '../../actions/layout';

const { height } = Dimensions.get('window');

class HomeTab extends Component {
  componentDidMount() {
    const { savedData, userInfo } = this.props;
    if (!savedData.loaded) {
      this.props.dispatch(getSaved(userInfo.id));
    }
  }
  openAddNew = () => {
    this.props.dispatch(pushSubTab('stackAccount', 'addNew'));
  }
  render() {
    const { onScroll, loading, showPostDetail, stackAccount } = this.props;
    if (!stackAccount.find(o => o === 'saved')) return null;
    const iconSize = height / 25;
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
                <TouchableOpacity style={styles.headerLeft}>
                  <Text style={styles.headerText}>{I18n.t('INVITE_FRIEND')}  </Text>
                  <Ionicons name="md-person-add" size={iconSize * 0.9} color="#8f90fe" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerRight} onPress={this.openAddNew}>
                  <Text style={styles.headerText}>{I18n.t('CREATE_NEW')}  </Text>
                  <Ionicons name="ios-add-circle-outline" size={iconSize} color="#8f90fe" />
                </TouchableOpacity>
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
        {
          _.last(stackAccount) === 'addNew' ?
            <AddNew />
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
