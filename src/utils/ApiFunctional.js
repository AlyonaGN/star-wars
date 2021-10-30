//чистая функция
export const getPeople = (baseUrl) => {
  return fetch(`${baseUrl}/people`, {
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
};

export const getPerson = (baseUrl, id) => {
  return fetch(`${baseUrl}/people/${id}`, {
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
};
