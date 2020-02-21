<template>
	<div id="lala">

		<div v-if="showFilm">
			<!-- <h1>{{ title }}</h1> -->
			<video  ref="myVid"  id="videoPlayer" controls  crossorigin="use-credentials" >
				<source v-bind:src="filmPath" type="video/mp4"   >
				<track label="English" kind="subtitles" srclang="en" v-bind:src="filmSubEn">
				<track label="Français" kind="subtitles" srclang="fr" v-bind:src="filmSubFr">
				<track label="中文" kind="subtitles" srclang="zh" v-bind:src="filmSubCh">
			</video>
		</div>
	</div>
</template>

<script>

import axios, {baseURL} from  '@/config/axios_default';

export default {
	name: 'download',
	data() {
		return {
			title: '',
			showFilm: false,
			filmPath: null,
			filmSubEn: null,
			filmSubFr: null,
			filmSubCh: null,
		}
	},
	methods:{
		postWatchList(idOMDB){
			axios.post('😂/watch', { idOMDB: idOMDB}) .then(response => { })
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
			this.filmPath =  baseURL + "/😂/player/" + url + "/"+ hash + "/"+ imdbCode;
			this.showFilm = true;
		},
	},
	mounted(){
		var imdbCode = this.$route.params.imdbCode;
		var torrent = this.$route.params.torrent;
		var idOMDB = this.$route.params.idOMDB;
		this.downloadMovies(imdbCode, torrent);
		this.postWatchList(idOMDB);
		this.filmSubEn = "http://127.0.0.1:3000/" + imdbCode + "-eng.vtt";
		this.filmSubFr = "http://127.0.0.1:3000/" + imdbCode + "-fre.vtt";
		this.filmSubCh = "http://127.0.0.1:3000/" + imdbCode + "-chi.vtt";
	}
}
</script>
