import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-unused-expressions, no-param-reassign */

const initialState = { dropdownIsRolled: true, formIsShown: false };

const authenticationsSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    toggleDropdownIsRolled(state) {
      state.dropdownIsRolled = !state.dropdownIsRolled;
    },
    toggleFormIsShown(state) {
      state.formIsShown = !state.formIsShown;
    },
  }
});

export const { toggleDropdownIsRolled, toggleFormIsShown } = authenticationsSlice.actions;
export default authenticationsSlice.reducer;
