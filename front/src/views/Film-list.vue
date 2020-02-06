<template>
	<div id="lala" class="ui main container" >
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.css" type="text/css" charset="utf-8">
		<div v-if="research">
			<h1>Research for a movie on YTS</h1>
			<form v-on:submit="submitForm" action="#" method="post" >
				<input type="text" v-model="researchText" placeholder="Movie title, Actor name...">
				<input type="submit" value="Submit" >
			</form>
				<div v-if="researchSubmit" >
					<h2>List of film that match : {{researchTextSubmit}}</h2>
					<!-- <table> -->
				<!-- 	<tr> -->
				<!-- 		<th>Title</th> -->
				<!-- 		<th>Torrent link</th> -->
				<!-- 	</tr> -->
				<!-- 	<tr v-for="movie in films"> -->
				<!-- 		<td>{{ movie.title }}</td> -->
				<!-- 		<td> -->
				<!-- 			<i v-on:click="download(movie.torrents[0].url, movie.torrents[0].hash, movie.title)" >Download</i> -->
				<!-- 		</td> -->
				<!-- 	</tr> -->
				<!-- </table> -->
				</div>
				<div class="ui special cards">
					<div v-for="movie in films" class="card">
						<div class="blurring dimmable image">
							<div class="ui dimmer">
								<div class="content">
									<div class="center">
										<div class="ui inverted button">Add Friend</div>
									</div>
								</div>
							</div>
							<img v-bind:src="'http://img.yts.lt/' + movie.medium_cover_image">
						</div>
						<div class="content">
							<a v-on:click="showMovieDetailsFun(movie)" class="header">{{ movie.title }}</a>
							<div class="meta">
								<span class="date">{{ movie.year }}</span>
							</div>
						</div>
						<div class="extra content">
							<span v-for="torrent in movie.torrents">{{torrent.quality}} </span>
						</div>
					</div>
				</div>
		</div>


		<div v-if="showMovieDetails">
			<img class="ui centered medium image" v-bind:src="'http://img.yts.lt/' + movieDetail.medium_cover_image">
			<h1>{{ movieDetail.title  }}</h1>
			<p>{{  movieDetail.summary }}</p>


					<table class="ui celled table"   >
						<thead>
					<tr>
						<th>Quality</th>
						<th>Torrent link</th>
					</tr>
						</thead>
						<tbody>
					<tr v-for="torrent in movieDetail.torrents">
						<td>{{ torrent.quality }}</td>
						<td>
							<i v-on:click="download(movieDetail, torrent)" >Download</i>
						</td>
					</tr>
						</tbody>
				</table>

		</div>




	</div>
</template>

<script>

import axios from '@/config/axios_default';
export default {
	name: 'home',
	data() {
		return {
			research: true,
			researchSubmit: false,
			researchText: null,
			researchTextSubmit: null,
			films: null,
			showMovieDetails: false,
			movieDetail: null,
		}
	},
	methods:{
		showMovieDetailsFun(movie){
			this.movieDetail = movie;
			this.research = false;
			this.showMovieDetails = true;
		},
		submitForm(e){
			e.preventDefault();
			this.researchSubmit = true;
			this.searchForMovies(this.researchText);
			this.researchTextSubmit = this.researchText;
		},
		download(movie, torrent){
			this.$router.push({ name: "film-download", params:{movie: movie, torrent: torrent}});
		},
		searchForMovies(stringToSeach){
			axios.post('😂/film-search-api-query-string', {
					queryString: stringToSeach
				})
				.then(response => {
					if (response.status == 200){
						var arrayMovies = [];
						this.testApi = response.data.data.movies;
						console.log(this.testApi);
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
		console.log("hello");
	}
}
</script>
