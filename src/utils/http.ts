import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3024'
})

http.defaults.headers.authorization = 'batata'

export default http
