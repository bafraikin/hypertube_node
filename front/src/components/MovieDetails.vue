<template>
	<v-container v-if="onMontre" dark>
		<v-img  max-height="300" v-bind:src="buildImg(movie)" contain ></v-img>
		<h1>{{ movie.title  }}</h1>
		<p>{{  movie.overview }}</p>
		<v-simple-table>
			<template v-slot:default>
				<!-- <thead> -->
				<!-- 	<tr> -->
				<!-- 		<th class="text-left">Quality</th> -->
				<!-- 		<th class="text-left">Torrent link</th> -->
				<!-- 	</tr> -->
				<!-- </thead> -->
				<!-- <tbody> -->
				<!-- 	<tr v-for="torrent in movieDetail.torrents"> -->
				<!-- 		<td>{{ torrent.quality }}</td> -->
				<!-- 		<td> -->
				<!-- 			<i v-on:click="download(movieDetail, torrent)" >Play</i> -->
				<!-- 		</td> -->
				<!-- 	</tr> -->
				<!-- </tbody> -->
			</template>
		</v-simple-table>

		<Comment :imdbCode="movie.imdb_id"></Comment>

	</v-container>
</template>


<script>
import axios from  '@/config/axios_default';
import Comment from '@/components/Comments.vue'

export default {
	props: {
		OMDBid: { type: Number }
	},
	components: {
		"Comment": Comment
	},
	data() {
		return {
			onMontre: false,
			movie: null,
		}
	},
	methods:{
		download(movie, torrent){
			this.$router.push({ name: "player-film", params:{movie: movie, torrent: torrent}});
		},
		buildImg(movie){
			return "https://image.tmdb.org/t/p/w500/"+ movie.poster_path;
		},
		getMovieDetails(research){
			console.log("Dans get movie detail");
			axios.get('😂/movie-detail', { params: { OMDBid: this.OMDBid } })
			.then(response => {
				console.log(response.data);
				this.movie = response.data;
				this.onMontre = true;
			})
		},
	},
	mounted(){
		console.log(this.OMDBid);
		this.getMovieDetails(this.OMDBid);
	}
}
</script>
