import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-unused-expressions, no-param-reassign */

const initialState = { isRolled: true };

const authenticationsSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    toggleIsRolled(state) {
      state.isRolled = !state.isRolled;
    }
  }
});

export const { toggleIsRolled } = authenticationsSlice.actions;
export default authenticationsSlice.reducer;
