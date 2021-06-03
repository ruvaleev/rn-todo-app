import { connect } from 'react-redux';

import { fetchAreas } from '../../redux/slices/areas';
import { setError } from '../../redux/slices/authentications';
import Planner from './Planner';

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
  isLoading: state.areasReducer.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  fetchAreas: () => dispatch(fetchAreas()),
  setError: (data) => dispatch(setError(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
