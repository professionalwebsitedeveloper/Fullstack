const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return fetch(baseUrl)
    .then(response => response.json())
}

const create = (newObject) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newObject)
  })
    .then(response => response.json())
}

const update = (id, newObject) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newObject)
  })
    .then(response => response.json())
}

const deletePerson = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
}

export default { getAll, create, update, deletePerson }