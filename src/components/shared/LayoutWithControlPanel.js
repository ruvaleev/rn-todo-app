import React from 'react';
import PropTypes from 'prop-types';

import HomeLink from './HomeLink.js'
import LanguagePanel from './LanguagePanel.js'


import { StyleSheet, View } from 'react-native';

function ControlPanel({ navigation, providedStyle }) {
  return (
    <View style={providedStyle}>
      <LanguagePanel />
      <HomeLink navigation={navigation} />
    </View>
  );
}

const LayoutWithControlPanel = ({ children, navigation, providedStyle }) => (
  <>
    {children}
    <ControlPanel navigation={navigation} providedStyle={providedStyle}/>
  </>
);

export default LayoutWithControlPanel;

const styles = StyleSheet.create({
  controlPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 11,
    marginTop: 32,
    bottom: 32,
    width: 100,
    height: 100
  }
});

ControlPanel.propTypes = {
  navigation: PropTypes.object.isRequired,
  providedStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

LayoutWithControlPanel.propTypes = {
  children: PropTypes.oneOfType(
    [
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object),
    ],
  ),
  navigation: PropTypes.object.isRequired,
  providedStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

LayoutWithControlPanel.defaultProps = {
  children: null,
  providedStyle: styles.controlPanel
};
