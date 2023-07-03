import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000, // timeout after 3 second if request is not completed
});

export { axiosInstance };
