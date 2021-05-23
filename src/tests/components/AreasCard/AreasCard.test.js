import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AreasCard from '../../../components/AreasCard';
import Store from '../../shared/Store';
import * as areasSliceActions from '../../../redux/slices/areas';
import AreasReducerGenerator from '../../shared/AreasReducerGenerator';
import MenusReducerGenerator from '../../shared/MenusReducerGenerator';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <AreasCard/>
    </Provider>,
  );
}

describe('AreasCard', () => {
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
  
    it("renders titles of choosen area's todos", () => {
      choosenArea.todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeTruthy());
    });
  })

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
    })
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

    it("doesn'e render titles of choosen area's todos", () => {
      choosenArea.todos.forEach((todo) => expect(component.queryByText(todo.title)).toBeFalsy());
    });
  });
});
