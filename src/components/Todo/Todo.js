import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import RemoveIcon from '../shared/RemoveIcon';
import square from '../../assets/icons/square.svg';
import squareCheck from '../../assets/icons/square-check.svg';

const TodoLabel = ({ todo, toggleReady }) => (
  <TouchableOpacity onPress={() => toggleReady(todo.id)} style={[styles.button, (todo.completed && styles.checked)]}>
    <Image source={todo.completed ? squareCheck : square} style={styles.icon}/>
    <Text >{todo.title}</Text>
  </TouchableOpacity>
);

const Todo = ({
  areaId, todo, toggleReady, removeTodo,
}) => (
  <View style={styles.container}>
    <TodoLabel todo={todo} toggleReady={toggleReady} />
    <RemoveIcon callback={() => removeTodo({ id: todo.id, areaId })} />
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
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    marginRight: 16,
    fontSize: 16,
    lineHeight: 18,
    maxWidth: '100%'
  },
  icon: {
    minWidth: 16,
    width: 16,
    height: 16,
    marginRight: 16
  },
  checked: {
    textDecorationLine: 'line-through'
  }
});
