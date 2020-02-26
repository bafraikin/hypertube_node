<template>
	<v-container v-if="onMontre" dark>
		<h1 style="color:white;">{{ $t('torrentlist') }}</h1>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">{{ $t('quality') }}</th>
						<th class="text-left">{{ $t('torrentlink') }}</th>
						<th class="text-left"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="torrent in torrents">
						<td>{{ torrent.quality }}</td>
						<td>{{ torrent.provider }}</td>
						<td>
							<i v-on:click="play(torrent.magnetLink)" >{{ $t('play') }}</i>
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

