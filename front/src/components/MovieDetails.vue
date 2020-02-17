<template>
	<v-container dark>
		<v-img  max-height="300" v-bind:src="buildImg(movieDetail)" contain ></v-img>
		<h1>{{ movieDetail.title  }}</h1>
		<p>{{  movieDetail.overview }}</p>
		<v-simple-table>
			<template v-slot:default>
				<!-- <thead> -->
				<!-- 	<tr> -->
				<!-- 		<th class="text-left">Quality</th> -->
				<!-- 		<th class="text-left">Torrent link</th> -->
				<!-- 	</tr> -->
				<!-- </thead> -->
				<!-- <tbody> -->
				<!-- 	<tr v-for="torrent in movieDetail.torrents"> -->
				<!-- 		<td>{{ torrent.quality }}</td> -->
				<!-- 		<td> -->
				<!-- 			<i v-on:click="download(movieDetail, torrent)" >Play</i> -->
				<!-- 		</td> -->
				<!-- 	</tr> -->
				<!-- </tbody> -->
			</template>
		</v-simple-table>

		<Comment :movie="movieDetail"></Comment>

	</v-container>
</template>


<script>
import Comment from '@/components/Comments.vue'

export default {
	props: {
		movieDetail: { type: Object }
	},
	components: {
		"Comment": Comment
	},
	methods:{
		download(movie, torrent){
			this.$router.push({ name: "player-film", params:{movie: movie, torrent: torrent}});
		},
		buildImg(movie){
			return "https://image.tmdb.org/t/p/w500/"+ movie.poster_path;
		},
	},
	mounted(){
		console.log(this.movieDetail);
	}
}
</script>
