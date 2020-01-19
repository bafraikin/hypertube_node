


<template>
	<h1>hello a tous</h1>
</template>



<script>
import axios from 'axios';

export default {
	name: 'home',
	data() {
		return {
			movies: null,
		}
	},
	methods:{
		downloadMovies(url, hash){
			axios
				.post('http://localhost:3000/download', {
					url: url,
					hash: hash,
				})
				.then(response => {
					if (response.status == 200){
						console.log("ok");
					}
				})
		}
	},
	mounted(){
		this.downloadMovies(this.$route.params.url, this.$route.params.hash);
	}
}
</script>
