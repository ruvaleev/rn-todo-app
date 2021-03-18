import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import ButtonLink from '../shared/ButtonLink';
import ToggleLocaleButton from '../shared/ToggleLocaleButton';

function AuthenticationMenu({ isAuthenticated, logInDemo, logOut }) {
  const history = {};
  const { t } = useTranslation();

  return (
    isAuthenticated
      ? (
        <>
          <ButtonLink callback={() => logOut()} title={t('log out')} />
          <ButtonLink callback={() => history.push('plannerPath()')} title={t('planner')} />
        </>
      )
      : (
        <>
          <ButtonLink callback={() => history.push('signInPath()')} title={t('sign in')} />
          <ButtonLink callback={() => history.push('signUpPath()')} title={t('sign up')} />
          <ButtonLink callback={() => logInDemo()} title={t('demo mode')} />
        </>
      )
  );
}

function Home({
  isAuthenticated, logInDemo, logOut
}) {

  return (
    <View style={styles.container}>
      <AuthenticationMenu isAuthenticated={isAuthenticated} logInDemo={logInDemo} logOut={logOut} />
      <ToggleLocaleButton />
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
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logInDemo: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

Home.defaultProps = {
  error: null,
};
