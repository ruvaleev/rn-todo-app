import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ScrollView, View } from 'react-native';

import Todo from '../Todo';

function TodosList({ todos }) {
  const height = Dimensions.get('window').height * 0.8 * 0.5
  const scroll = useRef(null);

  useEffect(() => {
    scroll.current.scrollToEnd({ animated: true })
  }, [todos.length]);

  return (
    <ScrollView
      ref={scroll}
      style={[{ maxHeight: height, height: height }]}
      contentContainerStyle={{justifyContent: 'flex-end', flexGrow: 1}}
    >
      <View style={{ flex: 1 }}>
        {todos.map((todo) => <Todo key={todo.id} todo={todo}/>)}
      </View>
    </ScrollView>
  );
}

export default TodosList;

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object],
    ),
  ).isRequired
};
