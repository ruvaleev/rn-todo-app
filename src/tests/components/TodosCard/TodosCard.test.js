import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render } from '@testing-library/react-native'

import TodosCard from '../../../components/TodosCard';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <TodosCard />
    </Provider>,
  );
}

describe('TodosCard', () => {
  const mockStore = configureStore([]);
  const store = mockStore(Store());
  const area = store.getState().areasReducer.areas.find((a) => a.choosen);
  const { todos } = area;
  let component;

  beforeEach(() => {
    store.dispatch = jest.fn();
    areasSliceActions.createTodo = jest.fn().mockImplementation((payload) => payload);
    component = renderWithStore(store);
  });

  it("renders titles of choosen area's todos", () => {
    todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeTruthy());
  });

  it('dispatches createTodo action on todo form submit', () => {
    const title = 'New Todo Title';
    const todoInput = component.getByTestId('AddTodo');

    fireEvent.changeText(todoInput, title);
    fireEvent(todoInput, 'onSubmitEditing');

    expect(areasSliceActions.createTodo).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.createTodo).toHaveBeenCalledWith({ title, areaId: area.id });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ title, areaId: area.id });
  });
});
