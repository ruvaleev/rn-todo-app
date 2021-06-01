
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import createStore from '../../../redux/store';

describe('authenticationsReducer', () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe('verifyAuth', () => {
    it('set isAuthenticated flag to true if user authorized on backend', async () => {
      await AsyncStorage.setItem('Authorized?', 'true')

      await store.dispatch(authenticationsSliceActions.verifyAuth());
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);

      await AsyncStorage.removeItem('Authorized?');
    });
    it('set isAuthenticated flag to false if user unauthorized on backend', async () => {
      await store.dispatch(authenticationsSliceActions.verifyAuth());
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
    });
  });

  describe('signIn', () => {
    const validCredentialsAction = { email: 'correct@email.com', password: 'password' };
    const invalidCredentialsAction = { email: 'incorrect@email.com', password: 'password' };
    const errorMessage = 'Unauthorized';

    it('set isAuthenticated flag to true if credentials are correct', async () => {
      await store.dispatch(authenticationsSliceActions.signIn(validCredentialsAction));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);
      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
    it('set isError flag to true and fills error if credentials are incorrect', async () => {
      await store.dispatch(authenticationsSliceActions.signIn(invalidCredentialsAction));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
      expect(store.getState().authenticationsReducer.isError).toEqual(true);
      expect(store.getState().authenticationsReducer.error).toEqual(errorMessage);
    });
  });

  describe('signUp', () => {
    const validCredentialsAction = { email: 'incorrect@email.com', password: 'password' };
    const invalidCredentialsAction = { email: 'correct@email.com', password: 'password' };
    const errorMessage = JSON.stringify({ email: ['has already been taken'] });

    it('set isAuthenticated flag to true if credentials are correct', async () => {
      await store.dispatch(authenticationsSliceActions.signUp(validCredentialsAction));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);
      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
    it('set isError flag to true and fills error if credentials are incorrect', async () => {
      await store.dispatch(authenticationsSliceActions.signUp(invalidCredentialsAction));
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
      expect(store.getState().authenticationsReducer.isError).toEqual(true);
      expect(store.getState().authenticationsReducer.error).toEqual(errorMessage);
    });
  });

  describe('logInDemo', () => {
    it('set isAuthenticated flag to true and rights DemoMode? cookie if credentials are correct', async () => {
      await AsyncStorage.removeItem('DemoMode?')
      await store.dispatch(authenticationsSliceActions.logInDemo());

      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);
      expect(store.getState().authenticationsReducer.isDemo).toEqual(true);
      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.isLoading).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);

      expect(await AsyncStorage.getItem('DemoMode?')).toEqual('true')
    });
  });

  describe('logOut', () => {
    it('set isAuthenticated flag to false, nullifies authToken and clears DemoMode? cookie', async () => {
      await AsyncStorage.setItem('DemoMode?', 'true')
      await store.dispatch(authenticationsSliceActions.logOut());

      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
      expect(store.getState().authenticationsReducer.isDemo).toEqual(false);
      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
  });

  describe('resetError', () => {
    const errorMessage = 'some error message';
    beforeEach(() => {
      store = createStore({ authenticationsReducer: { isError: true, error: errorMessage } });
    });
    it('set isAuthenticated flag to false and nullifies authToken', async () => {
      expect(store.getState().authenticationsReducer.isError).toEqual(true);
      expect(store.getState().authenticationsReducer.error).toEqual(errorMessage);

      store.dispatch(authenticationsSliceActions.resetError());

      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
  });
});
