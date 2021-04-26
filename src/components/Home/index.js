import { connect } from 'react-redux';

import {
  enableDemoMode, logInDemo, logOut, resetError, verifyAuth,
} from '../../redux/slices/authentications';
import Home from './Home';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading,
  isError: state.authenticationsReducer.isError,
  error: state.authenticationsReducer.error,
  authToken: state.authenticationsReducer.authToken,
  isAuthenticated: state.authenticationsReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  enableDemoMode: () => dispatch(enableDemoMode()),
  logInDemo: () => dispatch(logInDemo()),
  logOut: () => dispatch(logOut()),
  resetError: () => dispatch(resetError()),
  verifyAuth: () => dispatch(verifyAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
