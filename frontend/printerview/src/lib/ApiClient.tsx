import axios from 'axios'
import { parseCookies } from 'nookies'

export function ApiClient() {
  const api = axios.create({
    baseURL: `http://localhost:5000`,
  })

  const { printerViewJwt: jwt } = parseCookies()

  if (jwt) {
    api.defaults.headers.common.Authorization = jwt
  }

  return api
}
