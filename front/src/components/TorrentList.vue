<template>
	<v-container v-if="onMontre" dark>
		<h1 style="color:white;">Torrent List</h1>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">Quality</th>
						<th class="text-left">Torrent link</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="torrent in torrents">
						<td>{{ torrent.quality }}</td>
						<td>
							<i v-on:click="play(torrent)" >Play</i>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</v-container>
</template>


<script>
import axios from  '@/config/axios_default';
import Comment from '@/components/Comments.vue'

export default {
	props: {
		imdbCode: { type: String },
		idOMDB: { type: Number },
	},
	components: {
		"Comment": Comment
	},
	data() {
		return {
			onMontre: false,
			torrents: null,
		}
	},
	methods:{
		play(torrent){
			this.getSubtitles(this.imdbCode);
			this.$router.push({ name: "player-film", params:{imdbCode: this.imdbCode, torrent: torrent, idOMDB: this.idOMDB}});
		},
		getSubtitles(code){
			console.log("OK SUBTITLES////////////////////////////////////////////////////////////////////////////////////");
			var url = "😂/subtitles";
			axios
			.post(url, {
				imdbId: code
			})
			.then(response => {
				if(response.status == 200){
					console.log("LA RESPONSE");
					console.log(response.data);
				}
			})
			.catch(error => {
				console.log(error.response);
			})
		},
		buildImg(movie){
			return "https://image.tmdb.org/t/p/w500/"+ movie.poster_path;
		},
		getMovieTorrent(){
			axios.get('😂/yts-torrent', { params: { imdbCode: this.imdbCode } })
			.then(response => {
				this.torrents = response.data;
				this.onMontre = true;
			})
		},
	},
	mounted(){
		this.getMovieTorrent(this.imdbCode);
	}
}
</script>

