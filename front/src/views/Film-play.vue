<template>
	<div id="lala">

		<div v-if="showFilm">
			<video  ref="myVid" style="width: 100%;"  id="videoPlayer" controls  crossorigin="use-credentials" >
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
		getSubtitles(code){
			axios
			.get("😂/subtitles", {
				params: {imdbId: code}
			})
			.then((response) => {
				if (response.data != undefined){
					let i = 0;
					while (i < response.data.length){
						if (response.data[i] == 'eng'){
							this.addTrack("eng", "English", "en", code);
						}
						else if (response.data[i] == 'fre'){
							this.addTrack("fre", "Français", "fr", code);
						}
						else if (response.data[i] == 'chi'){
							this.addTrack("chi", "中文", "zh", code);
						}
						i++;
					}
				}
			})
			.catch(error => {
				console.log("Error subtitles");
				console.log(error);
			})
		},
		addTrack(lang, label, srclang, code){
			let video = document.getElementById("videoPlayer");
			let track = document.createElement('track');
			track.setAttribute("label", label);
			track.setAttribute("kind", "subtitles");
			track.setAttribute("srclang", srclang);
			track.setAttribute("src", baseURL + "/" + code + "-" + lang + ".vtt");
			video.appendChild(track);
		}
	},
	mounted(){
		var imdbCode = this.$route.params.imdbCode;
		var magnetLink = this.$route.params.magnetLink;
		var idOMDB = this.$route.params.idOMDB;
		this.downloadMovies(magnetLink);
		this.getSubtitles(imdbCode);
		this.postWatchList(idOMDB);
	}
}
</script>
