import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';

function ImageButtonLink({ callback, children }) {
  return (
    <TouchableOpacity onPress={callback} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
}

export default ImageButtonLink;

ImageButtonLink.propTypes = {
  callback: PropTypes.func.isRequired,
  children: PropTypes.oneOfType(
    [
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
