<template>
	<div id="lala"  class="ui main container"    >
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.css" type="text/css" charset="utf-8">
		<h1>List of downloaded movies</h1>
		<div v-if="showFilms" >
			<table  class="ui celled table">
				<thead>
				<tr>
					<th>Title</th>
					<th>Status</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="movie in films">
					<td>{{ movie.title }}</td>
					<td v-if="movie.downloadStatus == 'notStarted'">Download not started</td>
					<td v-if="movie.downloadStatus == 'downloadOnGoing'">Wait for more download data</td>
					<td  v-on:click="play(movie)"  v-if="movie.downloadStatus == 'downloadFinish'">Play the movie</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>



<script>
import axios from 'axios';

export default {
	name: 'download',
	data() {
		return {
			films: null,
			showFilms: false,
		}
	},
	methods:{
		play(movie){
			this.$router.push({ name: "player-film", params:{movie: movie}});
		},
		handleResponse(response){
			console.log(response);
			if (response.status == 200){
				var copyResponse = response.data;
				this.films = copyResponse;
				this.showFilms = true;
			}
			else{
				console.log("error in API");
			}
		},
		getMovies(){
			console.log("On get buddy");
			axios
				.get('http://localhost:3000/download')
				.then(response => {
					this.handleResponse(response);
				})
		},
		downloadMovies(movie, torrent){
			console.log("On telecharge buddy");
			console.log(movie.imdb_code);
			axios
				.post('http://localhost:3000/download', {
					url: torrent.url,
					hash: torrent.hash,
					imdbCode: movie.imdb_code,
					movie: movie,
				})
				.then(response => {
					this.handleResponse(response);
				})
		},
	},
	mounted(){
		console.log("hello");
		//if (this.$route.params.url != undefined && this.$route.params.hash != undefined && this.$route.params.title != undefined){
		if (this.$route.params.movie){
			var movie = this.$route.params.movie;
			var torrent = this.$route.params.torrent
			console.log("on veut telecharger un film", movie);
			this.downloadMovies(movie, torrent);
		}
		else {
			this.getMovies();
		}
	}
}
</script>
