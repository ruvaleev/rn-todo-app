import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react-native'

import Area from '../../../components/Area';
import Store from '../../shared/Store';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <Area />
    </Provider>,
  );
}

describe('Area', () => {
  const mockStore = configureStore([]);
  let area;
  let component;
  let store;

  beforeEach(() => {
    store = mockStore(Store());
    area = store.getState().areasReducer.areas.find((area) => area.choosen);
    component = renderWithStore(store);
  });

  it("renders titles of choosen area's todos", () => {
    area.todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeTruthy());
  });
});
