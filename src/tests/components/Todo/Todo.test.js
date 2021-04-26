import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render } from '@testing-library/react-native'

import Todo from '../../../components/Todo';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';

function renderWithStore(store, areaId, todo) {
  return render(
    <Provider store={store}>
      <Todo areaId={areaId} todo={todo} />
    </Provider>,
  );
}

describe('Todo', () => {
  const mockStore = configureStore([]);
  const store = mockStore(Store());
  const area = store.getState().areasReducer.areas.find((a) => a.choosen);
  const todo = area.todos[0];
  const toggleReadyPayload = todo.id;
  const removeTodoPayload = { areaId: area.id, id: todo.id };
  let component;

  beforeEach(() => {
    store.dispatch = jest.fn();
    areasSliceActions.toggleReady = jest.fn().mockImplementation((payload) => payload);
    areasSliceActions.removeTodo = jest.fn().mockImplementation((payload) => payload);
    component = renderWithStore(store, area.id, todo);
  });

  it('renders todo title', () => {
    expect(component.queryByText(todo.title)).toBeTruthy();
  });

  it('dispatches toggleReady on checkbox click', () => {
    const checkbox = component.getByText(todo.title);
    fireEvent.press(checkbox);

    expect(areasSliceActions.toggleReady).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.toggleReady).toHaveBeenCalledWith(toggleReadyPayload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(toggleReadyPayload);
  });

  it('dispatches removeTodo on remove icon click', () => {
    const removeIcon = component.getByTestId('RemoveIcon');
    fireEvent.press(removeIcon);

    expect(areasSliceActions.removeTodo).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.removeTodo).toHaveBeenCalledWith(removeTodoPayload);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(removeTodoPayload);
  });
});
