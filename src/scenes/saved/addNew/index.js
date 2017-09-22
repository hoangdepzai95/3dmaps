import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import { MaterialIcons } from '@expo/vector-icons';
import I18n from 'i18n-js';
import axios from 'axios';
import styles from './style';

import { getSaved } from '../../../actions/fetchData';
import { popSubTab } from '../../../actions/layout';

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isPublic: 0,
    };
  }
  onChange = (value) => {
    this.setState({
      name: value,
    });
  }
  onChangeRadio = (value) => {
    this.setState({ isPublic: value });
  }
  createBoard = () => {
    const { userInfo } = this.props;
    const { name, isPublic } = this.state;
    axios.post('favorites', {
      user_id: userInfo.id,
      name,
      is_public: isPublic,
    }).then(
      () => {
        this.props.dispatch(getSaved(userInfo.id));
        this.props.dispatch(popSubTab('stackAccount'));
        this.props.dispatch(popSubTab('stackSave'));
      },
      (res) => {

      }
    )
  }
  render() {
    const radioProps = [
      { label: I18n.t('Private'), value: 0 },
      { label: I18n.t('Public'), value: 1 },
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{I18n.t('NEW_BOARD')}</Text>
        <Text style={styles.smallText}>{I18n.t('Title')}</Text>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          onChangeText={this.onChange}
        />
        <Text style={styles.settingText}>{I18n.t('Setting')}</Text>
        <RadioForm
          radio_props={radioProps}
          initial={0}
          buttonColor="#333"
          buttonSize={5}
          style={styles.radio}
          buttonOuterSize={15}
          onPress={this.onChangeRadio}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.createBoard}>
            <MaterialIcons name="add-circle" size={35} color="#8f90fe" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect((state) => {
  return {
    userInfo: state.auth.userInfo,
  };
})(AddNew);
