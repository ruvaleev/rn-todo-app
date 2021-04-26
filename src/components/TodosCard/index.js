import { connect } from 'react-redux';

import TodosCard from './TodosCard';
import { createTodo } from '../../redux/slices/areas';

const mapStateToProps = (state) => ({
  areaId: state.areasReducer.areas.find((area) => area.choosen).id,
  todos: state.areasReducer.areas.find((area) => area.choosen).todos
});

const mapDispatchToProps = (dispatch) => ({
  createTodo: (data) => dispatch(createTodo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosCard);
