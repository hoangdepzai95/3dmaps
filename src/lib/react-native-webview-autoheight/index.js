/**
 * Custom WebView with autoHeight feature
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop ...props
 *
 * @author Elton Jain
 * @version v1.0.2
 */

import React, { Component } from 'react';
import {
  View,
  Dimensions,
  WebView,
  InteractionManager,
} from 'react-native';

const injectedScript = function() {
  function setSize() {
    let width = 0;
    if(document.documentElement.clientWidth>document.body.clientWidth)
    {
      width = document.documentElement.clientWidth
    }
    else
    {
      width = document.body.clientWidth
    }
  }
  function waitForBridge() {
    if (window.postMessage.length !== 1){
      setTimeout(waitForBridge, 0);
    }
    else {
      let width = 0;
      if(document.documentElement.clientWidth>document.body.clientWidth)
      {
        width = document.documentElement.clientWidth
      }
      else
      {
        width = document.body.clientWidth
      }
      const images = document.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        images[i].style.cssText = `width: ${200}px; height: ${200 * 0.65}px;`;
      }
      setTimeout(() => {
        let height = document.body.offsetHeight
        postMessage(height + 20);
      }, 500)
    }
  }
  waitForBridge();
};

export default class MyWebView extends Component {
  state = {
    webViewHeight: Number
  };

  static defaultProps = {
      autoHeight: true,
  }

  constructor (props: Object) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight
    }

    this._onMessage = this._onMessage.bind(this);
  }

  _onMessage = (e) => {
    const height = parseInt(e.nativeEvent.data);
    if (height > 0) {
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          webViewHeight: height
        }, () => {
          this.props.updated();
        });
      });
    }
  }

  render () {
    const _w = this.props.width || Dimensions.get('window').width;
    const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
    return (
      <WebView
        injectedJavaScript={'(' + String(injectedScript) + ')();'}
        scrollEnabled={this.props.scrollEnabled || false}
        onMessage={this._onMessage}
        javaScriptEnabled={true}
        automaticallyAdjustContentInsets={false}
        {...this.props}
        style={[this.props.style, {height: _h}]}
      />
    )
  }
}
