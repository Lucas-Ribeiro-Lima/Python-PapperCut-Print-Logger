import axios from 'axios'
import { parseCookies } from 'nookies'

export function ApiClient() {
  const api = axios.create({
    baseURL: `http://172.22.0.17:8887`,
  })

  const { printerViewJwt: jwt } = parseCookies()

  if (jwt) {
    api.defaults.headers.common.Authorization = jwt
  }

  return api
}
