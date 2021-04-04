import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { chooseNewLocale } from './functions';
import home from '../../assets/icons/home.svg';
import en from '../../assets/icons/en-lang.svg';
import ru from '../../assets/icons/ru-lang.svg';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

function LanguagePanel() {
  const [locale, setLocale] = useState(chooseNewLocale());

  const localeIcon = i18n.language === 'en' ? en : ru;

  return (
    <TouchableOpacity style={styles.button} onPress={() => {i18n.changeLanguage(locale); setLocale(chooseNewLocale())}} >
      <Image source={localeIcon} style={styles.icon}/>
    </TouchableOpacity>
  );
}

function HomeLink({ navigation }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')} >
      <Image source={home} style={styles.icon}/>
    </TouchableOpacity>
    
  );
}

function ControlPanel({ navigation }) {
  return (
    <View style={styles.controlPanel}>
      <LanguagePanel />
      <HomeLink navigation={navigation} />
    </View>
  );
}

const LayoutWithControlPanel = ({ children, navigation }) => (
  <>
    {children}
    <ControlPanel navigation={navigation} />
  </>
);

export default LayoutWithControlPanel;

ControlPanel.propTypes = {
  navigation: PropTypes.object.isRequired,
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
};

LayoutWithControlPanel.defaultProps = {
  children: null,
};


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '0.5rem'
  },
  controlPanel: {
    display: 'flex',
    flexDirection: 'row',
    bottom: '10vh',
    justifyContent: 'flex-end',
    zIndex: 11,
    marginTop: '2rem',

  },
  icon: {
    width: '2rem',
    height: '2rem',
  }
});
