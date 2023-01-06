import axios from "axios";

const TOKEN = 'ces9kdiad3i2r4r9rgagces9kdiad3i2r4r9rgb0';
export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN
  }
})