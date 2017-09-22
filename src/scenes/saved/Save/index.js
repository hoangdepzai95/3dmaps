import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import Toast from 'react-native-root-toast';
import Loading from '../../../components/Loading';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import I18n from 'i18n-js';
import axios from 'axios';
import styles from './style';

import { getSaved } from '../../../actions/fetchData';
import { backTab, pushSubTab } from '../../../actions/layout';
import AddNew from '../addNew';

const { height } = Dimensions.get('window');

class Save extends Component {
  componentDidMount() {
    const { savedData, userInfo } = this.props;
    if (!savedData.loaded) {
      this.props.dispatch(getSaved(userInfo.id));
    }
  }
  openAddNew = () => {
    this.props.dispatch(pushSubTab('stackSave', 'addNew'));
  }
  saveTo(category) {
    const { activeSave } = this.props;
    axios.post('favorites_items', {
      favorite_id: category.id,
      item_id: activeSave.id,
      item_type: activeSave.post_id ? 'Post' : 'Experience',
    }).then(
      (res) => {
        this.showToast(I18n.t('SAVED'));
        this.props.dispatch(backTab());
        console.log(res)
      },
      () => {
        this.showToast(I18n.t('NETWORK_ERROR_MESSAGE'));
      },
    );
  }
  showToast = (message) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }
  render() {
    const { loading, stackSave, savedData } = this.props;
    const iconSize = height / 25;
    return (
      <View style={styles.container}>
        {
          loading ?
            <Loading />
            :
            <View>
              <View style={styles.header}>
                <Text>{I18n.t('SAVE_TO')}</Text>
                <TouchableOpacity onPress={this.openAddNew}>
                  <Ionicons name="ios-add-circle-outline" size={iconSize} color="#8f90fe" />
                </TouchableOpacity>
              </View>
              <View style={styles.categories}>
                <ScrollView>
                  {
                    savedData.data.map((category) => {
                      return (
                        <TouchableOpacity key={category.id} style={styles.item} onPress={this.saveTo.bind(this, category)}>
                          <Text>{category.name}</Text>
                        </TouchableOpacity>
                      );
                    })
                  }
                </ScrollView>
              </View>
            </View>
        }
        {
          _.last(stackSave) === 'addNew' ?
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
    userInfo: state.auth.userInfo,
    savedData: state.data.saved,
    stackSave: state.layout.stackSave,
    activeSave: state.layout.activeSave,
  };
})(Save);
