import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import submit from './submit.svg';

function TodoForm({ onSubmit }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('')

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={t('create todo placeholder')}
        testID='AddTodo'
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={() => {
          onSubmit(title)
          setTitle('')
        }}
        value={title}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        onSubmit(title)
        setTitle('')
      }}>
        <Image source={submit} style={styles.icon}/>
      </TouchableOpacity>
    </View>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoForm;

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    zIndex: 10
  },
  input: {
    height: 24,
    paddingHorizontal: 32,
    width: '100%',
    fontStyle: 'italic'
  },
  button: {
    height: 24,
    width: 24,
    marginLeft: -24
  },
  icon: {
    minWidth: '100%',
    height: '100%'
  },
});
