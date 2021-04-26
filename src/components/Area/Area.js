import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import TodosCard from '../TodosCard';
import RemoveIcon from '../shared/RemoveIcon';

function Title({ id, title, removeArea }) {
  return (
    <View testID='AreaTitle' style={styles.title}>
      <Text>{title}</Text>
      <RemoveIcon callback={() => removeArea(id)} />
    </View>
  );
}

function Area({area, removeArea}) {
  return (
    area ?
      <View style={styles.container}>
        <Title id={area.id} title={area.title} removeArea={removeArea} />
        <TodosCard areaId={area.id} todos={area.todos} />
      </View>
      : null
  );
}

export default Area;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 48,
    position: 'absolute',
    width: '90%',
    left: '5%',
  },
  title: {
    flexDirection: 'row'
  }
});

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
  removeArea: PropTypes.func.isRequired,
};

Area.defaultProps = {
  area: null,
};

Title.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  removeArea: PropTypes.func.isRequired,
};
