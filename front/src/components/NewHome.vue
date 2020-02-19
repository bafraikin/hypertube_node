<template>
  <v-container >
		<h1>New Home</h1>
		<ResearchBar v-if="showResearchBar" v-on:moviesResearch="researchMovieFun($event)" ></ResearchBar>
		<MovieVignette :movies="movies" v-if="showMovieVignette" v-on:selectMovie="showMovieDetailsFun($event)" ></MovieVignette>
		<MovieDetails  v-if="showMovieDetails" :OMDBid="OMDBid"></MovieDetails>
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
			OMDBid: null,
		}
	},
	methods:{
		showMovieDetailsFun(movie){
			this.OMDBid = movie.id;
			this.showMovieVignette = false;
			this.showResearchBar = false;
			this.showMovieDetails = true;
		},
		researchMovieFun(research){
			axios.get('/research', { params: {
												firstYear: research.firstYear,
												lastYear: research.lastYear,
												minMark: research.firstNote,
												maxMark: research.lastNote,
												queryString: research.queryString,
												genre: research.genre,
												}
				}) .then(response => {
				this.movies = response.data;
				this.showMovieVignette = true;
				})
		},
	}
}

</script>

