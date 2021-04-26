import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import remove from '../../assets/icons/remove.svg';

const RemoveIcon = ({ callback }) => (
  <TouchableOpacity onPress={callback} style={styles.button} testID='RemoveIcon'>
    <Image source={remove} style={styles.icon}/>
  </TouchableOpacity>
);

export default RemoveIcon;

RemoveIcon.propTypes = {
  callback: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 'auto'
  },
  icon: {
    minWidth: '1rem',
    width: '1rem',
    height: '1rem'
  }
});
