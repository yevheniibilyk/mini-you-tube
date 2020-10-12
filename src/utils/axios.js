import axios from 'axios';
import { apiUrl } from '../config';

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export default axiosInstance;
