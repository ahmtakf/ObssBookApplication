const api = "http://localhost:8080"

const headers = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }

export const login = (username, password) =>
  fetch(`${api}/public/login`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id:"0", username, password, isAdmin:"false" })
  }).then(res => res.json())
    .then(data => data);

export const signup = (username, password, isAdmin) =>
  fetch(`${api}/public/signup`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id:"0", username, password, isAdmin })
  }).then(res => res.json())
    .then(data => data);

export const logout = (token) =>
  fetch(`${api}/secureuser/logout`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    }  }).then(res => res.json())
    .then(data => data);

