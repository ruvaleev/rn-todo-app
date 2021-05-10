import { combineReducers } from 'redux';

import areasReducer from '../slices/areas';
import authenticationsReducer from '../slices/authentications';
import menusReducer from '../slices/menus';

export default combineReducers(
  {
    areasReducer,
    authenticationsReducer,
    menusReducer
  },
);
