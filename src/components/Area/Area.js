import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import TodosCard from '../TodosCard';

function Area({area, isRolled}) {
  return (
    isRolled &&
      <View style={styles.container}>
        {area && <TodosCard />}
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
  isRolled: PropTypes.bool.isRequired
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
  }
});
