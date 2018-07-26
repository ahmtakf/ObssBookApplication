const api = "http://localhost:8080"

const headers = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }

export const addBook = (name, pageSize, publishDate, author, token) =>
  fetch(`${api}/book/add`, {
      method: 'POST',
      headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
      },
      body: JSON.stringify({ id:0, name, pageSize, publishDate, author})
}).then(res => res.json())
  .then(data => data);

export const wishBook = (book, token) =>
  fetch(`${api}/book/wish`, {
      method: 'POST',
      headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
      },
      body: JSON.stringify(book)
}).then(res => res.json())
  .then(data => data);

export const cancelWish = (book, token) =>
  fetch(`${api}/book/cancelwish`, {
      method: 'POST',
      headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
      },
      body: JSON.stringify( book)
}).then(res => res.json())
  .then(data => data);

export const readBook = (book, token) =>
  fetch(`${api}/book/read`, {
      method: 'POST',
      headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
      },
      body: JSON.stringify(book)
}).then(res => res.json())
  .then(data => data);

export const cancelRead = (book, token) =>
  fetch(`${api}/book/cancelread`, {
      method: 'POST',
      headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
      },
      body: JSON.stringify( book)
}).then(res => res.json())
  .then(data => data);

export const getRead = (token) =>
    fetch(`${api}/book/getread`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(token)
        },
        body: JSON.stringify({})
  }).then(res => res.json())
    .then(data => data);

export const getWish = (token) =>
    fetch(`${api}/book/getwish`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(token)
        },
        body: JSON.stringify({})
  }).then(res => res.json())
    .then(data => data);

export const search = (key, max, token) =>
    fetch(`${api}/book/search`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(token)
      },
      body: JSON.stringify({ key, max })
    }).then(res => res.json())
      .then(data => data)
