import React from 'react';
import PropTypes from 'prop-types';

import TodosList from './TodosList';
import TodoForm from './TodoForm';
import { View } from 'react-native';

function TodosCard({ areaId, todos, createTodo }) {
  return (
    <View style={{flexDirection: 'column'}}>
      <TodosList todos={todos} />
      <TodoForm
        onSubmit={
          (data) => { createTodo({ title: data, areaId }); }
        }
      />
    </View>
  );
}

TodosCard.propTypes = {
  areaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired,
  createTodo: PropTypes.func.isRequired,
};

export default TodosCard;
