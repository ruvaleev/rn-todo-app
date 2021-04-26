import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render } from '@testing-library/react-native'

import Area from '../../../components/Area';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';

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
    store.dispatch = jest.fn();
    areasSliceActions.removeArea = jest.fn().mockImplementation((payload) => payload);
    area = store.getState().areasReducer.areas.find((a) => a.choosen);
    component = renderWithStore(store);
  });

  it('renders choosen area title', () => {
    expect(component.queryByText(area.title)).toBeTruthy();
  });

  it("renders titles of area's todos", () => {
    area.todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeTruthy());
  });

  it('dispatches removeArea on remove icon click', () => {
    const removeIcon = component.getAllByTestId('RemoveIcon')[0];
    fireEvent.press(removeIcon);

    expect(areasSliceActions.removeArea).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.removeArea).toHaveBeenCalledWith(area.id);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(area.id);
  });
});
