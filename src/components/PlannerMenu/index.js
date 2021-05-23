import { connect } from 'react-redux';

import { toggleFormIsShown } from '../../redux/slices/menus';
import PlannerMenu from './PlannerMenu';

const mapStateToProps = (state) => ({
  dropdownIsRolled: state.menusReducer.dropdownIsRolled
});

const mapDispatchToProps = (dispatch) => ({
  toggleFormIsShown: () => dispatch(toggleFormIsShown())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlannerMenu);
