<template>
	<v-container dark>
		<v-img  max-height="300" v-bind:src="movieDetail.medium_cover_image" contain ></v-img>
		<h1>{{ movieDetail.title  }}</h1>
		<p>{{  movieDetail.summary }}</p>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">Quality</th>
						<th class="text-left">Torrent link</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="torrent in movieDetail.torrents">
						<td>{{ torrent.quality }}</td>
						<td>
							<i v-on:click="download(movieDetail, torrent)" >Play</i>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>

		<Comment :imdbCode="movieDetail.imdb_code" :title="movieDetail.title"></Comment>

	</v-container>
</template>


<script>
import Comment from '@/components/Comments.vue'

export default {
	props: {
		movieDetail: { type: Object }
	},
	components: {
		"Comment": Comment,
	},
	data() {
		return {
			//movieDetail: null,
		}
	},
	methods:{
	download(movie, torrent){
				this.$router.push({ name: "player-film", params:{movie: movie, torrent: torrent}});
			},
	},
	mounted(){
		console.log(this.movieDetail.imdb_code);
		console.log(this.movieDetail.title);
	}
}
</script>
