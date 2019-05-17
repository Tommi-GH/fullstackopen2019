
import axios from 'axios'
const baseUrl = '/api/blogs'
const user = JSON.parse(localStorage.getItem('user'))
const token = user ? user.token : ''

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createBlog = async (blog) => {
  const res = await axios.post(baseUrl,blog)

  return res.data
}

export default { getAll, createBlog }