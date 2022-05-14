import { BASE_URL } from '../constants';
import { store } from '../services/Store';

const fetcher = async ({
  url,
  body = {},
  headers = {
    'Content-Type': 'application/json',
  },
  method = 'GET',
}) => {
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
    const response = await fetch(path, {
      body: JSON.stringify(body),
      headers: defaultHeaders,
      method,
    });
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
