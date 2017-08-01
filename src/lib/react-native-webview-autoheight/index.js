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
} from 'react-native';

const injectedScript = function() {
  function waitForBridge() {
    if (window.postMessage.length !== 1){
      setTimeout(waitForBridge, 200);
    }
    else {
      const images = document.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        images[i].setAttribute("style", `width: ${window.innerWidth}px; height: ${window.innerWidth * 0.65}px;`);
      }
      let height = 0;
      if(document.documentElement.clientHeight>document.body.clientHeight)
      {
        height = document.documentElement.clientHeight
      }
      else
      {
        height = document.body.clientHeight
      }
      setTimeout(() => {
        postMessage(height)
      }, 0);
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
    this.setState({
      webViewHeight: parseInt(e.nativeEvent.data)
    }, () => {
      this.props.updated();
    });
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
        automaticallyAdjustContentInsets={true}
        {...this.props}
        style={[this.props.style, {height: _h}]}
      />
    )
  }
}
