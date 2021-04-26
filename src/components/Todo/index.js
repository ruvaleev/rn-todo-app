import { connect } from 'react-redux';

import Todo from './Todo';
import { removeTodo, toggleReady } from '../../redux/slices/areas';

const mapStateToProps = (state) => ({
  areaId: state.areasReducer.areas.find((area) => area.choosen).id
});

const mapDispatchToProps = (dispatch) => ({
  toggleReady: (data) => dispatch(toggleReady(data)),
  removeTodo: (data) => dispatch(removeTodo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
