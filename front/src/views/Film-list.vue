<template>
	<div id="lala">
		<h1>Research for a movie on YTS</h1>
		<form v-on:submit="submitForm" action="#" method="post" >
			<input type="text" v-model="researchText" placeholder="Movie title, Actor name...">
			<input type="submit" value="Submit" >
		</form>
			<div v-if="researchSubmit" >
				<h2>List of film that match : {{researchTextSubmit}}</h2>
				<table>
					<tr>
						<th>Title</th>
						<th>Torrent link</th>
					</tr>
					<tr v-for="movie in films">
						<td>{{ movie.title }}</td>
						<td>
							<!-- <a v-bind:href="'/download/' + encodeURI(movie.torrents[0].url) + '/' + encodeURI(movie.torrents[0].hash)" > -->
								<i v-on:click="download(movie.torrents[0].url, movie.torrents[0].hash)" >Download</i>
							<!-- </a> -->
						</td>
					</tr>
				</table>
			</div>
	</div>
</template>

<script>

import axios from 'axios';
export default {
	name: 'home',
	data() {
		return {
			researchSubmit: false,
			researchText: null,
			researchTextSubmit: null,
			films: null,
		}
	},
	methods:{
		submitForm(e){
			e.preventDefault();
			this.researchSubmit = true;
			this.searchForMovies(this.researchText);
			this.researchTextSubmit = this.researchText;
		},
		download(url, hash){
			var url = encodeURI(url);
			var hash = encodeURI(hash);
			this.$router.push({ name: "film-download", params:{url: url, hash: hash}});
		},
		searchForMovies(stringToSeach){
			axios
				.post('http://localhost:3000/film-search-api-query-string', {
					queryString: stringToSeach
				})
				.then(response => {
					if (response.status == 200){
						var arrayMovies = [];
						this.testApi = response.data.data.movies;
						for (const property in response.data.data.movies) {
							var movie = response.data.data.movies[property];
							arrayMovies.push(movie);
						}
						this.films = arrayMovies;
					}
				})
		}
	},
	mounted(){
	}
}
</script>
