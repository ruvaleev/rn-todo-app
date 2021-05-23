import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AreasMenu from '../../../components/AreasMenu';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';
import * as menusSliceActions from '../../../redux/slices/menus';
import AreasReducerGenerator from '../../shared/AreasReducerGenerator';
import MenusReducerGenerator from '../../shared/MenusReducerGenerator';

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <AreasMenu/>
    </Provider>,
  );
}

describe('AreasMenu', () => {
  const mockStore = configureStore([]);
  let store;
  let component;
  let areas;
  let choosenArea;
  let nonChoosenArea;
  let nonChoosenAreas;

  describe('when dropdownIsRolled flag is true (dropdown menu hidden)', () => {
    beforeEach(() => {
      store = mockStore(Store({
        areasReducer: AreasReducerGenerator({ areasCount: 3 }),
        menusReducer: MenusReducerGenerator({ dropdownIsRolled: true })
      }));
      store.dispatch = jest.fn();
      component = renderWithStore(store);
      areas = store.getState().areasReducer.areas;
      choosenArea = areas.find((area) => area.choosen);
      nonChoosenAreas = areas.filter((area) => !area.choosen);
    });
  
    it('shows only choosen area in dropdown menu title', () => {
      expect(component.queryByText(choosenArea.title)).toBeTruthy()
      nonChoosenAreas.forEach((area) => expect(component.queryByText(area.title)).toBeFalsy());
    });
  
    it('dispatches toggleDropdownIsRolled action on dropdown menu header click', () => {
      menusSliceActions.toggleDropdownIsRolled = jest.fn().mockImplementation();
  
      const choosenAreaTitle = component.getByTestId('DropdownHeaderTitle')
      fireEvent.press(choosenAreaTitle);
  
      expect(menusSliceActions.toggleDropdownIsRolled).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('when dropdownIsRolled flag is false (dropdown menu shown)', () => {
    beforeEach(() => {
      store = mockStore(Store({
        areasReducer: AreasReducerGenerator({ areasCount: 3 }),
        menusReducer: MenusReducerGenerator({ dropdownIsRolled: false })
      }));
      store.dispatch = jest.fn();
      component = renderWithStore(store);
      areas = store.getState().areasReducer.areas;
      choosenArea = areas.find((area) => area.choosen);
      nonChoosenArea = areas.find((area) => !area.choosen);
      nonChoosenAreas = areas.filter((area) => !area.choosen);
    });

    it('dropdown menu contains all areas titles', () => {
      nonChoosenAreas.forEach((area) => expect(component.queryByText(area.title)).toBeTruthy());
    });
  
    it('dispatches chooseArea action on area link click', () => {
      areasSliceActions.chooseArea = jest.fn().mockImplementation((payload) => payload);

      const nextChoosenAreaTitle = component.getByText(nonChoosenArea.title)
      fireEvent.press(nextChoosenAreaTitle);
  
      expect(areasSliceActions.chooseArea).toHaveBeenCalledTimes(1);
      expect(areasSliceActions.chooseArea).toHaveBeenCalledWith(nonChoosenArea.id);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith(nonChoosenArea.id);
    });
  });
});
