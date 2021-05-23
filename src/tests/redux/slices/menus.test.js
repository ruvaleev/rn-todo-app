import * as menusSliceActions from '../../../redux/slices/menus';
import createStore from '../../../redux/store';

describe('menusReducer', () => {
  let store;

  describe('toggleDropdownIsRolled', () => {
    it('toggles dropdownIsRolled flag', () => {
      store = createStore();

      expect(store.getState().menusReducer.dropdownIsRolled).toEqual(true);

      store.dispatch(menusSliceActions.toggleDropdownIsRolled());
      expect(store.getState().menusReducer.dropdownIsRolled).toEqual(false);

      store.dispatch(menusSliceActions.toggleDropdownIsRolled());
      expect(store.getState().menusReducer.dropdownIsRolled).toEqual(true);
    });
  });

  describe('toggleFormIsShown', () => {
    it('toggles formIsShown flag', () => {
      store = createStore();

      expect(store.getState().menusReducer.formIsShown).toEqual(false);

      store.dispatch(menusSliceActions.toggleFormIsShown());
      expect(store.getState().menusReducer.formIsShown).toEqual(true);

      store.dispatch(menusSliceActions.toggleFormIsShown());
      expect(store.getState().menusReducer.formIsShown).toEqual(false);
    });
  });
});
