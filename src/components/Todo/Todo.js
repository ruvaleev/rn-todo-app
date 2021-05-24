import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import RemoveButton from '../shared/RemoveButton';
import SquareCheckIcon from '../../assets/icons/SquareCheckIcon.js';
import SquareIcon from '../../assets/icons/SquareIcon.js';

const TodoLabel = ({ todo, toggleReady }) => (
  <TouchableOpacity onPress={() => toggleReady(todo.id)} style={styles.button}>
    <Text style={[todo.completed && styles.checked, { width: '90%', fontSize: 18 }]}>{todo.title}</Text>
    {todo.completed ? <SquareCheckIcon width={24} height={24}/> : <SquareIcon width={24} height={24}/>}
  </TouchableOpacity>
);

const Todo = ({
  areaId, todo, toggleReady, removeTodo,
}) => (
  <View style={styles.container}>
    <RemoveButton callback={() => removeTodo({ id: todo.id, areaId })} />
    <TodoLabel todo={todo} toggleReady={toggleReady} />
  </View>
);

export default Todo;

TodoLabel.propTypes = {
  todo: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object, PropTypes.bool],
    ),
  ).isRequired,
  toggleReady: PropTypes.func.isRequired,
};

Todo.propTypes = {
  areaId: PropTypes.string.isRequired,
  todo: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object, PropTypes.bool],
    ),
  ).isRequired,
  toggleReady: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '90%',
    width: '90%',
    marginVertical: 8
  },
  checked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  }
});
