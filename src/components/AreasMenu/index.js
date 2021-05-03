import { connect } from 'react-redux';

import { chooseArea, removeArea } from '../../redux/slices/areas';
import AreasMenu from './AreasMenu';

const mapStateToProps = (state) => ({
  areas: state.areasReducer.areas
});

const mapDispatchToProps = (dispatch) => ({
  chooseArea: (data) => dispatch(chooseArea(data)),
  removeArea: (data) => dispatch(removeArea(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AreasMenu);
