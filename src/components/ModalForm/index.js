import { connect } from 'react-redux';

import { createArea, createTodo } from '../../redux/slices/areas';
import { toggleFormIsShown } from '../../redux/slices/menus';
import ModalForm from './ModalForm';

const mapStateToProps = (state) => ({
  areaId: state.areasReducer.areas.length > 0 && state.areasReducer.areas.find((area) => area.choosen).id,
  dropdownIsRolled: state.menusReducer.dropdownIsRolled,
  formIsShown: state.menusReducer.formIsShown
});

const mapDispatchToProps = (dispatch) => ({
  createArea: (data) => dispatch(createArea(data)),
  createTodo: (data) => dispatch(createTodo(data)),
  toggleFormIsShown: () => dispatch(toggleFormIsShown())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
