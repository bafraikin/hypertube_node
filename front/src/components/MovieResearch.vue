
<template>
	<v-container class="my-5">
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3   v-for="movie in movies" :key="movie.id"  >

				<v-card >
					<v-img class="white--text align-end" height="200px" v-bind:src="'http://img.yts.lt/' + movie.medium_cover_image" >
						<!-- <v-card-title>{{ movie.title }}</v-card-title> -->
					</v-img>
					<v-card-subtitle class="pb-0">{{ movie.title }}</v-card-subtitle>
					<v-card-text class="text--primary">
						<div>{{ movie.year }}</div>
						<div><span v-for="torrent in movie.torrents">{{torrent.quality}} </span></div>
					</v-card-text>
					<!-- <v-card-actions> -->
						<v-btn color="orange" text v-on:click="showMovieDetailsFun(movie)"> Watch </v-btn>
					<!-- </v-card-actions> -->
				</v-card>

			</v-flex>
		</v-layout>
	</v-container>
</template>



<script>

import axios from 'axios';
export default {
	name: 'filmList',
	props: {
		movies: { type: Array }
	},
	data() {
		return {
			movie: null
		}
	},
	methods:{
		showMovieDetailsFun(movie){
			this.movie = movie;
			console.log("On a select un movie");
			console.log(this.movie)
			this.$emit('selectMovie', movie);
		},
	},
	mounted(){
		console.log("hello Movie Vignette");
	}
}
</script>
