import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? `${process.env.PRODUCTION_URL}/api` : 'http://localhost:3000/api'

const api = axios.create({
  baseURL: baseURL,
})

export { api }