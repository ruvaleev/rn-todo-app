import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function AuthenticationForm({ onSubmit }) {
  const { t } = useTranslation();

  let state = { email: '', password: '' }

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        keyboardType='email-address'
        onChangeText={(text) => state.email = text}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        secureTextEntry={true}
        onChangeText={(text) => state.password = text}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        onSubmit({
          email: state.email,
          password: state.password,
        });
      }} >
        <Text>{t('submit')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AuthenticationForm;

AuthenticationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
    marginBottom: '10vh'
  },
  input: {
    height: '1.5rem',
    paddingLeft: '2rem',
    marginTop: '0.75rem',
    width: '100%',
    fontStyle: 'italic',
    borderColor: 'black',
    borderWidth: 1
  },
  button: {
    justifyContent: 'center',
    height: '1.5rem',
    marginTop: '0.75rem',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center'
  }
});