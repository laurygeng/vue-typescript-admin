import axios from 'axios'

const serviceBook = axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3', // url = base url + request url
  timeout: 5000
})
export default serviceBook
