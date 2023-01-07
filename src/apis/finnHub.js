import axios from "axios";

const api_key = 'cesog42ad3i1epsgfeugcesog42ad3i1epsgfev0';
export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: api_key
  }
})
