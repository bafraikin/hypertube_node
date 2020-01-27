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
						<th>Pourcentage</th>
						<th>Play</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="movie in films">
						<td>{{ movie.title }}</td>

						<td>{{ movie.pourcentage }}</td>

						<td v-if="movie.downloadStatus == 'notStarted'">Download not started</td>
						<td v-if="movie.downloadStatus == 'downloadOnGoing'">Download on going</td>
						<td v-if="movie.downloadStatus == 'downloadFinish'">Download finish</td>

						<td  v-on:click="play(movie)">Play</td>
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
			if (response.status == 200){
				var copyResponse = response.data;
				this.films = copyResponse;
				this.showFilms = true;
			}
			else{
				console.log("error in API");
			}
		},
		downloadMovies(movie, torrent){
			if (movie != undefined){
				var imdbCode = movie.imdb_code;
			}
			else{
				var imdbCode = undefined;
			}
			if (torrent != undefined){
				var url = torrent.url;
				var hash = torrent.hash;
			}
			else {
				var url = undefined;
				var hash = undefined;
			}
			axios
				.post('http://localhost:3000/download', {
					url: url,
					hash: hash,
					imdbCode: imdbCode,
					movie: movie,
				})
				.then(response => {
					this.handleResponse(response);
				})
		},
	},
	mounted(){
		var movie = this.$route.params.movie;
		var torrent = this.$route.params.torrent
		this.downloadMovies(movie, torrent);
	}
}
</script>
