import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AreasCard from '../AreasCard';
import DemoModeMessage from '../shared/DemoModeMessage';
import PlannerMenu from '../PlannerMenu';

function Planner({ fetchAreas, isAuthenticated, navigation, setError }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Home');
      setError(t('error:unauthenticated'));
    } else {
      fetchAreas()
    }
  }, [!isAuthenticated]);

  return (
    <>
      <View style={styles.container}><AreasCard/></View>
      <PlannerMenu navigation={navigation}/>
      <DemoModeMessage />
    </>
  );
}

export default Planner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  }
});

Planner.propTypes = {
  fetchAreas: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired
};
