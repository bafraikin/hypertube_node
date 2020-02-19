<template>
	<v-container dark>
		<div v-if="movie" style="color:white;">
		<v-img  max-height="300" v-bind:src="buildImg(movie)" contain ></v-img>
		<h1>{{ movie.title  }}</h1>
		<p>{{  movie.overview }}</p>
		<TorrentList :imdbCode="movie.imdb_id" :idOMDB="movie.id"></TorrentList>
		<Comment :imdbCode="movie.imdb_id"></Comment>
		</div>
	</v-container>
</template>


<script>
import axios from  '@/config/axios_default';
import Comment from '@/components/Comments.vue';
import TorrentList from '@/components/TorrentList.vue';

export default {
	data() {
		return {
			movie: null
		}
	},
	props: {
		OMDBid: { type: Number }
	},
	components: {
		"Comment": Comment,
		"TorrentList": TorrentList
	},
	methods:{
		buildImg(movie){
			return "https://image.tmdb.org/t/p/w500/"+ movie.poster_path;
		},
		getMovieDetails(research){
			axios.get('😂/movie-detail', { params: { OMDBid: this.OMDBid } })
				.then(response => {
					console.log(response);
					this.movie = response.data;
				})
		}
	},
	mounted(){
		this.getMovieDetails(this.OMDBid);
	}
}

</script>
