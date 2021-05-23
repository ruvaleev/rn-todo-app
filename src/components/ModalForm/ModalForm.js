import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Form from './Form';

function ModalForm({ areaId, createArea, createTodo, dropdownIsRolled, formIsShown, toggleFormIsShown }) {
  return (
    formIsShown
      ? 
        <View style={styles.container}>
          <TouchableOpacity style={styles.background} onPress={toggleFormIsShown}/>
          <Form areaId={areaId} createArea={createArea} createTodo={createTodo} dropdownIsRolled={dropdownIsRolled} toggleFormIsShown={toggleFormIsShown}/>
        </View>
      : null
  )
}

export default ModalForm;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8080805e'
  }
})

ModalForm.propTypes = {
  areaId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  createArea: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  dropdownIsRolled: PropTypes.bool.isRequired,
  formIsShown: PropTypes.bool.isRequired,
  toggleFormIsShown: PropTypes.func.isRequired
};
