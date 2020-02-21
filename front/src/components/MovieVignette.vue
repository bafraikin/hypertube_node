<template>
	<v-container >
		<h1 >Movie Vignette</h1>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4 lg3   v-for="movie in movies" :key="movie.id"  >
				<v-card dark>
					<v-img  height="200px" v-bind:src="buildImg(movie)" > </v-img>
					<v-icon large v-if="isInWatchList(movie.id)">mdi-play-circle</v-icon>
					<v-card-subtitle >{{ movie.title }}</v-card-subtitle>
					<v-card-text >
						<div>{{ movie.release_date }}</div>
						<div>Note : {{ movie.vote_average }}</div>
					</v-card-text>
					<v-btn  v-on:click="showMovieDetailsFun(movie)" > Detail </v-btn>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
import axios from  '@/config/axios_default';
export default {
	props: {
		movies: { type: Array },
	},
	data () {
      	return {
        	watchList: []
      	}
	},
	methods:{
		buildImg(movie){
			return "https://image.tmdb.org/t/p/w500/"+ movie.poster_path;
		},
		showMovieDetailsFun(movie){
			this.$emit('selectMovie', movie);
		},
    	isInWatchList(idOMDB){
			const found = this.watchList.find(element => element.idOMDB == idOMDB);
			if (found == undefined){
				return false;
			}else{
				return true;
			}
		},
		getWatchList(){
			if (this.$store.getters.connected)
			{
				axios.get('😂/watch')
					.then(response => {
						this.watchList = response.data;
					})
			}
		}
	},
	mounted(){
		this.getWatchList();
	}
}
</script>
