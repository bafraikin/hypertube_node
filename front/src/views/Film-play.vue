<template>
  	<div id="lala">
    	<!-- <div v-if="showFilm"> -->
      	<video  ref="myVid" style="width: 100%;"  id="videoPlayer" controls  crossorigin="use-credentials">
        	<source type="video/mp4">
        </video>
      	</div>
    	<!-- </div> -->
</template>

<script>

import axios, {baseURL} from  '@/config/axios_default';
import httpAdapter from 'axios/lib/adapters/http';




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
        	axios.post('😂/watch', {idOMDB: idOMDB}) .then(response => { })
      	},

		downloadMovies(magnetLink) {

			const videoTag = document.getElementById("videoPlayer");
			let myMediaSource = new MediaSource();
			let url = URL.createObjectURL(myMediaSource);
			videoTag.src = url;

			function sourceOpen(_){
				let videoSourceBuffer = myMediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001e"');
				console.log("*****************");

				magnetLink = encodeURIComponent(magnetLink);

				function consume(reader) {
					let total = 0
					return new Promise((resolve, reject) => {
						while(true) {
							reader.read().then(({done, value}) => {
								if (done) {
									resolve()
									return
								}
								//	console.log(value.buffer);
								videoSourceBuffer.appendBuffer(value.buffer);
								resolve();
							})
						}}).catch(reject)
				}
				fetch(baseURL + "/😂/player/" + magnetLink, {credentials: "include"})
					.then(res => consume(res.body.getReader()))
			}


			//.then(() => log("consumed the entire body without keeping the whole thing in memory!"))
			//.catch(e => log("something went wrong: " + e))
			console.log(sourceOpen);
			myMediaSource.addEventListener('sourceopen', sourceOpen);
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
          		})
    	},
    	addTrack(lang, label, srclang, code){
        	let video = document.getElementById("videoPlayer");
        	let track = document.createElement('track');
        	if (this.$i18n.locale == srclang)
          		track.default = true;
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
