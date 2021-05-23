import React from 'react';
import PropTypes from 'prop-types';

import { castErrorMessage } from './functions';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Errors({ isError, error, callback }) {
  return (
    isError
      && (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={callback} >
          <Text>{castErrorMessage(error)}</Text>
        </TouchableOpacity>
      </View>
      )
  );
}

export default Errors;

Errors.propTypes = {
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

Errors.defaultProps = {
  error: null,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 20
  },
  button: {
    padding: 16,
    zIndex: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#ffffffc7',
  }
});
