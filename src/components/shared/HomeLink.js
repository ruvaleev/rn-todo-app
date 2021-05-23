import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import HomeIcon from '../../assets/icons/HomeIcon.js'

function HomeLink({ navigation }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')} testID='HomeLink' >
      <HomeIcon width={44} height={44}/>
    </TouchableOpacity>
    
  );
}

export default HomeLink;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

HomeLink.propTypes = {
  navigation: PropTypes.object.isRequired,
};
