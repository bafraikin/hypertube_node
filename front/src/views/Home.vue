<template>
	<v-container >
		<h1 class="white-text">Movies list</h1>
		<v-form  v-show="isConnected" >
			<v-text-field class="white" v-model="researchText" label="Research"></v-text-field>
			<v-btn class="ici"  @click="searchForMovies" > Search </v-btn>
		</v-form>
		<MoviesList dark v-if="showResearchResult" v-on:selectMovie="showMovieDetailsFun($event)" :movies="movies"  ></MoviesList>
		<MovieDetails class="back-black"  v-if="showMovieDetails" :movieDetail="movieDetail"></MovieDetails>
  <pagination/>
  </v-container>
</template>

<style lang="scss">
.white {
	background-color:white;
}
.white-text {
	color:white;
}
.back-black {
	color:white;
	background-color:black;
}
</style>

<script>

import axios from  '@/config/axios_default';
import MoviesList from '@/components/MovieResearch.vue'
import MovieDetails from '@/components/MovieDetails.vue'
import pagination from '@/components/utils/pagination.vue'

export default {
	name: 'home',
	components: {
		"MoviesList": MoviesList,
		"MovieDetails": MovieDetails,
		pagination,
	},
	data() {
		return {
			movies: null,
			showResearchResult: true,
			showMovieDetails: false,
			researchText: null,
			movieDetail: null,
			getConnected: null,
      page: 0
		}
	},
	methods:{
		searchForMovies(event){
			event.preventDefault();
			axios.post('😂/film-search-api-query-string', { queryString: this.researchText })
				.then(response => {
					if (response.status == 200){
						var arrayMovies = [];
						for (const property in response.data.data.movies) {
							var movie = response.data.data.movies[property];
							arrayMovies.push(movie);
						}
						this.movies = arrayMovies;
						this.showResearchResult = true;
						this.showMovieDetails = false;
					}
				})
		},
		showMovieDetailsFun(movieAA){
			if (this.getConnected){
				this.movieDetail = movieAA;
				this.showMovieDetails = true;
				this.showResearchResult = false;
			}
			else{
				console.log("please sign in first");
			}
		},
		defaultMoviesList(){
			let url = '/ytsApiDefaultList';
			axios.get(url)
				.then(response => {
					if (response.status == 200){
						var arrayMovies = [];
						for (const property in response.data.data.movies) {
							var movie = response.data.data.movies[property];
							arrayMovies.push(movie);
						}
						this.movies = arrayMovies;
					}
				})
		},
	},
	computed: {
		isConnected() {
			this.getConnected = this.$store.getters.connected;
			return this.$store.getters.connected;
		}
	},
	mounted(){
		this.defaultMoviesList();
	}
}

</script>
