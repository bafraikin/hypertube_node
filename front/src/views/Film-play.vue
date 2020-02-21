<template>
	<div id="lala">
		<div v-if="showFilm">
			<video  ref="myVid"  id="videoPlayer" controls >
						<source v-bind:src="filmPath" type="video/mp4"   >
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
			showFilm: false,
			filmPath: null,
		}
	},
	methods:{
		postWatchList(idOMDB){
			axios.post('😂/watch', { idOMDB: idOMDB}) .then(response => { })
		},
		downloadMovies(magnetLink){
			magnetLink = encodeURIComponent(magnetLink);
			this.filmPath = baseURL +  "/😂/player/" + magnetLink;
			this.showFilm = true;
		},
	},
	mounted(){
		var magnetLink = this.$route.params.magnetLink
		var idOMDB = this.$route.params.idOMDB
		this.downloadMovies(magnetLink);
		this.postWatchList(idOMDB);
	}
}
</script>
