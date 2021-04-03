import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';

import Home from '../../../components/Home';
import Store from '../../shared/Store';
import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

/* eslint-disable no-import-assign */
function renderWithStoreAndNavigator(store, navigation) {
  return render(
    <Provider store={store}>
      <Home navigation={navigation} />
    </Provider>
  );
}

describe('Home', () => {
  const mockStore = configureStore([]);
  const navigate = jest.fn();
  const navigation = { navigate: navigate };
  let store;
  let component;

  describe('when user authenticated', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it("doesn't render message about demo mode", () => {
      expect(component.queryByText(i18n.t('demo mode message'))).toBeFalsy();
    });

    it('correctly renders link to planner', () => {
      fireEvent.press(component.getByText(i18n.t('planner')));
      expect(navigate).toHaveBeenCalledWith('Planner');
    });

    it('dispatches logOut action on log out link click', () => {
      authenticationsSliceActions.logOut = jest.fn();

      fireEvent.press(component.getByText(i18n.t('log out')));

      expect(authenticationsSliceActions.logOut).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it("doesn't render sign in link", () => {
      expect(component.queryByText(i18n.t('sign in'))).toBeFalsy();
    });

    it("doesn't render sign up link", () => {
      expect(component.queryByText(i18n.t('sign up'))).toBeFalsy();
    });

    it('renders change language link', () => {
      const changeLanguageLink = component.getByText(i18n.t('change language'));
      fireEvent.press(changeLanguageLink);
      const initialLanguage = i18n.language;

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });
  });

  describe('when user in Demo mode', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
          isDemo: true,
        }),
      }));
      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('renders message about demo mode', () => {
      expect(component.queryByText(i18n.t('demo mode message'))).toBeTruthy();
    });

    it('renders change language link', () => {
      const changeLanguageLink = component.getByText(i18n.t('change language'));
      fireEvent.press(changeLanguageLink);
      const initialLanguage = i18n.language;

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });
  });

  describe('when user unauthenticated', () => {
    beforeEach(() => {
      store = mockStore(Store());
      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it("doesn't render message about demo mode", () => {
      expect(component.queryByText(i18n.t('demo mode message'))).toBeFalsy();
    });

    it("doesn't render link to planner", () => {
      expect(component.queryByText(i18n.t('planner'))).toBeFalsy();
    });

    it('correctly renders link to sign in page', () => {
      fireEvent.press(component.getByText(i18n.t('sign in')));
      expect(navigate).toHaveBeenCalledWith('Sign In');
    });

    it('correctly renders link to sign up page', () => {
      fireEvent.press(component.getByText(i18n.t('sign up')));
      expect(navigate).toHaveBeenCalledWith('Sign Up');
    });

    it("doesn't render log out link", () => {
      expect(component.queryByText(i18n.t('log out'))).toBeFalsy();
    });

    it('renders change language link', () => {
      const changeLanguageLink = component.getByText(i18n.t('change language'));
      fireEvent.press(changeLanguageLink);
      const initialLanguage = i18n.language;

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });
  });
});
