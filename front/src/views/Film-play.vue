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
		}
	},
	methods:{
		postWatchList(idOMDB){
			axios.post('😂/watch', { idOMDB: idOMDB})
				.then(response => {
					;
					//console.log(response);
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
		var imdbCode = this.$route.params.imdbCode;
		var torrent = this.$route.params.torrent
		var idOMDB = this.$route.params.idOMDB
		this.downloadMovies(imdbCode, torrent);
		this.postWatchList(idOMDB);
	}
}
</script>
