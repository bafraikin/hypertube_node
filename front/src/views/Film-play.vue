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
		console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		console.log(this.imdbCode);
		console.log("imdb code dans post Watch");

			axios.post('😂/watch', { imdbCode: this.imdbCode })
				.then(response => {
					console.log(response);
					this.watch = response;
				})
		},
		downloadMovies(imdbCode, torrent){
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
			this.filmPath = "http://localhost:3000/😂/player/" + url + "/"+ hash + "/"+ imdbCode;
			this.showFilm = true;
		},
	},
	mounted(){
		console.log("&&&&&&&&&&    mounted  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
		console.log(this.imdbCode);
		console.log(this.$route.params);
		console.log("imdb code dans post Watch");
		var imdbCode = this.$route.params.imdbCode;
		var torrent = this.$route.params.torrent
		this.downloadMovies(imdbCode, torrent);
		this.postWatchList();
	}
}
</script>
