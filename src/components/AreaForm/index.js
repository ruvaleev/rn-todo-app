import { connect } from 'react-redux';

import { createArea } from '../../redux/slices/areas';
import AreaForm from './AreaForm';

const mapDispatchToProps = (dispatch) => ({
  createArea: (data) => dispatch(createArea(data))
});

export default connect(null, mapDispatchToProps)(AreaForm);
