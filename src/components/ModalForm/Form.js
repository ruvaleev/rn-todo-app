import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

function Form({ areaId, createArea, createTodo, dropdownIsRolled, toggleFormIsShown }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('')

  const { placeholder, testId, onSubmit } =
    dropdownIsRolled
      ? { placeholder: t('create todo placeholder'), testId: 'AddTodo', onSubmit: (data) => { createTodo({ title: data, areaId }); } }
      : { placeholder: t('create area placeholder'), testId: 'AddArea', onSubmit: (data) => { createArea({ title: data }) } }

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        testID={testId}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={() => {
          onSubmit(title)
          setTitle('')
          toggleFormIsShown()
        }}
        value={title}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        onSubmit(title)
        setTitle('')
      }}>
      </TouchableOpacity>
    </View>
  );
}

Form.propTypes = {
  areaId: PropTypes.string.isRequired,
  createArea: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  dropdownIsRolled: PropTypes.bool.isRequired,
  toggleFormIsShown: PropTypes.func.isRequired
};

export default Form;

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 48,
    paddingHorizontal: 16,
    width: '90%',
    zIndex: 10
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 24,
    paddingHorizontal: 32,
    width: '100%',
    fontStyle: 'italic'
  },
  button: {
    height: 24,
    width: 24,
    marginLeft: -24
  }
});
