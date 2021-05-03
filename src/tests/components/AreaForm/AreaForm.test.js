import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AreaForm from '../../../components/AreaForm';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <AreaForm/>
    </Provider>,
  );
}

describe('Menu', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(Store());
    store.dispatch = jest.fn();
    component = renderWithStore(store);
  });

  it('dispatches createArea action on area form submit', () => {
    areasSliceActions.createArea = jest.fn().mockImplementation((payload) => payload);

    const title = 'New Area Title';
    const areaInput = component.getByTestId('Add area');

    fireEvent.changeText(areaInput, title);
    fireEvent(areaInput, 'onSubmitEditing');

    expect(areasSliceActions.createArea).toHaveBeenCalledTimes(1);
    expect(areasSliceActions.createArea).toHaveBeenCalledWith({ title });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ title });
  });
});
