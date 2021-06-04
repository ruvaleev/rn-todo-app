import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react-native'

import Area from '../../../components/Area';
import Store from '../../shared/Store';
import AreasReducerGenerator from '../../shared/AreasReducerGenerator';
import MenusReducerGenerator from '../../shared/MenusReducerGenerator';
import { useTranslation } from 'react-i18next';

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

  describe('when menusReducer dropdownIsRolled flag is true', () => {
    beforeEach(() => {
      store = mockStore(Store({ menusReducer: MenusReducerGenerator({ dropdownIsRolled: true }) }));
      area = store.getState().areasReducer.areas.find((area) => area.choosen);
      component = renderWithStore(store);
    });

    it("renders titles of choosen area's todos", () => {
      area.todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeTruthy());
    });
  })

  describe('when menusReducer dropdownIsRolled flag is false', () => {
    beforeEach(() => {
      store = mockStore(Store({ menusReducer: MenusReducerGenerator({ dropdownIsRolled: false }) }));
      area = store.getState().areasReducer.areas.find((area) => area.choosen);
      component = renderWithStore(store);
    });

    it("doesn't render titles of choosen area's todos", () => {
      area.todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeFalsy());
    });
  })


  describe('when user has no areas and tasks yet', () => {
    beforeEach(() => {
      store = mockStore(Store({
        areasReducer: AreasReducerGenerator({
          areasCount: 0
        })
      }));
      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it("renders appropriate message", () => {
      const { t } = useTranslation();
      expect(component.queryByText(t('no areas'))).toBeTruthy();
    });
  });
});
