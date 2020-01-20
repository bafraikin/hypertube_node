<template>
	<div id="lala">
		<h1>hello a tous</h1>
		<table>
			<tr>
				<th>Title</th>
				<th>Torrent link</th>
				<th>Status</th>
			</tr>
			<div v-if="showFilms" >
				<tr v-for="movie in films">
					<td>{{ movie.title }}</td>
					<td>{{ movie.downloadStatus }}</td>
					<td v-if="movie.downloadStatus == 'notStarted'">Download not started</td>
					<td v-if="movie.downloadStatus == 'downloadOnGoing'">Wait for more download data</td>
					<td  v-on:click="play(movie.title)"  v-if="movie.downloadStatus == 'downloadFinish'">Play the movie</td>
				</tr>
			</div>
		</table>
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
		play(){
			this.$router.push({ name: "film-play", params:{title: title}});
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
		downloadMovies(url, hash, title){
			console.log("On telecharge buddy");
			axios
				.post('http://localhost:3000/download', {
					url: url,
					hash: hash,
					title: title,
				})
				.then(response => {
					this.handleResponse(response);
				})
		},
	},
	mounted(){
		console.log("hello");
		if (this.$route.params.url != undefined && this.$route.params.hash != undefined && this.$route.params.title != undefined){
			this.downloadMovies(this.$route.params.url, this.$route.params.hash, this.$route.params.title);
		}
		else {
			this.getMovies();
		}
	}
}
</script>
