import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import ButtonLink from '../shared/ButtonLink';
import DemoModeMessage from '../shared/DemoModeMessage';
import Errors from '../shared/Errors';
import ToggleLocaleButton from '../shared/ToggleLocaleButton';

function AuthenticationMenu({ isAuthenticated, logInDemo, logOut, navigation }) {
  const { t } = useTranslation();

  return (
    isAuthenticated
      ? (
        <>
          <ButtonLink callback={() => logOut()} title={t('log out')} />
          <ButtonLink callback={() => navigation.navigate('Planner')} title={t('planner')} />
        </>
      )
      : (
        <>
          <ButtonLink callback={() => navigation.navigate('Sign In')} title={t('sign in')} />
          <ButtonLink callback={() => navigation.navigate('Sign Up')} title={t('sign up')} />
          <ButtonLink callback={() => logInDemo()} title={t('demo mode')} />
        </>
      )
  );
}

function Home({
  error, isAuthenticated, isError, logInDemo, logOut, navigation, resetError
}) {

  return (
    <View style={styles.container}>
      <AuthenticationMenu isAuthenticated={isAuthenticated} logInDemo={logInDemo} logOut={logOut} navigation={navigation} />
      <ToggleLocaleButton />
      <DemoModeMessage />
      <Errors isError={isError} error={error} callback={() => resetError()} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default withLoading(Home);

AuthenticationMenu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logInDemo: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

Home.propTypes = {
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logInDemo: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired
};

Home.defaultProps = {
  error: null,
};
