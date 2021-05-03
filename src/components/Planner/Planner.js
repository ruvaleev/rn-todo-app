import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import AreasCard from '../AreasCard';
import DemoModeMessage from '../shared/DemoModeMessage';
import LayoutWithControlPanel from '../shared/LayoutWithControlPanel';

function Planner({ fetchAreas, navigation, isAuthenticated, setError }) {
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
      <LayoutWithControlPanel navigation={navigation} providedStyle={styles.controlPanel}>
        <View style={styles.container}>
          <AreasCard/>
        </View>
      </LayoutWithControlPanel>
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
  },
  controlPanel: {
    backgroundColor: '#fff',
    marginTop: '0rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 0,
    padding: '0.5rem',
  }
});

Planner.propTypes = {
  fetchAreas: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired
};
