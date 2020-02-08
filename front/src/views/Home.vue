<template>
	<div id="tout" class="home black">
		<v-container class="grey darken-3">

			<h1>Movies list</h1>
		<v-form  v-show="isConnected" >
			<v-text-field v-model="researchText" label="Research"></v-text-field>
			<v-btn class="mr-4" @click="submitForm" > Search </v-btn>
		</v-form>

			<MoviesList v-if="showResearchResult"  v-bind:buildLinkBool="buildLink"  v-on:selectMovie="showMovieDetailsFun($event)" :movies="movies"  ></MoviesList>
			<MovieDetails  v-if="showMovieDetails" :movieDetail="movieDetail"></MovieDetails>
		</v-container>
	</div>
</template>

<script>

import axios from  '@/config/axios_default';
import MoviesList from '@/components/MovieResearch.vue'
import MovieDetails from '@/components/MovieDetails.vue'

export default {
	name: 'home',
	components: {
		"MoviesList": MoviesList,
		"MovieDetails": MovieDetails,
	},
	data() {
		return {
			movies: null,
			showResearchResult: true,
			showMovieDetails: false,
			researchText: null,
			movieDetail: null,
			movies: null,
			movieAA: null,
			getConnected: null,
			buildLink: false,
		}
	},
	methods:{
		searchForMovies(stringToSeach){
			this.buildLink = true;
			axios.post('😂/film-search-api-query-string', {
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
		},
		submitForm(e){
			e.preventDefault();
			this.searchForMovies(this.researchText);
		},
		showMovieDetailsFun(movieAA){
			if (this.getConnected){
				this.movieDetail = movieAA;
				this.showMovieDetails = true;
				this.showResearchResult = false;
				this.research = false;
			}
			else{
				console.log("please sign in first");
			}
		},
		defaultMoviesList(){
			let url = this.getEmoji() + '/ytsApiDefaultList';
			console.log("URL");
			console.log(url);
			axios.get(url,
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
					}
				})
		},
		getEmoji(){
			return '';
			if(this.getConnected){
				return '😂';
			}
			else {
				return'😱';
			}
		},
		isConnectedFun() {
			return this.$store.getters.connected;
		}
	},
	computed: {
		isConnected() {
			this.getConnected = this.$store.getters.connected;
			return this.$store.getters.connected;
		}
	},
	mounted(){
		this.defaultMoviesList();
		console.log("le store");
		console.log(this.$store);
		console.log("your connected ?");
		console.log(this.isConnectedFun());
	}
}

</script>
