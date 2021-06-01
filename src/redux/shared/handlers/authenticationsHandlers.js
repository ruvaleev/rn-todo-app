import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

const authorizedUser = { email: 'correct@email.com', password: 'password' };

const authorized = (email, password) => (
  email === authorizedUser.email && password === authorizedUser.password
);

const userExists = (email) => email === authorizedUser.email;

const authorizedResponse = [200]
const forbiddenResponse = [403, { errors: { email: ['has already been taken'] } }]
const unauthorizedResponse = [401, { errors: ['Unauthorized'] }]

const authorizedResponseWithCookie = async () => {
  await AsyncStorage.setItem('Authorized?', 'true')

  return [200]
}

const authenticationHandlers = function(mock) {
  mock.onGet('/auth').reply(async function() {
    const isAuthorized = await AsyncStorage.getItem('Authorized?') === 'true';
    const response = isAuthorized ? authorizedResponse : unauthorizedResponse;

    return response
  });
  mock.onPost('/auth').reply(async function(config) {
    const { email, password } = qs.parse(config.data).user;

    const response = authorized(email, password)
      ? authorizedResponseWithCookie()
      : unauthorizedResponse;

    return response
  });
  mock.onPost('/auth/demo').reply(async () => authorizedResponseWithCookie());
  mock.onDelete('/auth').reply(async function() {
    await AsyncStorage.setItem('Authorized?', 'false')

    return [200]
  });
  mock.onPost('/users').reply(async function(config) {
    const { email } = qs.parse(config.data).user;

    const response = userExists(email) ? forbiddenResponse : authorizedResponseWithCookie();

    return response
  });
}

export default authenticationHandlers;
