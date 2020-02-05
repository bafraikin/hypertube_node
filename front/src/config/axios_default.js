
import axios from 'axios'


const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true
  /* other custom settings */
});


export default axiosInstance;
