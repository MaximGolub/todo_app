import { BASE_URL } from '../constants';

const fetcher = async ({
  url,
  body = {},
  headers = { 'Content-Type': 'application/json' },
  method = 'GET',
}) => {
  try {
    const path = BASE_URL + url;
    await fetch(path, {
      body: JSON.stringify(body),
      headers,
      method,
    });
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
