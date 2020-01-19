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
						<td v-for="information in movie">
							{{information}}
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
							var arrayMovie = [];
							console.log(response.data.data.movies[property]);
							arrayMovie.push(response.data.data.movies[property].title);
							arrayMovie.push(response.data.data.movies[property].torrents[0].url);
							arrayMovies.push(arrayMovie);
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
