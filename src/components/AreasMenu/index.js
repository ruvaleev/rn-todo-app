import { connect } from 'react-redux';

import { chooseArea, removeArea } from '../../redux/slices/areas';
import { toggleDropdownIsRolled } from '../../redux/slices/menus';
import AreasMenu from './AreasMenu';

const mapStateToProps = (state) => ({
  areas: state.areasReducer.areas,
  dropdownIsRolled: state.menusReducer.dropdownIsRolled
});

const mapDispatchToProps = (dispatch) => ({
  chooseArea: (data) => dispatch(chooseArea(data)),
  removeArea: (data) => dispatch(removeArea(data)),
  toggleDropdownIsRolled: () => dispatch(toggleDropdownIsRolled())
});

export default connect(mapStateToProps, mapDispatchToProps)(AreasMenu);
