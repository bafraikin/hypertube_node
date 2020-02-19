<template>
	<div id="lala">

		<div v-if="showFilm">
			<h1>{{ film.title }}</h1>
			<video  ref="myVid"  id="videoPlayer"  	@progress="playerPgrogress($event)" 
													@changed="playerStateChanged($event)"
													@error="errorVideo($event)"
													@durationchange="durationchange($event)"
													@stalled="stalled($event)"
						controls crossorigin="true">
				<source v-bind:src="filmPath" type="video/mp4"   >
				<track label="English" kind="subtitles" srclang="en" v-bind:src="filmSubEn">
				<track label="Français" kind="subtitles" srclang="fr" v-bind:src="filmSubFr">
				<track label="中文" kind="subtitles" srclang="zh" v-bind:src="filmSubCh">
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
			filmSubEn: null,
			filmSubFr: null,
			filmSubCh: null,
		}
	},
	methods:{
		play(){
			this.$router.push({ name: "film-play", params:{title: title}});
		},
		getMovies(){
		},
		playerPgrogress(event){
			console.log("player progress");
			//console.log(event);
		},
		playerStateChanged(event){
			console.log("player state change");
			//console.log(event);
		},
		errorVideo(event){
			console.log("player error");
			//console.log("Error " + vid.error.code + "; details: " + vid.error.message);
			//alert("Error! Something went wrong");
		},
		durationchange(event){
			console.log("duration change");
		},
		stalled(event){
			console.log(event);
		},
	},
	mounted(){
		this.film = this.$route.params.movie;
		if (this.film != undefined){
			this.filmPath = "http://localhost:3000/player/" + this.film.imdbCode + "-" + this.film.title;
			this.showFilm = true;
			this.filmSubEn = "http://localhost:3000/" + this.film.imdbCode + "-eng.vtt";
			this.filmSubFr = "http://localhost:3000/" + this.film.imdbCode + "-fre.vtt";
			this.filmSubCh = "http://localhost:3000/" + this.film.imdbCode + "-chi.vtt";
		}
		console.log("bijour");
	}
}
</script>
