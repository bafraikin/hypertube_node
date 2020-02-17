<template>
	<v-container v-if="onMontre" dark>
		<v-img  max-height="300" v-bind:src="buildImg(movie)" contain ></v-img>
		<h1>{{ movie.title  }}</h1>
		<p>{{  movie.overview }}</p>
		<TorrentList :imdbCode="movie.imdb_id" :idOMDB="movie.id"></TorrentList>
		<Comment :imdbCode="movie.imdb_id"></Comment>
	</v-container>
</template>


<script>
import axios from  '@/config/axios_default';
import Comment from '@/components/Comments.vue'
import TorrentList from '@/components/TorrentList.vue'

export default {
	props: {
		OMDBid: { type: Number }
	},
	components: {
		"Comment": Comment,
		"TorrentList": TorrentList
	},
	data() {
		return {
			onMontre: false,
			movie: null,
		}
	},
	methods:{
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
