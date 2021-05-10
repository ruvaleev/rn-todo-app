import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { chooseNewLocale } from './functions';

import EnLangIcon from '../../assets/icons/EnLangIcon.js'
import HomeIcon from '../../assets/icons/HomeIcon.js'
import RuLangIcon from '../../assets/icons/RuLangIcon.js'


import { StyleSheet, TouchableOpacity, View } from 'react-native';

function LanguagePanel() {
  const [locale, setLocale] = useState(chooseNewLocale());

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {i18n.changeLanguage(locale); setLocale(chooseNewLocale())}}
      testID='ChangeLanguage'
    >
      {
        i18n.language === 'en' ?
          <EnLangIcon width={32} height={32}/> :
          <RuLangIcon width={32} height={32}/>
      }
    </TouchableOpacity>
  );
}

function HomeLink({ navigation }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')} testID='HomeLink' >
      <HomeIcon width={32} height={32}/>
    </TouchableOpacity>
    
  );
}

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8
  },
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

HomeLink.propTypes = {
  navigation: PropTypes.object.isRequired,
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
