var React = require('react')
var ReactNative = require('react-native');
import moment from 'moment';
import 'moment/locale/vi';
var TimerMixin = require('react-timer-mixin');
import { connect } from 'react-redux';
var { PropTypes } = React;
var { Text } = ReactNative;

var TimeAgo = React.createClass({
  mixins: [TimerMixin],
  propTypes: {
    time: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.array,
      React.PropTypes.instanceOf(Date)
    ]).isRequired,
    interval: PropTypes.number,
    hideAgo: PropTypes.bool
  },

  getDefaultProps() {
    return {
      hideAgo: false,
      interval: 60000
    }
  },

  componentDidMount() {
    var {interval} = this.props;
    this.setInterval(this.update, interval);
  },

  componentWillUnmount() {
    this.clearInterval(this.update);
  },

  // We're using this method because of a weird bug
  // where autobinding doesn't seem to work w/ straight this.forceUpdate
  update() {
    this.forceUpdate();
  },

  render() {
    const { time, locale } = this.props;
    moment.locale('en');
    const objectTime = moment(time);
    const value = objectTime.format('X');
    return (
      <Text {...this.props}>{moment(value, 'X').locale(locale.split('_')[0]).fromNow(this.props.hideAgo)}</Text>
    );
  }
});

export default connect((state) => {
  return {
    locale: state.auth.locale,
  };
})(TimeAgo);
