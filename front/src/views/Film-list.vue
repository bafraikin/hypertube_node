<template>
	<div>
		<h1>Research for a movie on YTS</h1>
		<form v-on:submit="submitForm" action="#" method="post" >
			<input type="text" v-model="researchText" placeholder="Movie title, Actor name...">
			<input type="submit" value="Submit" >
		</form>

		<MovieSearch  v-if="researchResult" v-on:selectMovie="showMovieDetailsFun($event)" :movies="movies"  ></MovieSearch>
		<MovieDetails  v-if="showMovieDetails" :movieDetail="movieDetail"></MovieDetails>

	</div>
</template>

<script>

import MovieSearch from '../components/MovieResearch.vue'
import MovieDetails from '../components/MovieDetails.vue'
import axios from 'axios';

export default {
  	name: 'filmList',
	components: {
		"MovieSearch": MovieSearch,
		"MovieDetails": MovieDetails,
	},
	data() {
		return {
			researchResult: false,
			showMovieDetails: false,
			researchText: null,
			movieDetail: null,
			movies: null,
			movieAA: null
		}
	},
	methods:{
		showMovieDetailsFun(movieAA){
			console.log(movieAA);
			this.movieDetail = movieAA;
			this.showMovieDetails = true;
			this.researchResult = false;
			this.research = false;
		},
		submitForm(e){
			e.preventDefault();
			this.searchForMovies(this.researchText);
		},
		searchForMovies(stringToSeach){
			axios
				.post('http://localhost:3000/film-search-api-query-string', {
					queryString: stringToSeach
				})
				.then(response => {
					if (response.status == 200){
						var arrayMovies = [];
						for (const property in response.data.data.movies) {
							var movie = response.data.data.movies[property];
							arrayMovies.push(movie);
						}
						this.movies = arrayMovies;
						this.researchResult = true;
					}
				})
		}
	},
	mounted(){
		console.log("hello");
	}
}
</script>
