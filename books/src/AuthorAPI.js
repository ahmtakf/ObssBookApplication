const api = "http://localhost:8080"

const headers = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }

export const addAuthor = (name, surname, birthday, token) =>
    fetch(`${api}/author/add`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(token)
        },
        body: JSON.stringify({ id:0, name, surname, birthday })
  }).then(res => res.json())
    .then(data => data);

export const getAll = (token) =>
    fetch(`${api}/author/getall`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(token)
        },
        body: JSON.stringify({})
  }).then(res => res.json())
    .then(data => data);
