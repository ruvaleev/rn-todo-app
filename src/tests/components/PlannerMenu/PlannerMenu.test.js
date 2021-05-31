import React from 'react';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react-native'

import PlannerMenu from '../../../components/PlannerMenu';
import Store from '../../shared/Store';
import AreasReducerGenerator from '../../shared/AreasReducerGenerator';
import MenusReducerGenerator from '../../shared/MenusReducerGenerator';

function renderWithStoreAndNavigator(store, navigation) {
  return render(
    <Provider store={store}>
      <PlannerMenu navigation={navigation}/>
    </Provider>,
  );
}

describe('PlannerMenu', () => {
  const mockStore = configureStore([]);
  const navigate = jest.fn();
  const navigation = { navigate: navigate };
  let store;
  let component;

  describe('when dropdownIsRolled flag is true', () => {
    beforeEach(() => {
      store = mockStore(Store({ menusReducer: MenusReducerGenerator({ dropdownIsRolled: true }) }));
      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('correctly renders link to home page', () => {
      const homeLink = component.getByTestId('HomeLink');
      fireEvent.press(homeLink);
      expect(navigate).toHaveBeenCalledWith('Home');
    });

    it('correctly renders change language link', () => {
      const changeLanguageLink = component.getByTestId('ChangeLanguage');
      fireEvent.press(changeLanguageLink);
      const initialLanguage = i18n.language;

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });

    it('renders black PlusIcon', () => {
      const plusIcon = component.getByTestId('PlusIcon');
      expect(plusIcon.props.stroke).toEqual('black')
    })
  })

  describe('when dropdownIsRolled flag is false', () => {
    beforeEach(() => {
      store = mockStore(Store({ menusReducer: MenusReducerGenerator({ dropdownIsRolled: false }) }));
      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it("doesn't render link to home page", () => {
      expect(component.queryByTestId('HomeLink')).toBeFalsy();
    });

    it("doesn't render change locale link", () => {
      expect(component.queryByTestId('ChangeLanguage')).toBeFalsy();
    });

    it('renders red PlusIcon', () => {
      const plusIcon = component.getByTestId('PlusIcon');
      expect(plusIcon.props.stroke).toEqual('#D83E1D')
    })
  })

  describe('when dropdownIsRolled flag is true but user has no areas and tasks yet', () => {
    beforeEach(() => {
      store = mockStore(Store({

        areasReducer: AreasReducerGenerator({
          areasCount: 0
        }),
        menusReducer: MenusReducerGenerator({
          dropdownIsRolled: true
        })
      }));
      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('correctly renders link to home page', () => {
      const homeLink = component.getByTestId('HomeLink');
      fireEvent.press(homeLink);
      expect(navigate).toHaveBeenCalledWith('Home');
    });

    it('correctly renders change language link', () => {
      const changeLanguageLink = component.getByTestId('ChangeLanguage');
      fireEvent.press(changeLanguageLink);
      const initialLanguage = i18n.language;

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });

    it('renders red PlusIcon', () => {
      const plusIcon = component.getByTestId('PlusIcon');
      expect(plusIcon.props.stroke).toEqual('#D83E1D')
    })
  })
});
