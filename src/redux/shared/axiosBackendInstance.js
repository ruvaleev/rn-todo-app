import axios from 'axios';

import withMocks from './withMocks';

import { API_KEY, ROOT_URL } from '../../../.env.json';

const axiosBackendInstance = axios.create({
  baseURL: ROOT_URL,
  timeout: 10000,
  headers: { Authorization: `Bearer ${API_KEY}` },
  withCredentials: true,

});

export default withMocks(axiosBackendInstance);
