import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import TodosCard from '../TodosCard';

function Area({area, dropdownIsRolled}) {
  const { t } = useTranslation();

  return (
    dropdownIsRolled &&
      <View style={styles.container}>
        {area ? <TodosCard /> : <Text style={styles.message}>{t('no areas')}</Text>}
      </View>
  );
}

export default Area;

Area.propTypes = {
  area: PropTypes.objectOf(
    PropTypes.oneOfType(
      [
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.instanceOf(Date),
        PropTypes.arrayOf(PropTypes.object),
      ],
    ),
  ),
  dropdownIsRolled: PropTypes.bool.isRequired
};

Area.defaultProps = {
  area: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    left: '5%',
    display: 'flex',
    flexBasis: '80%'
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    color: 'rgba(254, 226, 226, 1)',
    fontSize: 24,
    fontWeight: '900',
    width: '100%',
  }
});
