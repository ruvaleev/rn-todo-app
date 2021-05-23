import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import withLoading from '../HOC/withLoading';
import AuthenticationForm from '../shared/AuthenticationForm';
import Errors from '../shared/Errors';
import LayoutWithControlPanel from '../shared/LayoutWithControlPanel';

function SignInForm({ onSubmit, navigation }) {
  return (
    <LayoutWithControlPanel navigation={navigation}>
      <AuthenticationForm onSubmit={onSubmit} />
    </LayoutWithControlPanel>
  );
}

function SignIn({ error, isAuthenticated, isError, navigation, resetError, setError, signIn }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
      setError(t('error:already signed in'));
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.form}>
      <SignInForm onSubmit={signIn} navigation={navigation}/>
      <Errors isError={isError} error={error} callback={() => resetError()} />
    </View>
  )
}

export default withLoading(SignIn);

SignInForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SignIn.propTypes = {
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
});
