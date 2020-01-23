
<template>
	<div id="lala">
		<div v-if="showFilm">
			<h1>{{ film.title }}</h1>
			<video id="videoPlayer" controls>
				<source v-bind:src="filmPath" type="video/mp4">
			</video>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'download',
	data() {
		return {
			film: null,
			showFilm: false,
			filmPath: null,
		}
	},
	methods:{
		play(){
			this.$router.push({ name: "film-play", params:{title: title}});
		},
		getMovies(){
		},
	},
	mounted(){
		console.log("hello");
		this.film = this.$route.params.movie;
		if (this.film != undefined){
			this.filmPath = "http://localhost:3000/" + this.film.imdbCode + "-" + this.film.title;
			console.log(this.filmPath);
			this.showFilm = true;
		}
	}
}
</script>
