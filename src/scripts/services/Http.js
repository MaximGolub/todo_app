import { BASE_URL } from '../constants';
import { store } from './Store';

const fetcher = async ({ url, body = {}, headers = {}, method = 'GET' }) => {
  const { user } = store.getState();
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (user) {
    defaultHeaders['Authorization'] = `Bearer ${user.token}`;
  }

  try {
    const path = BASE_URL + url;
    var requestOptions = {
      method: method,
      headers: defaultHeaders,
    };

    if (
      body &&
      Object.keys(body).length !== 0 &&
      Object.getPrototypeOf(body) === Object.prototype
    ) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(path, requestOptions);

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

class Http {
  static get({ url }) {
    return fetcher({ url });
  }

  static post({ url, body }) {
    return fetcher({ url, method: 'POST', body });
  }

  static put({ url, body }) {
    return fetcher({ url, method: 'PUT', body });
  }

  static delete({ url }) {
    return fetcher({ url, method: 'DELETE' });
  }
}

export default Http;
