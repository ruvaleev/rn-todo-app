import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import i18n from 'i18next';

import { chooseNewLocale } from './functions';
import EnLangIcon from '../../assets/icons/EnLangIcon.js'
import RuLangIcon from '../../assets/icons/RuLangIcon.js'

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
          <EnLangIcon width={44} height={44}/> :
          <RuLangIcon width={44} height={44}/>
      }
    </TouchableOpacity>
  );
}

export default LanguagePanel;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  }
});
