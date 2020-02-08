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
		downloadMovies(movie, torrent){
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
		var movie = this.$route.params.movie;
		var torrent = this.$route.params.torrent
		this.downloadMovies(movie, torrent);
	}
}
</script>
