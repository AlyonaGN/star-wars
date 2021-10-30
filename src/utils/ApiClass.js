import { SWAPI_BASE_URL } from './API_CONSTS';

class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getPeople() {
    return fetch(`${this.baseUrl}/people`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.status}`));
      });
  }
}

export const api = new Api({
  baseUrl: SWAPI_BASE_URL,
});
