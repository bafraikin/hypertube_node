
import axios from 'axios'
import store from "@/store/index"
import bus from "@/config/bus_event"


const baseURL = 'http://localhost:3000';
const axiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
   response => {
		 if (response.status === 201)
			 bus.$emit('alert', {type: 'success', msg: 'element created'})
       return (response);
   },
   (error) => {
		 const status = error.response.status
		 if (status === 403)
			 bus.$emit('alert', {type: 'error', msg: "you're not allowed to perform this"})
		 if (status === 401)
			 bus.$emit('alert', {type: 'error', msg: "you need to be connected"})
		 if (status === 400)
			 bus.$emit('alert', {type: 'error', msg: "bad input"})
     return Promise.reject(error)
   });

axiosInstance.interceptors.request.use(
   response => {
       return (response);
   },
   (error) => {
    return Promise.reject(error)
   });

export {baseURL};
export default axiosInstance;
