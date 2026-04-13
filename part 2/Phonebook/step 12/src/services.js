const baseUrl = 'http://localhost:3001/persons'

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

const getAll = () => {
  return fetch(baseUrl)
    .then(handleResponse)
}

const create = (newObject) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newObject)
  })
    .then(handleResponse)
}

const update = (id, newObject) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newObject)
  })
    .then(handleResponse)
}

const deletePerson = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(handleResponse)
}

export default { getAll, create, update, deletePerson }