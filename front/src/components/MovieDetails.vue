<template>
	<v-container>
		<v-img  max-height="300" v-bind:src="'http://img.yts.lt/' + movieDetail.medium_cover_image" contain class="grey darken-4" ></v-img>
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
							<i v-on:click="download(movieDetail, torrent)" >Download</i>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</v-container>
</template>


<script>

import axios from 'axios';
export default {
	props: {
		movieDetail: { type: Object }
	},
	data() {
		return {
			//movieDetail: null,
		}
	},
	methods:{
	},
	mounted(){
		console.log("hello Movies details");
	}
}
</script>
