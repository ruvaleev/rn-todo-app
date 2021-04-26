import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';

import Home from '../../../components/Home';
import Store from '../../shared/Store';
import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

const flushPromises = () => new Promise(setImmediate);

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
      authenticationsSliceActions.verifyAuth = jest.fn();
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

    it("doesn't verify auth", () => {
      expect(authenticationsSliceActions.verifyAuth).toHaveBeenCalledTimes(0);
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

    describe('DemoMode check', () => {
      beforeEach(() => {
        authenticationsSliceActions.enableDemoMode = jest.fn().mockImplementation();
      });

      it('dispatches enableDemoMode action when user has DemoMode? cookie set to true', async () => {
        await AsyncStorage.setItem('DemoMode?', 'true')
        renderWithStoreAndNavigator(store, navigation);
        await flushPromises();

        expect(authenticationsSliceActions.enableDemoMode).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        await AsyncStorage.removeItem('DemoMode?')
      });

      it('dispatches enableDemoMode action when user has DemoMode? cookie set to false', async () => {
        await AsyncStorage.setItem('DemoMode?', 'false')
        renderWithStoreAndNavigator(store, navigation);
        await flushPromises();

        expect(authenticationsSliceActions.enableDemoMode).toHaveBeenCalledTimes(0);
        expect(store.dispatch).toHaveBeenCalledTimes(0);
      });

      it('dispatches enableDemoMode action when user has DemoMode? cookie is absent', async () => {
        await AsyncStorage.removeItem('DemoMode?')
        renderWithStoreAndNavigator(store, navigation);
        await flushPromises();

        expect(authenticationsSliceActions.enableDemoMode).toHaveBeenCalledTimes(0);
        expect(store.dispatch).toHaveBeenCalledTimes(0);
      });
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
      authenticationsSliceActions.verifyAuth = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it("doesn't verify auth", () => {
      expect(authenticationsSliceActions.verifyAuth).toHaveBeenCalledTimes(0);
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
      authenticationsSliceActions.verifyAuth = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('verifies auth', () => {
      expect(authenticationsSliceActions.verifyAuth).toHaveBeenCalledTimes(1);
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

  describe('when component is loading', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
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

  describe('when component is not loading', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isLoading: false
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it("doesn't render loading icon", () => {
      expect(component.queryByTestId('LoadingIcon')).toBeFalsy();
    });
  });

  describe('when there are errors in store', () => {
    const errorMessage = 'Some Error Message';

    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isError: true,
          error: errorMessage,
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('shows proper error message', () => {
      expect(component.queryByText(errorMessage)).toBeTruthy();
    });

    it('dispatches resetError action on click on error message', () => {
      authenticationsSliceActions.resetError = jest.fn().mockImplementation();

      const errorMessageDiv = component.getByText(errorMessage);

      fireEvent.press(errorMessageDiv);

      expect(authenticationsSliceActions.resetError).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
