import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ModalForm from '../../../components/ModalForm';
import Store from '../../shared/Store';
import MenusReducerGenerator from '../../shared/MenusReducerGenerator';
import * as areasSliceActions from '../../../redux/slices/areas';
import * as menusSliceActions from '../../../redux/slices/menus';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <ModalForm/>
    </Provider>,
  );
}

describe('ModalForm', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  describe('when formIsShown flag is false', () => {
    beforeEach(() => {
      store = mockStore(Store({ menusReducer: MenusReducerGenerator({ formIsShown: false }) }));
      store.dispatch = jest.fn();
      component = renderWithStore(store);
    });

    it('returns null', () => {
      expect(component.toJSON()).toBeNull();
    })
  });

  describe('when formIsShown flag is true', () => {
    describe('when dropdownIsRolled flag is true', () => {
      beforeEach(() => {
        store = mockStore(Store({ menusReducer: MenusReducerGenerator({ dropdownIsRolled: true, formIsShown: true }) }));
        store.dispatch = jest.fn();
        component = renderWithStore(store);
      });
  
      it('dispatches createTodo action on area form submit', () => {
        areasSliceActions.createTodo = jest.fn().mockImplementation((payload) => payload);
    
        const area = store.getState().areasReducer.areas.find((a) => a.choosen);
        const title = 'New Todo Title';
        const inputField = component.getByTestId('AddTodo');
    
        fireEvent.changeText(inputField, title);
        fireEvent(inputField, 'onSubmitEditing');
    
        expect(areasSliceActions.createTodo).toHaveBeenCalledTimes(1);
        expect(areasSliceActions.createTodo).toHaveBeenCalledWith({ title, areaId: area.id });
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({ title, areaId: area.id });
      });
  
      it('dispatches toggleFormIsShown action on area form submit', () => {
        menusSliceActions.toggleFormIsShown = jest.fn().mockImplementation();
    
        const title = 'New Todo Title';
        const inputField = component.getByTestId('AddTodo');
    
        fireEvent.changeText(inputField, title);
        fireEvent(inputField, 'onSubmitEditing');
    
        expect(menusSliceActions.toggleFormIsShown).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
      });
    });

    describe('when dropdownIsRolled flag is false', () => {
      beforeEach(() => {
        store = mockStore(Store({ menusReducer: MenusReducerGenerator({ dropdownIsRolled: false, formIsShown: true }) }));
        store.dispatch = jest.fn();
        component = renderWithStore(store);
      });
  
      it('dispatches createArea action on area form submit', () => {
        areasSliceActions.createArea = jest.fn().mockImplementation((payload) => payload);
    
        const title = 'New Area Title';
        const inputField = component.getByTestId('AddArea');
    
        fireEvent.changeText(inputField, title);
        fireEvent(inputField, 'onSubmitEditing');
    
        expect(areasSliceActions.createArea).toHaveBeenCalledTimes(1);
        expect(areasSliceActions.createArea).toHaveBeenCalledWith({ title });
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({ title });
      });
  
      it('dispatches toggleFormIsShown action on area form submit', () => {
        menusSliceActions.toggleFormIsShown = jest.fn().mockImplementation();
    
        const title = 'New Area Title';
        const inputField = component.getByTestId('AddArea');
    
        fireEvent.changeText(inputField, title);
        fireEvent(inputField, 'onSubmitEditing');
    
        expect(menusSliceActions.toggleFormIsShown).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
      });
    });
  })
});



//   it('dispatches createArea action on area form submit', () => {
//     areasSliceActions.createArea = jest.fn().mockImplementation((payload) => payload);

//     const title = 'New Area Title';
//     const inputField = component.getByTestId('Add area');

//     fireEvent.changeText(inputField, title);
//     fireEvent(inputField, 'onSubmitEditing');

//     expect(areasSliceActions.createArea).toHaveBeenCalledTimes(1);
//     expect(areasSliceActions.createArea).toHaveBeenCalledWith({ title });
//     expect(store.dispatch).toHaveBeenCalledTimes(1);
//     expect(store.dispatch).toHaveBeenCalledWith({ title });
//   });
// });
