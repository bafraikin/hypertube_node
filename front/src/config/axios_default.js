
import axios from 'axios'
import store from "@/store/index"


const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
});



/*
axiosInstance.interceptors.response.use(function (response) {
	console.log("ddd")
	return response;
}, function (error) {
	if (error.response.status === 403) {
		console.log("ccc");
		window.location = '/';
	}
	else {
		return Promise.reject(error);
	}
});
*/

axiosInstance.interceptors.response.use(
   response => {
       return (response);
   },
   (error, dd) => {
		 console.log(error, dd);
       Promise.reject(error)
   });

axiosInstance.interceptors.request.use(
   response => {
       return (response);
   },
   (error) => {
		 console.log(error, dd);
       Promise.reject(error)
   });

export default axiosInstance;
