import MockAdapter from 'axios-mock-adapter';

import areasHandlers from './handlers/areasHandlers';
import authenticationsHandlers from './handlers/authenticationsHandlers';

const withMocks = function(axiosInstance) {

  var mock = new MockAdapter(process.env.NODE_ENV !== 'production' && axiosInstance);

  areasHandlers(mock);
  authenticationsHandlers(mock);

  return axiosInstance;
}

export default withMocks;
