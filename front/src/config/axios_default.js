
import axios from 'axios'
import store from "@/store/index"
import bus from "@/config/bus_event"

const baseURL = process.env.VUE_APP_backURL;

const axiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});


axiosInstance.interceptors.response.use(
   response => {
		 if (response.status === 201)
			 bus.$emit('alert', {type: 'success', code: 'CREATED'});
       return (response);
   },
   (error) => {
		 const status = error.response.status
		 if (status === 403)
			 bus.$emit('alert', {type: 'error', code: "NOT_ALLOWED"})
		 if (status === 401)
			 bus.$emit('alert', {type: 'error', code: "BAD_INPUT"})
		 if (status === 400)
			 bus.$emit('alert', {type: 'error', code: "ERROR"});
		 if (status === 406)
			 bus.$emit('alert', {type: 'error', code: "UNSIGNED"});
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
