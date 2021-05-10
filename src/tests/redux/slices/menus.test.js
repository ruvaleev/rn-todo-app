import * as menusSliceActions from '../../../redux/slices/menus';
import createStore from '../../../redux/store';

describe('menusReducer', () => {
  let store;

  describe('toggleIsRolled', () => {
    it('toggles isRolled flag', () => {
      store = createStore();

      expect(store.getState().menusReducer.isRolled).toEqual(true);

      store.dispatch(menusSliceActions.toggleIsRolled());
      expect(store.getState().menusReducer.isRolled).toEqual(false);

      store.dispatch(menusSliceActions.toggleIsRolled());
      expect(store.getState().menusReducer.isRolled).toEqual(true);
    });
  });
});
