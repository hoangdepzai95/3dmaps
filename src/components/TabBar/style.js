import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tabsContainer: {
    flex: 27,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 311,
    position: 'relative',
  },
  leftArea: {
    flex: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightArea: {
    flex: 49,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainArea: {
    flex: 117,
    flexDirection: 'row',
    position: 'relative',
  },
  tabUnderlineStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#7076eb',
    height: 3,
    width: 50,
  },
  profile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
