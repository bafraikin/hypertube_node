<template>
	<v-container >
		<h1 class="white-text">Movie Vignette</h1>
		<v-layout row wrap  >
			<v-flex xs12 sm6 md4 lg3   v-for="movie in movies" :key="movie.id"  >
				<v-card  dark class="black-black">
					<v-img  height="200px" v-bind:src="buildImg(movie)" > </v-img>

					<!-- <v-icon large v-if="isInWatchList(movie.imdb_code)">mdi-play-circle</v-icon> -->

					<v-card-subtitle style="color: white">{{ movie.title }}</v-card-subtitle>
					<v-card-text >
						<div  style="color: white">{{ movie.release_date }}</div>
						<div  style="color: white">Note : {{ movie.vote_average }}</div>
						<!-- <div><span v-for="torrent in movie.torrents"  style="color: white"  >{{torrent.quality}} </span></div> -->
					</v-card-text>
					<v-btn  v-on:click="showMovieDetailsFun(movie)" style="color: pink;"   > Watch </v-btn>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<style lang="scss">
.black-black {
	background-color: black;
	margin: 30px;
}
</style>

<script>
import axios from 'axios';
export default {
	props: {
		movies: { type: Array },
		//watchList: { type: Array },
	},
	methods:{
		buildImg(movie){
			return "https://image.tmdb.org/t/p/w500/"+ movie.poster_path;
		},
		showMovieDetailsFun(movie){
			this.$emit('selectMovie', movie);
		},
		isInWatchList(imdbCode){
			const found = this.watchList.find(element => element == imdbCode);
			if (found == undefined){
				return false;
			}else{
				return true;
			}
		}
	}
}
</script>

