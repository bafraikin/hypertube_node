<template>
	<div id="lala">
		<div v-if="showFilm">
			<!-- <h1>{{ title }}</h1> -->
			<video  ref="myVid"  id="videoPlayer" controls >
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
			title: '',
			showFilm: false,
			filmPath: null,
			imdbCode:null,
		}
	},
	methods:{
		postWatchList(){
			axios.post('😂/watch', { imdbCode: this.imdbCode })
				.then(response => {
					console.log(response);
					this.watch = response;
				})
		},
		downloadMovies(movie, torrent){
			console.log(movie);
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
			url = encodeURIComponent(url);
			hash = encodeURIComponent(hash);
			imdbCode = encodeURIComponent(imdbCode);
			console.log(movie);
			console.log(movie.title);
			this.title = movie.title;
			let title = encodeURIComponent(movie.title);

			this.filmPath = baseURL +  "/😂/player/" + url + "/"+ hash + "/"+ imdbCode;
			this.showFilm = true;
		},
	},
	mounted(){
		var movie = this.$route.params.movie;
		var torrent = this.$route.params.torrent
		console.log(movie);
		this.downloadMovies(movie, torrent);
		this.postWatchList();
	}
}
</script>
