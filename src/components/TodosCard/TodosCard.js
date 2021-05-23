import React from 'react';
import PropTypes from 'prop-types';

import TodosList from './TodosList';
import { View } from 'react-native';

function TodosCard({ todos }) {
  return (
    <View style={{flexDirection: 'column', width: '100%', marginTop: 8}}>
      <TodosList todos={todos} />
    </View>
  );
}

TodosCard.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
};

export default TodosCard;
