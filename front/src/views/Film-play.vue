
<template>
	<div id="lala">
		<h1>{{ film }}</h1>
		<video id="videoPlayer" controls crossorigin="true">
			<source src="http://localhost:3000/player/title" type="video/mp4">
			<track label="English" kind="subtitles" srclang="en" src="http://localhost:3000/copy.vtt" default>
			<track label="French" kind="subtitles" srclang="fr" src="http://localhost:3000/tlk.vtt">
			<track label="Italian" kind="subtitles" srclang="it" src="http://localhost:3000/tlk-it.vtt">
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
			soustitre: null
		}
	},
	methods:{
		// getSub(){
		// 	console.log("On get subtitle");
		// 	axios
		// 		.get('http://localhost:3000/sub')
		// 		.then(response => {
		// 			console.log(response);
		// 			this.soustitre = response.data;
		// 		})
		// },
		play(){
			this.$router.push({ name: "film-play", params:{title: title}});
		},
		getMovies(){
		},
	},
	mounted(){
		console.log("hello");
		this.film = this.$route.params.title;
		// this.getSub();
	}
}
</script>
