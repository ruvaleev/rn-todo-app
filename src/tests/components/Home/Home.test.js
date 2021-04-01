import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import {fireEvent, render} from '@testing-library/react-native'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import i18n from 'i18next';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import '../../mocks/matchMediaMock';
import Home from '../../../components/Home';
import SignUp from '../../../components/SignUp';
import Store from '../../shared/Store';
const Stack = createStackNavigator();
// import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

// import {
//   plannerPath, rootPath, signInPath, signUpPath,
// } from '../../../helpers/routes';

// const history = createMemoryHistory();

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

  describe('when user in Demo mode', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
          isDemo: true,
        }),
      }));

      // store.dispatch = jest.fn();
      // component = renderWithStoreAndNavigator(store, navigation);

      // store = mockStore(Store());
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
});


//   describe('when user authenticated', () => {
//     beforeEach(() => {
//       store = mockStore(Store({
//         authenticationsReducer: AuthenticationsReducerGenerator({
//           isAuthenticated: true,
//         }),
//       }));

//       store.dispatch = jest.fn();
//       component = renderWithStore(store);
//     });

//     it("doesn't render message about demo mode", () => {
//       expect(component.queryByText(i18n.t('demo mode message'))).not.toBeInTheDocument();
//     });

//     it('correctly renders link to planner', () => {
//       const plannerLink = component.getByText(i18n.t('planner'));
//       userEvent.click(plannerLink);
//       expect(history.location.pathname).toBe(plannerPath());
//     });

//     it('dispatches logOut action on log out link click and user stays on root path', () => {
//       history.push(rootPath());
//       authenticationsSliceActions.logOut = jest.fn();

//       const logOutLink = component.getByText(i18n.t('log out'));
//       userEvent.click(logOutLink);

//       expect(history.location.pathname).toBe(rootPath());
//       expect(authenticationsSliceActions.logOut).toHaveBeenCalledTimes(1);
//       expect(store.dispatch).toHaveBeenCalledTimes(2);
//     });

//     it("doesn't render sign in link", () => {
//       expect(component.queryByText(i18n.t('sign in'))).not.toBeInTheDocument();
//     });

//     it("doesn't render sign up link", () => {
//       expect(component.queryByText(i18n.t('sign up'))).not.toBeInTheDocument();
//     });

//     it('renders change language link', () => {
//       const initialLanguage = i18n.language;
//       const changeLanguageLink = component.getByText(i18n.t('change language'));

//       userEvent.click(changeLanguageLink);
//       expect(i18n.language).not.toEqual(initialLanguage);

//       userEvent.click(changeLanguageLink);
//       expect(i18n.language).toEqual(initialLanguage);
//     });
//   });
// });
