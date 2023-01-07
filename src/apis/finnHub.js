import axios from "axios";

const key = '';
export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: key
  }
})
