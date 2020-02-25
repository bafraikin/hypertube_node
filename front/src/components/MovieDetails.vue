<template>
	<v-container dark>
		<div v-if="movie" style="color:white;">
		<v-img  max-height="300" v-bind:src="buildImg(movie)" contain ></v-img>
		<h1>{{ movie.title  }}</h1>
		<p>{{  movie.overview }}</p>


		<v-simple-table dark>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">Release Date</th>
						<th class="text-left">Note</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ movie.release_date }}</td>
						<td>{{ movie.vote_average }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>




		<div v-if="movie.imdb_id">
		<TorrentList :imdbCode="movie.imdb_id" :idOMDB="movie.id"></TorrentList>
		<Comment :imdbCode="movie.imdb_id"></Comment>
		<Casting :OMDBid="movie.id" ></Casting>
		</div>
		<div v-else>
			<h2>No imdb code available</h2>
			<p>So no torrents to display and no comments</p>
		</div>
		</div>
	</v-container>
</template>


<script>
import axios from  '@/config/axios_default';
import Comment from '@/components/Comments.vue';
import TorrentList from '@/components/TorrentList.vue';
import Casting from '@/components/Casting.vue';

export default {
	data() {
		return {
			movie: null,
			OMDBid: null
		}
	},
	components: {
		"Comment": Comment,
		"TorrentList": TorrentList,
		"Casting": Casting
	},
	methods:{
		buildImg(movie){
			return "https://image.tmdb.org/t/p/w500/"+ movie.poster_path;
		},
		getMovieDetails(){
			axios.get('😂/movie-detail', { params: { OMDBid: this.OMDBid } })
				.then(response => {
					this.movie = response.data;
					console.log(this.movie);
				})
		}
	},
	mounted(){
		this.OMDBid = this.$route.params.OMDBid;
		this.getMovieDetails();
	}
}

</script>
