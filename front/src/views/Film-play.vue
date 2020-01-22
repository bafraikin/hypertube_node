
<template>
	<div id="lala">
		<h1>{{ film }}</h1>
		<video id="videoPlayer" controls>
			<source src="http://localhost:3000/player/title" type="video/mp4">
		</video>
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
		this.film = this.$route.params.title;
	}
}
</script>
