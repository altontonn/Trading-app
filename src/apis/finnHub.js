import axios from "axios";

const TOKEN = ''
;export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN
  }
})