import React from 'react';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react-native'

import Planner from '../../../components/Planner';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';
import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import AreasReducerGenerator from '../../shared/AreasReducerGenerator';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

function renderWithStoreAndNavigator(store, navigation) {
  return render(
    <Provider store={store}>
      <Planner navigation={navigation}/>
    </Provider>,
  );
}

describe('Planner', () => {
  const mockStore = configureStore([]);
  const navigate = jest.fn();
  const navigation = { navigate: navigate };
  let store;
  let component;

  describe('when user in Demo mode', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
          isDemo: true,
        }),
      }));

      store.dispatch = jest.fn();
      areasSliceActions.fetchAreas = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('renders message about demo mode', () => {
      expect(component.queryByText(i18n.t('demo mode message'))).toBeTruthy();
    });

    it('fetches all areas', () => {
      expect(areasSliceActions.fetchAreas).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
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
  });

  describe('when user authenticated', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
          isDemo: false,
        }),
      }));

      store.dispatch = jest.fn();
      areasSliceActions.fetchAreas = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it("doesn't render message about demo mode", () => {
      expect(component.queryByText(i18n.t('demo mode message'))).toBeFalsy();
    });

    it('fetches all areas', () => {
      expect(areasSliceActions.fetchAreas).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
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
  });

  describe('when user unauthenticated', () => {
    const errorMessage = i18n.t('error:unauthenticated');

    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: false,
        }),
      }));
      store.dispatch = jest.fn();
      areasSliceActions.fetchAreas = jest.fn();
      authenticationsSliceActions.setError = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('redirects to Home Page', () => {
      expect(navigate).toHaveBeenCalledWith('Home');
      expect(authenticationsSliceActions.setError).toHaveBeenCalledWith(errorMessage);
    });

    it("doesn't fetch areas", () => {
      expect(areasSliceActions.fetchAreas).toHaveBeenCalledTimes(0);
    });
  });

  describe('when component is loading', () => {
    beforeEach(() => {
      store = mockStore(Store({
        areasReducer: AreasReducerGenerator({
          isLoading: true
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('renders loading icon', () => {
      expect(component.getByTestId('LoadingIcon')).toBeTruthy();
    });
  });
});
