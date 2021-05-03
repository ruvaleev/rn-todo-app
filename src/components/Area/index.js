import { connect } from 'react-redux';

import Area from './Area';

const mapStateToProps = (state) => ({
  area: state.areasReducer.areas.find((area) => area.choosen)
});

export default connect(mapStateToProps)(Area);
