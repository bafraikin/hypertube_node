<template>

		<!-- <v-form  v-show="isConnected" > -->
		<!-- 	<v-text-field class="white" v-model="researchText" label="Research"></v-text-field> -->
		<!-- 	<v-btn class="ici"  @click="searchForMovies" > Search </v-btn> -->
		<!-- </v-form> -->

		<!-- <MoviesList -->
		<!-- dark -->
		<!-- v-if="showResearchResult" -->
		<!-- v-on:selectMovie="showMovieDetailsFun($event)" -->
		<!-- :movies="movies" -->
		<!-- :watchList="watchList" -->
		<!-- ></MoviesList> -->
		<!-- <MovieDetails class="back-black"  v-if="showMovieDetails" :movieDetail="movieDetail"></MovieDetails> -->

  <v-container >
		<h1 class="white-text">New Home</h1>
		<ResearchBar v-if="showResearchBar" v-on:moviesResearch="researchMovieFun($event)" ></ResearchBar>
		<MovieVignette :movies="movies" v-if="showMovieVignette" v-on:selectMovie="showMovieDetailsFun($event)" ></MovieVignette>
		<MovieDetails class="back-black"  v-if="showMovieDetails" :movieDetail="movieDetail"></MovieDetails>
		<pagination/>
  </v-container>
</template>


<script>

import axios from  '@/config/axios_default';
import ResearchBar from '@/components/ResearchBar.vue'
import MovieVignette from '@/components/MovieVignette.vue'
import MovieDetails from '@/components/MovieDetails.vue'
import pagination from '@/components/utils/pagination.vue'

export default {
	name: 'home',
	components: {
		"ResearchBar": ResearchBar,
		"MovieDetails": MovieDetails,
		"MovieVignette": MovieVignette,
		pagination,
	},
	data() {
		return {
			showMovieVignette: false,
			showMovieDetails: false,
			showResearchBar: true,
			movies: null,
			page: 0,
			movieDetail: null,
		}
	},
	methods:{
		showMovieDetailsFun(movie){
			console.log(movie);
			this.movieDetail = movie;
			this.showMovieVignette = false;
			this.showResearchBar = false;
			this.showMovieDetails = true;
		},
		researchMovieFun(research){
			console.log("Dans researchMovieFun");
			axios.get('/research', { params: {
												firstYear: research.firstYear,
												lastYear: research.lastYear,
												firstNote: research.firstNote,
												lastNote: research.lastNote,
												queryString: research.queryString,
												genre: research.genre,
												}
				}) .then(response => {
				console.log(response.data);
				this.movies = response.data;
				this.showMovieVignette = true;
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
	}
}

</script>

