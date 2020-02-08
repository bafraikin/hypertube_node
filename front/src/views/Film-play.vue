<template>
	<div id="lala">
		<div v-if="showFilm">
			<h1>{{ film.title }}</h1>
			<video  ref="myVid"  id="videoPlayer"  	@progress="playerPgrogress($event)" 
													@changed="playerStateChanged($event)"
													@error="errorVideo($event)"
													@durationchange="durationchange($event)"
													@stalled="stalled($event)"
						controls >
				<source v-bind:src="filmPath" type="video/mp4"   >
			</video>
		</div>
	</div>
</template>

<script>

import axios from  '@/config/axios_default';

export default {
	name: 'download',
	data() {
		return {
			film: null,
			showFilm: false,
			filmPath: null,
			imdbCode:null,
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
		downloadMovies(movie, torrent){
			console.log("Le IMDB code");
			console.log(movie.imdb_code);
			if (movie === undefined){
				var imdbCode = undefined;
				this.imdbCode = undefined
			}
			else{
				var imdbCode = movie.imdb_code;
				this.imdbCode = movie.imdb_code;
			}
			if (torrent != undefined){
				var url = torrent.url;
				var hash = torrent.hash;
			}
			else {
				var url = undefined;
				var hash = undefined;
			}
			console.log("On va download");
			axios.post('😂/download', {
					url: url,
					hash: hash,
					imdbCode: imdbCode,
					movie: movie,
				})
				.then(response => {
					//this.handleResponse(response);
		this.film = this.$route.params.movie;
		if (this.film != undefined){
			this.filmPath = "http://localhost:3000/😂/player/" + this.imdbCode + "-" + this.film.title;
			this.showFilm = true;
		}
				})
		},
	},
	mounted(){
		console.log("Les params");
		console.log(this.$route.params);
		var movie = this.$route.params.movie;
		var torrent = this.$route.params.torrent
		this.downloadMovies(movie, torrent);
		console.log("bijour");
	}
}
</script>
