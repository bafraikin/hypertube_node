<template>
	<v-container v-if="onMontre" dark>
		<h1 style="color:white;">Torrent List</h1>
		<div v-if="torrents[0]">
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left">Quality</th>
							<th class="text-left">Provider</th>
							<th class="text-left">Torrent link</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="torrent in torrents">
							<td>{{ torrent.quality }}</td>
							<td>{{ torrent.provider }}</td>
							<td> <i v-on:click="play(torrent.magnetLink)" >Play</i> </td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
		<div v-else>
			<p>No torrent found</p>
		</div>
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
		play(magnetLink){
			this.$router.push({ name: "player-film", params:{magnetLink: magnetLink, idOMDB: this.idOMDB}});
		},
		buildImg(movie){
			return "https://image.tmdb.org/t/p/w500/"+ movie.poster_path;
		},
		getMovieTorrent(){
			axios.get('😂/torrent', { params: { imdbCode: this.imdbCode } })
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

