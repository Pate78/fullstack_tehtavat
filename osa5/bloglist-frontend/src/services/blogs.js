import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log('getting blogs!! baseUrl: ', baseUrl)
  return request.then(response => response.data)
}

const add = async (blog) => {
  const config = {
    // eslint-disable-next-line no-irregular-whitespace
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)

  return response.data
}

const update = async (blog) => {
  // console.log(blog)
  const config = {
    // eslint-disable-next-line no-irregular-whitespace
  //eslint-disable-next-line no-irregular-whitespace
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  // const response = await axios.put(`http://localhost:3004${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    // eslint-disable-next-line no-irregular-whitespace
  //eslint-disable-next-line no-irregular-whitespace
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, add, update, remove, setToken }