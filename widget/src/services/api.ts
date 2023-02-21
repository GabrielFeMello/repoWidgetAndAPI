import axios from 'axios'
import { baseURL } from '../util/baseURL'

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

export default api