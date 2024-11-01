import { API_BASE_URL } from '@/api/endpoint'
import axios from 'axios'

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default API
