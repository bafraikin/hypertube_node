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
		<ResearchBar
			v-on:moviesResearch="researchMovieFun($event)"
	  ></ResearchBar>
		<MovieVignette 
	  			:movies="movies" 
	  			v-if="showMovieVignette"
	  ></MovieVignette>

  <pagination/>
  </v-container>
</template>


<script>

import axios from  '@/config/axios_default';
import ResearchBar from '@/components/ResearchBar.vue'
import MovieVignette from '@/components/MovieVignette.vue'

import pagination from '@/components/utils/pagination.vue'

export default {
	name: 'home',
	components: {
		"ResearchBar": ResearchBar,
		"MovieVignette": MovieVignette,
		pagination,
	},
	data() {
		return {
			movies: null,
			showMovieVignette: false,
			page: 0

		}
	},
	methods:{
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

