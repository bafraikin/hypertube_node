<template>
	<v-container>
		<h1>Research for a movie on YTS</h1>
		<v-form>
			<v-text-field v-model="researchText" label="Research"></v-text-field>
			<v-btn class="mr-4" @click="submitForm" > Search </v-btn>
		</v-form>

		<MoviesList  v-if="showResearchResult" v-on:selectMovie="showMovieDetailsFun($event)" :movies="movies"  ></MoviesList>
		<MovieDetails  v-if="showMovieDetails" :movieDetail="movieDetail"></MovieDetails>
	</v-container>
</template>

<script>

import MoviesList from '@/components/MovieResearch.vue'
import MovieDetails from '@/components/MovieDetails.vue'
import axios from  '@/config/axios_default';

export default {
	components: {
		"MoviesList": MoviesList,
		"MovieDetails": MovieDetails,
	},
	data() {
		return {
			showResearchResult: false,
			showMovieDetails: false,
			researchText: null,
			movieDetail: null,
			movies: null,
			movieAA: null
		}
	},
	methods:{
		showMovieDetailsFun(movieAA){
			this.movieDetail = movieAA;
			this.showMovieDetails = true;
			this.showResearchResult = false;
			this.research = false;
		},
		submitForm(e){
			e.preventDefault();
			this.searchForMovies(this.researchText);
		},
		searchForMovies(stringToSeach){
			axios
				.post('yes/film-search-api-query-string', {
					queryString: stringToSeach
				},     
					{headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					}})
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
		}
	},
	mounted(){
		console.log("hello");
	}
}
</script>
